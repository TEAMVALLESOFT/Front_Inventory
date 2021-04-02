import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'


class CreateWarehouse extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      desc: '',
      email: '',
    }
  }

  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'email') {
      value = value.toLowerCase()
    }

    this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    this.setState({
      name: '',
      address: '',
      desc: '',
      email: '',
    })

    return
  }

  // Functions to handle alerts
  close = () => {
    this.setState({ alert: '' })
  }

  buildAlert(type, text) {
    return <Alert type={type} text={text} close={this.close} />
  }

  createWarehouse = () => {
    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      this.setState({
        alert: this.buildAlert(
          'attention',
          'Verifique que ha llenado todos los campos obligatorios.'
        ),
      })
      
      return
    }
    this.setState({
      alert: this.buildAlert(
        'success',
        'Se han llenado todos los campos obligatorios.'
      )
    })
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
          Diligencie el formulario para crear un bodega. Los campos
          marcados con <strong className='global-form-mandatory'>*</strong> son obligatorios.
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
            className='global-form-input' />
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
            className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Descripción corta
            </span>
            <input 
            id='desc'
            type='text'
            value={this.state.desc}
            onChange={this.handleChange}
            className='global-form-input' />
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
            type='email' />
          </div>

          <div className='global-form-buttons-container'>
            <button
            onClick={this.createWarehouse}
            className='global-form-solid-button'>Enviar</button>
            <button
            onClick={this.clearInputs}
            className='global-form-outline-button'>Cancelar</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateWarehouse