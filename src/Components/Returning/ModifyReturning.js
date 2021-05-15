import React, { Component } from 'react'

import Alert from '../Alerts/Alert'
import { validateString, setSelectOptions } from '../../Functions/Helpers'
import { simpleRequest } from '../../Functions/Post'
import {
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
  AUTH_STATES,
  INVALID_STRING_MESSAGE,
  STATES,
  MODIFY_RETURNING,
} from '../../Functions/Constants'

class ModifyReturning extends Component {
  constructor() {
    super()
    this.state = {
      // Request states
      id: 0,
      state: '',
      auth_state: '',
      obs: '',

      // Auxiliary form states
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {

  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      // Request states
      id: 0,
      state: '',
      auth_state: '',
      obs: '',
    })
  }

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: '' })
  }

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: '' }), ALERT_TIMEOUT),
    })

    return this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })
  }

  responseHandler = (response, body) => {
    if (response == 'success') {
      sessionStorage.removeItem('users')
      this.buildAlert('success', 'Constancia modificado con éxito.')

      return this.clearInputs()
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  modifyReturning = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)
      return
    }

    // Verify that obs are valid
    if (!validateString(this.state.obs)) {
      setTimeout(() => this.buildAlert('attention', INVALID_STRING_MESSAGE), 10)
      return
    }

    let body = {
      returning_id: this.state.id,
      auth_state: this.state.auth_state,
      state: this.state.state,
      obs: this.state.obs,
    }

    return simpleRequest(MODIFY_RETURNING, 'PUT', body, this.responseHandler)
  }

  // Auxiliary functions
  checkMandatoryInputs() {
    if (!this.state.id) {
      return false
    }

    if (!this.state.state) {
        return false
    }

    if (!this.state.auth_state) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>Modificar constancia</span>
        <span className='global-comp-description'>
          Diligencie el formulario para editar una constancia. Puede especificar la
          referencia o seleccionar la acción de editar en la opción de listar constancias.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>ESPECIFIQUE LA CONSTANCIA</span>
          <span className='global-body-text'>
            Si fue redirigido a través de la opción listar constancias, los
            siguientes campos se diligencian de forma automática.
          </span>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Referencia
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='id'
              type='numeric'
              className='global-form-input'
              value={this.state.id}
              onChange={this.handleChange}
            />
          </div>
          <span className='global-comp-sub-title'>EDITE LA CONSTANCIA</span>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Estado artículos
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='state'
              className='global-form-input-select'
              value={this.state.state}
              onChange={this.handleChange}
            >
              <option
                value=''
                className='global-form-input-select-option'
                disabled={true}
              >
                Seleccione un estado...
              </option>
              {setSelectOptions(STATES)}
            </select>
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Estado constancia
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='auth_state'
              className='global-form-input-select'
              value={this.state.auth_state}
              onChange={this.handleChange}
            >
              <option
                value=''
                className='global-form-input-select-option'
                disabled={true}
              >
                Seleccione un estado...
              </option>
              {setSelectOptions(AUTH_STATES)}
            </select>
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>Observaciones</span>
            <input
              id='obs'
              type='text'
              className='global-form-input'
              value={this.state.obs}
              onChange={this.handleChange}
            />
          </div>
          <div className='global-form-buttons-container'>
            <button
              className='global-form-solid-button'
              onClick={this.modifyReturning}
            >
              Enviar
            </button>
            <button
              className='global-form-outline-button'
              onClick={this.clearInputs}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ModifyReturning
