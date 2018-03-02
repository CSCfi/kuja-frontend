import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from '../modules/validateWizard'

import { parseLocalizedField } from "../../../../../../modules/helpers"

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderPerusteluSelect = ({ input, muutosperustelut, meta: { touched, error } }) => {
  return (
    <div>
      <select {...input}>
        <option value="">Valitse </option>
        {muutosperustelut.map(perustelu => {
          const { koodiArvo, metadata } = perustelu
          const nimi = parseLocalizedField(metadata)
          return (
            <option value={koodiArvo} key={koodiArvo}>
              {nimi}
            </option>
          )
        })}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  )
}


let MuutospyyntoWizardPerustelut = props => {
  const { handleSubmit, previousPage, muutosperustelut, muutosperusteluValue } = props


  return (
    <div>
      <h3>Valitse muutospyynnön perustelut</h3>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Muutosperustelu</label>
          <Field
            name="muutosperustelu"
            muutosperustelut={muutosperustelut}
            component={renderPerusteluSelect}
          />
        </div>

        {muutosperusteluValue === '01'
          ?
            <div>
              <Field
                name="muuperustelu"
                type="text"
                label="Kirjoita perustelu"
                component={renderField}
              />
            </div>
          : null
        }

        <div>
          <button type="button" className="previous" onClick={previousPage}>
            Previous
          </button>
          <button type="submit" className="next">
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

const selector = formValueSelector('uusi-hakemus')

MuutospyyntoWizardPerustelut = connect(state => {
  const muutosperusteluValue = selector(state, 'muutosperustelu')

  return {
    muutosperusteluValue
  }
})(MuutospyyntoWizardPerustelut)

export default reduxForm({
  form: 'uusi-hakemus',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(MuutospyyntoWizardPerustelut)
