import React, { Component } from 'react'
import './Styles.css'

import { getElementById } from '../../Functions/Get'
// import { putRequest } from '../../Functions/Post'
import { BORROWING_BY_ID } from '../../Functions/Constants'

class Modal extends Component {
  constructor() {
    super()
    this.state = {
      obs: '',
    }
  }

  componentDidMount() {
    let path = BORROWING_BY_ID + '?borrowing_id=' + this.props.borrowing_id
    return getElementById(path, this.setBorrowingInformation)
  }

  // Functions to handle modal
  closeModal = () => {
    return this.props.closeModal()
  }

  // Functions related to requests
  setBorrowingInformation = (response, body) => {
    if (response == 'success') {
      return this.setState({
        user_name: body.Asociado.user_name,
      })
    }

    this.props.handleAlerts(response, body)

    return this.props.closeModal()
  }

  responseHandler = (response, body) => {
    this.props.handleAlerts(response, body)
    return this.props.closeModal()
  }

  render() {
    return (
      <div className='global-modal-background'>
        <div className='global-modal-container'>
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
