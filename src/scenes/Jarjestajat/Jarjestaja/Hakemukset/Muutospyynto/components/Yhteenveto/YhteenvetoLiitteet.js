import React from "react";
import ExpandableRowRoot from "OKM-frontend-components/dist/components/02-organisms/ExpandableRowRoot";
import PropTypes from "prop-types";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { useIntl } from "react-intl";

const YhteenvetoLiitteet = React.memo(props => {
  const intl = useIntl();
  return (
    <React.Fragment>
      <hr />
      <ExpandableRowRoot
        title={intl.formatMessage(wizardMessages.otherAttachments)}
        anchor={props.sectionId}
        key={`yhteenveto-hakemuksenLiitteet`}
        categories={[]}
        changes={props.changeObjects.hakemuksenLiitteet}
        disableReverting={true}
        showCategoryTitles={true}
        isExpanded={true}
        sectionId={props.sectionId}
        onUpdate={props.onChangesUpdate}
        hideAmountOfChanges={true}>
        <Lomake
          action="modification"
          anchor={props.sectionId}
          changeObjects={props.changeObjects.hakemuksenLiitteet}
          metadata={{
            kohde: props.kohde
          }}
          onChangesUpdate={props.onChangesUpdate}
          path={["yhteenveto", "liitteet"]}
          rules={[]}
          showCategoryTitles={true}></Lomake>
      </ExpandableRowRoot>
    </React.Fragment>
  );
});

YhteenvetoLiitteet.propTypes = {
  changeObjects: PropTypes.object,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};
export default YhteenvetoLiitteet;
