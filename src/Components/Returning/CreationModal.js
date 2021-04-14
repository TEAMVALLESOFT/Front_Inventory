import React, { Component } from 'react'

import { setSelectOptions } from '../../Functions/Helpers'
import { STATES } from '../../Functions/Constants'

class CreationModal extends Component {
  constructor() {
    super()
    this.state = {
      physical_state: '',
      obs: '',
    }
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    return this.setState({ [attribute]: value })
  }

  // Functions to handle modal
  closeModal = () => {
    return this.props.closeModal()
  }

  // Auxiliary functions
  setArticleList() {
    let articles = this.props.borrowing.article_list

    let list = []
    for (let i = 0; i < articles.length; i++) {
      let a = articles[i]
      list.push(
        <li>
          <span className='global-modal-text'>
            {a.article_type_name + ': ' + a.article_label}
          </span>
        </li>
      )
    }

    return list
  }

  render() {
    let article_list = this.setArticleList()

    return (
      <div class='global-modal-background'>
        <div class='global-modal-container'>
          <div className='global-modal-header'>
            <span className='global-modal-title'>
              Crear constancia para solicitud # {this.props.borrowing.id}
            </span>
            <img
              className='global-modal-icon'
              src='./close_white.png'
              alt='close'
              onClick={this.closeModal}
            />
          </div>
          <div className='global-modal-body'>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Nombre responsable</span>
              <span className='global-modal-text'>
                {this.props.borrowing.user_name}
              </span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Bodega</span>
              <span className='global-modal-text'>
                {this.props.borrowing.warehouse_name}
              </span>
            </div>
            <div
              className='global-modal-group-container'
              style={{ alignItems: 'flex-start' }}
            >
              <span className='global-form-label'>Artículos a devolver</span>
              <ul>{article_list}</ul>
            </div>

            <div className='global-modal-group-container'>
              <span className='global-form-label'>
                Estado
                <strong className='global-form-mandatory'> *</strong>
              </span>
              <select
                id='physical_state'
                className='global-form-input-select'
                value={this.state.physical_state}
                onChange={this.handleChange}
              >
                <option
                  value=''
                  className='global-form-input-select-option'
                  selected={true}
                  disabled={true}
                >
                  Seleccione un estado...
                </option>
                {setSelectOptions(STATES)}
              </select>
            </div>

            <div className='global-modal-group-container'>
              <span className='global-form-label'>Observaciones</span>
              <input
                id='obs'
                type='text'
                className='global-form-input'
                value={this.state.obs}
                onChange={this.handleChange}
              />
            </div>
            <div className='global-modal-button-container'>
              <button
                className='global-form-outline-button'
                style={{ height: '30px' }}
                onClick={this.closeModal}
              >
                Cancelar
              </button>
              <button
                className='global-form-solid-button'
                style={{ height: '30px' }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreationModal
