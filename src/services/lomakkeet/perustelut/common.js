import * as R from "ramda";

export const getMuutostarveCheckboxes = (checkboxItems, locale) => {
  return R.map(checkboxItem => {
    const metadata = R.find(R.propEq("kieli", locale))(checkboxItem.metadata);
    return {
      anchor: checkboxItem.koodiArvo,
      layout: {
        margins: { top: "none" }
      },
      components: [
        {
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            isChecked: false,
            title: metadata.nimi
          }
        }
      ]
    };
  }, checkboxItems);
};