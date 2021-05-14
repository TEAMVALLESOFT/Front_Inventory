import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { validateString, setSelectOptions } from '../../Functions/Helpers'
import {
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
  AVAILABILITIES,
  INVALID_STRING_MESSAGE,
} from '../../Functions/Constants'

class ModifyBorrowing extends Component {
  constructor() {
    super()
    this.state = {
      // Request states
      id: 0,
      pick_up_date: '',
      return_date: '',
      availability: '',
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
      pick_up_date: '',
      return_date: '',
      availability: '',
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
      this.buildAlert('success', 'Préstamo modificado con éxito.')

      return this.clearInputs()
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  modifyBorrowing = () => {
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
      id: this.state.id,
      pick_up_date: this.state.pick_up_date,
      return_date: this.state.return_date,
      availability: this.state.availability,
      obs: this.state.obs,
    }

    // return simpleRequest('', 'PUT', body, this.responseHandler)
  }

  // Auxiliary functions
  checkMandatoryInputs() {
    if (this.state.pick_up_date) {
      return false
    }

    if (this.state.return_date) {
      return false
    }

    if (!this.state.availability) {
      return false
    }

    if (!this.state.obs) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>Modificar préstamo</span>
        <span className='global-comp-description'>
          Diligencie el formulario para editar un préstamo. Puede especificar la
          referencia o seleccionar la acción de editar en la opción de listar préstamos.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>ESPECIFIQUE EL PRÉSTAMO</span>
          <span className='global-body-text'>
            Si fue redirigido a través de la opción listar préstamos, los
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
          <span className='global-comp-sub-title'>EDITE EL PRÉSTAMO</span>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Fecha de recogida
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='pick_up_date'
              value={this.state.pick_up_date}
              onChange={this.handleChange}
              className='global-form-input'
              type='datetime-local'
            />
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Fecha de devolución
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='return_date'
              value={this.state.return_date}
              onChange={this.handleChange}
              className='global-form-input'
              type='datetime-local'
            />
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Estado
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='availability'
              className='global-form-input-select'
              value={this.state.availability}
              onChange={this.handleChange}
            >
              <option
                value=''
                className='global-form-input-select-option'
                disabled={true}
              >
                Seleccione un estado...
              </option>
              {setSelectOptions(AVAILABILITIES)}
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
              onClick={this.ModifyBorrowing}
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

export default ModifyBorrowing
