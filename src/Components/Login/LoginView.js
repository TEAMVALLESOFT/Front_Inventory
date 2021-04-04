import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { validateEmail } from '../../Functions/Helpers'
import { postRequest } from '../../Functions/Post'
import {
  LOGIN,
  ERROR_MESSAGE,
  EMAIL_MESSAGE,
  ALERT_TIMEOUT,
} from '../../Functions/Constants'

class LoginView extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      alert: '',
      timeout: '',
    }
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'email') {
      value = value.toLowerCase()
    }

    this.setState({ [attribute]: value })
  }

  // Functions to handle alerts
  close = () => {
    this.setState({ alert: '' })
  }

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: '' }), ALERT_TIMEOUT),
    })

    this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })

    return
  }

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == 'success' && body.hasOwnProperty('token')) {
      sessionStorage.setItem('token', body.token)
      localStorage.setItem('user_id', body.user.id)
      localStorage.setItem('user_name', body.user.name)
      localStorage.setItem('user_email', body.user.email)

      this.props.changeView('Menu')
      return
    }

    if (body == 'Error: Not Found') {
      this.buildAlert(
        'attention',
        'El correo electrónico o la contraseña es incorrecta. Por favor intente de nuevo.'
      )

      return
    }

    this.buildAlert('error', ERROR_MESSAGE)

    return
  }

  login = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.state.email || !this.state.password) {
      setTimeout(
        () =>
          this.buildAlert(
            'attention',
            'Verifique que ha llenado todos los campos.'
          ),
        10
      )

      return
    }

    // Verify that the required fields are filled
    if (!validateEmail(this.state.email)) {
      setTimeout(() => this.buildAlert('attention', EMAIL_MESSAGE), 10)

      return
    }

    let body = {
      email: this.state.email,
      password: this.state.password,
    }

    postRequest(LOGIN, body, this.responseHandler)
  }

  // Auxiliary functions
  showPasswd() {
    let container = document.getElementById('eye-icon-container')
    let icon = document.getElementById('eye-icon')
    let input = document.getElementById('password')

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
      <div className='lg-container'>
        {this.state.alert}
        <div className='lg-card'>
          <div className='lg-content'>
            {/* HEADER */}
            <div className='lg-header'>
              <span className='lg-title'>
                Bienvenido a la aplicación de inventario
              </span>
              <span className='lg-text'>
                Inicie sesión con correo electrónico y contraseña
              </span>
            </div>
            {/* FORM */}
            <div className='lg-form'>
              <span className='global-form-label'>Correo electrónico</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./person_gray.png'
                    alt='person'
                  />
                </div>
                <input
                  id='email'
                  className='global-form-input'
                  type='email'
                  style={{ marginBottom: '20px' }}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <span className='global-form-label'>Contraseña</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./key_gray.png'
                    alt='key'
                  />
                </div>
                <input
                  id='password'
                  className='global-form-input'
                  type='password'
                  style={{ marginBottom: '20px' }}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div
                  id='eye-icon-container'
                  className='global-form-img-container'
                  style={{ cursor: 'pointer' }}
                  onClick={this.showPasswd}
                >
                  <img
                    id='eye-icon'
                    className='global-form-img'
                    src='./eye_gray.png'
                    alt='eye'
                  />
                </div>
              </div>
              <button className='lg-button' onClick={this.login}>
                Iniciar sesión
              </button>
            </div>
            <span className='lg-link'>¿Olvidaste tu contraseña?</span>
            {/* LEGEND */}
            <div className='lg-legend-group'>
              <hr></hr>
              <span className='global-form-label'>Desarrollado por</span>
              <hr></hr>
            </div>
            <div className='lg-logo-container'>
              <img className='lg-logo' src='./logo_valle_gray.png' alt='logo' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginView
