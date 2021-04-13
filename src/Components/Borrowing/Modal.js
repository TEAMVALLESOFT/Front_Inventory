import React, { Component } from 'react'
import './Styles.css'

class Modal extends Component {
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
              className='bmo-icon'
              src='./close_white.png'
              alt='close'
              onClick={this.closeModal}
            />
          </div>
          <div className='global-modal-body'></div>
        </div>
      </div>
    )
  }
}

export default Modal
