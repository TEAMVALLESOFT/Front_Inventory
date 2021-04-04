import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { postRequest } from '../../Functions/Post'
import {
  CREATE_ARTICLE_TYPE,
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
} from '../../Functions/Constants'

class CreateArticleType extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      desc: '',
      classif: '',
      is_parent: false,
      alert: '',
      timeout: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // Functions to handle states
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    this.setState({
      name: '',
      desc: '',
      classif: '',
      is_parent: false,
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
      timeout: setTimeout(() => this.setState({ alert: '' }), ALERT_TIMEOUT),
    })

    this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })

    return
  }

  responseHandler = (response, body) => {
    if (response == 'success') {
      this.buildAlert('success', 'Tipo de articulo creado con éxito.')
      this.clearInputs()

      return
    }

    this.buildAlert('error', ERROR_MESSAGE)

    return
  }

  createArticleType = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)

      return
    }

    let body = {
      article_type_name: this.state.name,
      desc: this.state.desc,
      classif: this.state.classif,
      is_parent: this.state.is_parent,
    }

    postRequest(CREATE_ARTICLE_TYPE, body, this.responseHandler)
  }

  checkMandatoryInputs() {
    if (!this.state.name) {
      return false
    }

    if (!this.state.classif) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='ca-container'>
        {this.state.alert}
        <span className='global-comp-title'>Crear tipo de artículo</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un tipo de artículo. Los campos
          marcados con <strong className='global-form-mandatory'>*</strong> son
          obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre
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
            <span className='global-form-label'>Descripción</span>
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
              Categoría
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='classif'
              type='text'
              value={this.state.classif}
              onChange={this.handleChange}
              className='global-form-input-select'
            >
              <option className='global-form-input-select-option' value=''>
                Seleccione uno
              </option>
              <option
                className='global-form-input-select-option'
                value='Elementos de cocina'
              >
                Elementos de cocina
              </option>
              <option
                className='global-form-input-select-option'
                value='Elementos de limpieza'
              >
                Elementos de limpieza
              </option>
              <option
                className='global-form-input-select-option'
                value='Elementos para acampar'
              >
                Elementos para acampar
              </option>
            </select>
          </div>
          <div className='global-form-group-checkbox'>
            <input
              className='global-form-checkbox'
              name='is_parent'
              type='checkbox'
              checked={this.state.is_parent}
              onChange={this.handleInputChange}
            />
            <span className='global-form-label'>
              ¿Es compuesto?
              <span className='global-form-mandatory'> *</span>
            </span>
          </div>
          <div className='global-form-buttons-container'>
            <button
              onClick={this.createArticleType}
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

export default CreateArticleType
