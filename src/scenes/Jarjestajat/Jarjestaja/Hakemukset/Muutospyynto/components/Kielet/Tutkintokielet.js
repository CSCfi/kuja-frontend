import React from "react";
import TutkintoList from "../TutkintoList";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import PropTypes from "prop-types";
import _ from "lodash";

const Tutkintokielet = props => {
  const sectionId = "tutkintokielet";
  const { lupa } = props;
  const { kohteet } = lupa;
  const koulutusdata = props.koulutukset.koulutusdata;
  const koulutusDataSorted = _.sortBy(koulutusdata, d => {
    return d.koodiArvo;
  });

  const handleChanges = (item, isSubItemTarget, listId) => {
    props.onChanges(item, listId, sectionId);
  };

  return (
    <React.Fragment>
      {_.map(koulutusDataSorted, (koulutusala, i) => {
        const koodiarvo = koulutusala.koodiarvo || koulutusala.koodiArvo;
        const { metadata, koulutukset } = koulutusala;
        const nimi = parseLocalizedField(metadata);
        return (
          <TutkintoList
            key={i}
            koodiarvo={koodiarvo}
            areaCode={koodiarvo}
            title={nimi}
            koulutustyypit={koulutukset}
            articles={kohteet[1].maaraykset}
            changes={props.changes ? props.changes[koodiarvo] : []}
            onChanges={handleChanges}
            listId={koodiarvo}
          />
        );
      })}
    </React.Fragment>
  );
};

Tutkintokielet.propTypes = {
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  onChanges: PropTypes.func
};

export default Tutkintokielet;