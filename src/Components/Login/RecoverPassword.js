import React, { Component } from 'react'
import './Styles.css'

class RecoverPassword extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      token: '',
      password: '',
      conf_password: '',
    }
  }
  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'email') {
      value = value.toLowerCase()
    }

    return this.setState({ [attribute]: value })
  }

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: '' })
  }

  changeForm = (e) => {
    let progressOptions = document.querySelectorAll('.progressbar__option')
    let element = e.target
    let isButtonNext = element.classList.contains('step__button--next')
    let isButtonBack = element.classList.contains('step__button--back')
    if (isButtonNext || isButtonBack) {
      let currentStep = document.getElementById('step-' + element.dataset.step)
      let jumpStep = document.getElementById('step-' + element.dataset.to_step)
      currentStep.addEventListener('animationend', function callback() {
        currentStep.classList.remove('active')
        jumpStep.classList.add('active')
        if (isButtonNext) {
          currentStep.classList.add('to-left')
          progressOptions[element.dataset.to_step - 1].classList.add('active')
        } else {
          jumpStep.classList.remove('to-left')
          progressOptions[element.dataset.step - 1].classList.remove('active')
        }
        currentStep.removeEventListener('animationend', callback)
      })
      currentStep.classList.add('inactive')
      jumpStep.classList.remove('inactive')
    }
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

  showPasswd_confirm() {
    let container = document.getElementById('eye-icon-container_conf')
    let icon = document.getElementById('eye-icon_conf')
    let input = document.getElementById('conf_password')

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
            <div className='recp-header'>
              <span className='lg-title'>
                Restablecer contraseña
              </span>
              <span className='lg-text'>
                Para realizar el cambio de contraseña asegúrese de cumplir con los siguientes tres pasos.
              </span>
            </div>				
			<div className="lg-form">
			  <div className="form-register__header">
			    <ul className="progressbar">
				  <li className="progressbar__option active"><span className='global-form-label'>paso 1</span></li>
			   	  <li className="progressbar__option"><span className='global-form-label'>paso 2</span></li>
				  <li className="progressbar__option"><span className='global-form-label'>paso 3</span></li>
		  		</ul>
			  </div>
			  <div className="form-register__body">
				<div className="step active" id="step-1">
				  <div className="step__body">
					  <div className='global-explanation-text'>
						<span className='lg-text'>
						  Digite los siguientes campos para enviar a su correo electrónico un código de 
						  restablecimiento de contrasaeña.
						</span>
					  </div>
					  <span className='global-form-label'>Correo electrónico</span>
					  <input
						id='email'
						className='global-form-input'
						type='email'
						value= {this.state.email}
						onChange={this.handleChange}
					  />
					  </div>
					  <div className="step__footer">
						<button
                        onClick={this.changeForm}
                        type="button"
                        className="step__button step__button--next"
                        data-to_step="2"
                        data-step="1">
                          Siguiente
                        </button>
					  </div>
					</div>
					<div className="step" id="step-2">
					  <div className="step__body">
						<div className='global-explanation-text'>
						  <span className='lg-text'>
							Digite a continuación el código de restablecimiento que ha sido enviado al correo
							<span className='global-text-mandatory'> {this.state.email}</span>, 
							  tiene 10 minutos a partir de ahora para que el código que le fue enviado siga siendo valido.
						  </span>
						</div>
						<span className='global-form-label'>Código de restablecimiento</span>
						<input
						  id='token'
						  className='global-form-input'
						  type='text'
						  value={this.state.token}
						  onChange={this.handleChange}
						/>
					  </div>
					  <div className="step__footer">
						<button
                          onClick={this.changeForm}
                          type="button" 
                          className="step__button_back step__button--back" 
                          data-to_step="1" 
                          data-step="2">
                            Regresar
                        </button>
						<button
                          onClick={this.changeForm}
                          type="button"
                          className="step__button step__button--next"
                          data-to_step="3"
                          data-step="2">
                            Siguiente
                        </button>
					  </div>
					</div>
					<div className="step" id="step-3">
					  <div className="step__body">
					    <div className='global-explanation-text'>
						  <span className='lg-text'>
							Digite la nueva contraseña y su confirmación para realizar el restablecimiento, luego
							podrá ingresar con normalidad al inventario utilizando su nueva contraseña.
						  </span>
						</div>
						<span className='global-form-label'>Nueva contraseña</span>								
						<div className='global-form-input-group'>
						  <div className='recp-form-img-container'>
							<img
							  className='global-form-img'
							  src='./key_gray.png'
							  alt='key'
							/>
						  </div>
					      <input
							id='password'
                            value={this.state.password}
							className='global-form-input'
							type='password'
                            onChange={this.handleChange}
						  />
						  <div
							id='eye-icon-container'
						    className='recp-form-img-container'
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
					    <span className='global-form-label'>Confirmar contraseña</span>								
					    <div className='global-form-input-group'>
						  <div className='recp-form-img-container'>
						    <img
							  className='global-form-img'
							  src='./key_gray.png'
							  alt='key'
						    />
						  </div>
						  <input
						    id='conf_password'
                            value={this.state.conf_password}
						    className='global-form-input'
						    type='password'
                            onChange={this.handleChange}
						  />
					      <div
						    id='eye-icon-container_conf'
						    className='recp-form-img-container'
                            style={{ cursor: 'pointer' }}
                            onClick={this.showPasswd_confirm}
						  >
					      <img
						    id='eye-icon_conf'
						    className='global-form-img'
						    src='./eye_gray.png'
						    alt='eye'
						  />
					    </div>
					</div>
							
				  </div>
				  <div className="step__footer">
					<button
                      onClick={this.changeForm}
                      type="button" 
                      className="step__button_back  step__button--back" 
                      data-to_step="2" 
                      data-step="3">
                        Regresar
                      </button>
					<button type="submit" className="step__button">Aceptar</button>
				  </div>
			    </div>
			  </div>
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

export default RecoverPassword