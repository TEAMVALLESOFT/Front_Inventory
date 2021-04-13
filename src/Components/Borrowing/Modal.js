import React, { Component } from 'react'
import './Styles.css'

class Modal extends Component {
  constructor() {
    super()
    this.state = {
      obs: '',
    }
  }

  closeModal = () => {
    return this.props.closeModal()
  }

  render() {
    return (
      <div class='global-modal-background'>
        <div class='global-modal-container'>
          <div className='global-modal-header'>
            <span className='global-modal-title'>Autorizar solicitud #</span>
            <img
              className='global-modal-icon'
              src='./close_white.png'
              alt='close'
              onClick={this.closeModal}
            />
          </div>
          <div className='global-modal-body'>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Nombre solicitante</span>
              <span className='global-modal-text'>Dummy</span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Bodega</span>
              <span className='global-modal-text'>Dummy</span>
            </div>
            <div
              className='global-modal-group-container'
              style={{ alignItems: 'flex-start' }}
            >
              <span className='global-form-label'>Artículos solicitados</span>
              <ul>
                <li>
                  <span className='global-modal-text'>Coffee</span>
                </li>
                <li>
                  <span className='global-modal-text'>Coffee</span>
                </li>
                <li>
                  <span className='global-modal-text'>Coffee</span>
                </li>
              </ul>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Agregar observaciones</span>
              <input
                id='obs'
                type='text'
                className='global-form-input'
                value={this.state.obs}
                // onChange={this.handleChange}
              />
            </div>
            <div className='global-modal-button-container'>
              <button
                className='global-form-outline-button'
                style={{ height: '30px' }}
              >
                Denegar
              </button>
              <button
                className='global-form-solid-button'
                style={{ height: '30px' }}
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
