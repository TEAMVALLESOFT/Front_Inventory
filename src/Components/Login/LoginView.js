import React, { Component } from 'react'
import './Styles.css'

class LoginView extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  // showPasswd function changes color of icon and background when eye clicked
  showPasswd() {
    let container = document.getElementById('eye-icon-container')
    let icon = document.getElementById('eye-icon')
    let input = document.getElementById('passwd')

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
              <span className='lg-label'>Correo electrónico</span>
              <div className='lg-input-group'>
                <div className='lg-img-container'>
                  <img
                    className='lg-img'
                    src='./person_gray.png'
                    alt='person'
                  />
                </div>
                <input className='lg-input' type='email' />
              </div>
              <span className='lg-label'>Contraseña</span>
              <div className='lg-input-group'>
                <div className='lg-img-container'>
                  <img className='lg-img' src='./key_gray.png' alt='key' />
                </div>
                <input id='passwd' className='lg-input' type='password' />
                <div
                  id='eye-icon-container'
                  className='lg-img-container'
                  style={{ cursor: 'pointer' }}
                  onClick={this.showPasswd}
                >
                  <img
                    id='eye-icon'
                    className='lg-img'
                    src='./eye_gray.png'
                    alt='eye'
                  />
                </div>
              </div>
              <button className='lg-button'>Iniciar sesión</button>
            </div>
            <span className='lg-link'>¿Olvidaste tu contraseña?</span>
            {/* LEGEND */}
            <div className='lg-legend-group'>
              <hr></hr>
              <span className='lg-label'>Desarrollado por</span>
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
