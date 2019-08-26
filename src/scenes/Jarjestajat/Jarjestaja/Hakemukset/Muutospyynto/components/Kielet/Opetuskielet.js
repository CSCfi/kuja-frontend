import React, { useCallback, useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import { parseLocalizedField } from "../../../../../../../modules/helpers";

const Opetuskielet = props => {
  const sectionId = "opetuskielet";
  const [categories, setCategories] = useState([]);
  const [opetuskielet, setOpetuskieletdata] = useState([]);
  const [state, setState] = useState([]);
  const [changes, setChanges] = useState([]);
  const [locale, setLocale] = useState([]);
  const { onUpdate } = props;

  const getCategories = useCallback(
    opetuskielet => {
      if (opetuskielet.items)
        return R.map(item => {
          return {
            anchor: item.code,
            meta: {
              isInLupa: item.isInLupa,
              kuvaus: item.title,
              kohde: props.kohde,
              maaraystyyppi: props.maaraystyyppi,
              meta: item.meta
            },
            components: [
              {
                anchor: "A",
                name: "CheckboxWithLabel",
                properties: {
                  name: "CheckboxWithLabel",
                  isChecked: item.shouldBeSelected,
                  title: item.title,
                  labelStyles: {
                    addition: isAdded,
                    removal: isRemoved,
                    custom: Object.assign({}, item.isInLupa ? isInLupa : {})
                  }
                }
              }
            ]
          };
        }, opetuskielet.items);
    },
    [props.kohde, props.maaraystyyppi]
  );

  useEffect(() => {
    setOpetuskieletdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.kielet.opetuskielet))
    );
  }, [props.kielet]);

  useEffect(() => {
    const tmpState = [];
    R.addIndex(R.map)((kieli, i) => {
      const areaCode = kieli.koodiarvo || kieli.koodiArvo;
      const categories = getCategories(
        getDataForOpetuskieletList(
          props.kielet.opetuskielet,
          props.kohde,
          locale
        )
      );
      const title = parseLocalizedField(kieli.metadata, locale);
      tmpState.push({ areaCode, categories, title });
    }, opetuskielet);
    setState(tmpState);
  }, [
    opetuskielet,
    locale,
    props.kohde,
    props.maaraystyyppi,
    getCategories,
    props.lupa.kohteet,
    props.kielet.opetuskielet
  ]);

  useEffect(() => {
    setCategories(
      getCategories(
        getDataForOpetuskieletList(
          props.kielet.opetuskielet,
          props.kohde,
          props.intl.locale
        )
      )
    );
  }, [
    props.kielet.opetuskielet,
    props.kohde,
    getCategories,
    props.intl.locale
  ]);

  useEffect(() => {
    setChanges(props.backendChanges);
  }, [props.backendChanges]);

  const removeChanges = (...payload) => {
    return saveChanges({ index: payload[2], changes: [] });
  };

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    onUpdate({
      changes,
      items: [...state],
      sectionId
    });
  }, [changes, onUpdate, state]);

  const saveChanges = payload => {
    setChanges(payload.changes);
  };

  return (
    <ExpandableRowRoot
      anchor={"opetuskieli"}
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      index={0}
      onChangesRemove={removeChanges}
      onUpdate={saveChanges}
      sectionId={sectionId}
      title={props.intl.formatMessage(wizardMessages.teachingLanguages)}
      isExpanded={true}
    />
  );
};

Opetuskielet.propTypes = {
  backgroundChanges: PropTypes.array,
  kielet: PropTypes.object,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(Opetuskielet);
