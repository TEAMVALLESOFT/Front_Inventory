import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'

import { validateEmail } from '../../Functions/Helpers'
import { postRequest } from '../../Functions/Post'
import { CREATE_USER } from '../../Functions/Post'

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      user_name: '',
      branch: '',
      phone: '',
      password: '',
      password_check: '',
      alert: '',
      timeout: '',
    }
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'phone') {
      value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    }

    if (attribute == 'email') {
      value = value.toLowerCase()
    }

    this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    this.setState({
      email: '',
      user_name: '',
      branch: '',
      phone: '',
      password: '',
      password_check: '',
    })

    return
  }

  // Functions to handle alerts
  close = () => {
    this.setState({ alert: '' })
  }

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: '' }), 6000),
    })

    this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })

    return
  }

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == 'success') {
      this.buildAlert('success', 'Usuario creado con éxito.')
      this.clearInputs()

      return
    }

    if (body.message == 'Conflict') {
      this.buildAlert(
        'attention',
        'Este usuario ya ha sido creado. Pruebe con un nuevo correo.'
      )

      return
    }

    this.buildAlert(
      'error',
      'Ha ocurrido un error. Por favor intente más tarde.'
    )

    return
  }

  createUser = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(
        () =>
          this.buildAlert(
            'attention',
            'Verifique que ha llenado todos los campos obligatorios.'
          ),
        10
      )

      return
    }

    // Verify that the email format is valid
    if (!validateEmail(this.state.email)) {
      setTimeout(
        () =>
          this.buildAlert(
            'attention',
            'El formato del correo electrónico no es válido. Por favor verifique.'
          ),
        10
      )

      return
    }

    // Verify that the password has been entered correctly
    if (this.state.password != this.state.password_check) {
      setTimeout(
        () =>
          this.buildAlert(
            'attention',
            'Las contraseñas no coinciden. Por favor, verifíquelas.'
          ),
        10
      )

      return
    }

    let body = {
      email: this.state.email,
      user_name: this.state.user_name,
      branch: this.state.branch,
      phone: this.state.phone,
      password: this.state.password,
    }

    postRequest(CREATE_USER, body, this.responseHandler)
  }

  // Auxiliary functions
  checkMandatoryInputs() {
    if (!this.state.email) {
      return false
    }

    if (!this.state.user_name) {
      return false
    }

    if (!this.state.branch) {
      return false
    }

    if (!this.state.phone) {
      return false
    }

    if (!this.state.password) {
      return false
    }

    if (!this.state.password_check) {
      return false
    }

    return true
  }

  showPasswd(event) {
    let container, icon, input

    if (
      event.target.id == 'eye-icon-container-1' ||
      event.target.id == 'eye-icon-1'
    ) {
      container = document.getElementById('eye-icon-container-1')
      icon = document.getElementById('eye-icon-1')
      input = document.getElementById('password')
    } else {
      container = document.getElementById('eye-icon-container-2')
      icon = document.getElementById('eye-icon-2')
      input = document.getElementById('password_check')
    }

    if (input.attributes.type.value == 'password') {
      input.attributes.type.value = 'text'
      container.style.backgroundColor = '#b31d1d'
      icon.attributes.src.value = './eye_white.png'
    } else {
      input.attributes.type.value = 'password'
      container.style.backgroundColor = '#f2f4f7'
      icon.attributes.src.value = './eye_gray.png'
    }

    return
  }

  render() {
    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>Crear usuario</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un nuevo usuario. Todos los campos
          son obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre completo
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='user_name'
              type='text'
              className='global-form-input'
              value={this.state.user_name}
              onChange={this.handleChange}
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Correo electrónico
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='email'
              type='email'
              className='global-form-input'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Teléfono
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='phone'
              type='text'
              className='global-form-input'
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Rama
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='branch'
              className='global-form-input-select'
              value={this.state.branch}
              onChange={this.handleChange}
            >
              <option value='' selected={true} disabled='disabled'>
                Seleccione una rama...
              </option>
              <option value='Cachorros'>Cachorros</option>
              <option value='Lobatos'>Lobatos</option>
              <option value='Webelos'>Webelos</option>
              <option value='Scouts'>Scouts</option>
              <option value='Rovers'>Rovers</option>
              <option value='Sin rama'>Sin rama</option>
            </select>
            {/* <input
              id='branch'
              className='global-form-input'
              value={this.state.branch}
              onChange={this.handleChange}
            /> */}
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Contraseña
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <div className='global-form-input-group'>
              <input
                id='password'
                type='password'
                className='global-form-input'
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div
                id='eye-icon-container-1'
                className='global-form-img-container'
                style={{ cursor: 'pointer' }}
                onClick={this.showPasswd}
              >
                <img
                  id='eye-icon-1'
                  className='global-form-img'
                  src='./eye_gray.png'
                  alt='eye'
                />
              </div>
            </div>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Confirme contraseña
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <div className='global-form-input-group'>
              <input
                id='password_check'
                type='password'
                className='global-form-input'
                value={this.state.password_check}
                onChange={this.handleChange}
              />
              <div
                id='eye-icon-container-2'
                className='global-form-img-container'
                style={{ cursor: 'pointer' }}
                onClick={this.showPasswd}
              >
                <img
                  id='eye-icon-2'
                  className='global-form-img'
                  src='./eye_gray.png'
                  alt='eye'
                />
              </div>
            </div>
          </div>
          <div className='global-form-buttons-container'>
            <button
              className='global-form-solid-button'
              onClick={this.createUser}
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

export default CreateUser
