import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { validateEmail } from '../../Functions/Helpers'
import { postRequest } from '../../Functions/Post'
import {
  CREATE_WAREHOUSE,
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  EMAIL_MESSAGE,
  ALERT_TIMEOUT,
} from '../../Functions/Constants'

class CreateWarehouse extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      desc: '',
      email: '',
      timeout: '',
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'email') {
      value = value.toLowerCase()
    }

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      name: '',
      address: '',
      desc: '',
      email: '',
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

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == 'success') {
      this.buildAlert('success', 'Bodega creada con éxito.')
      sessionStorage.removeItem('warehouses')

      return this.clearInputs()
    }

    if (body.message == 'Not Found') {
      return this.buildAlert(
        'attention',
        'El correo ingresado no pertenece a un usuario registrado.'
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  createWarehouse = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)
      return
    }

    // Verify that the email format is valid
    if (!validateEmail(this.state.email)) {
      setTimeout(() => this.buildAlert('attention', EMAIL_MESSAGE), 10)
      return
    }

    let body = {
      warehouse_name: this.state.name,
      address: this.state.address,
      desc: this.state.desc,
      email: this.state.email,
    }

    return postRequest(CREATE_WAREHOUSE, body, this.responseHandler)
  }

  checkMandatoryInputs() {
    if (!this.state.name) {
      return false
    }

    if (!this.state.address) {
      return false
    }

    if (!this.state.email) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='cw-container'>
        {this.state.alert}
        <span className='global-comp-title'>Crear bodega</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un bodega. Los campos marcados con{' '}
          <strong className='global-form-mandatory'>*</strong> son obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre de referencia
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='name'
              type='text'
              value={this.state.name}
              onChange={this.handleChange}
              className='global-form-input'
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Dirección
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='address'
              type='text'
              value={this.state.address}
              onChange={this.handleChange}
              className='global-form-input'
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>Descripción corta</span>
            <input
              id='desc'
              type='text'
              value={this.state.desc}
              onChange={this.handleChange}
              className='global-form-input'
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Correo responsable
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='email'
              value={this.state.email}
              onChange={this.handleChange}
              className='global-form-input'
              type='email'
            />
          </div>

          <div className='global-form-buttons-container'>
            <button
              onClick={this.createWarehouse}
              className='global-form-solid-button'
            >
              Enviar
            </button>
            <button
              onClick={this.clearInputs}
              className='global-form-outline-button'
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateWarehouse
