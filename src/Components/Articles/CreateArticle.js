import React, { Component } from 'react'

import Alert from '../Alerts/Alert'
import { setSelectOptions } from '../../Functions/Helpers'
import { postRequest } from '../../Functions/Post'
import {
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
  CLASSIFICATIONS,
  AVAILABILITIES,
  STATES,
  BRANCHES,
} from '../../Functions/Constants'

class CreateArticle extends Component {
  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      // Request states
      available_state: '',
      physical_state: '',
      branch: '',
      obs: '',
      warehouse_fk: 0,
      article_type_fk: 0,

      // Auxiliary form states
      classif: '',
      alert: '',
      timeout: '',
    }
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      available_state: '',
      physical_state: '',
      branch: '',
      obs: '',
      warehouse_fk: 0,
      article_type_fk: 0,
      classif: '',
    })
  }

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: '' })
  }

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: '' }), ALERT_TIMEOUT),
    })

    return this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })
  }

  scroll = () => {
    this.myRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == 'success') {
      this.buildAlert('success', 'Artículo creado con éxito.')
      return this.clearInputs()
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  createArticle = () => {
    this.close()
    this.scroll()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)
      return
    }

    let body = {
      available_state: this.state.available_state,
      physical_state: this.state.physical_state,
      branch: this.state.branch,
      obs: this.state.obs,
      warehouse_fk: this.state.warehouse_fk,
      article_type_fk: this.state.article_type_fk,
    }

    // return postRequest(CREATE_ARTICLE, body, this.responseHandler)
  }

  // Auxiliary functions
  checkMandatoryInputs() {
    if (this.state.warehouse_fk < 0) {
      return false
    }

    if (this.state.article_type_fk < 0) {
      return false
    }

    if (!this.state.available_state) {
      return false
    }

    if (!this.state.physical_state) {
      return false
    }

    if (!this.state.branch) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title' ref={this.myRef}>
          Crear artículo
        </span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un artículo. Los campos marcados
          con <strong className='global-form-mandatory'>*</strong> son
          obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>ARTÍCULO PRINCIPAL</span>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Bodega
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='warehouse_fk'
              className='global-form-input-select'
              value={this.state.warehouse_fk}
              onChange={this.handleChange}
            >
              <option value={0} selected={true} disabled='disabled'>
                Seleccione una bodega...
              </option>
              {/* TODO */}
            </select>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Clasificación
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='classif'
              className='global-form-input-select'
              value={this.state.classif}
              onChange={this.handleChange}
            >
              <option
                value=''
                className='global-form-input-select-option'
                selected={true}
                disabled='disabled'
              >
                Seleccione una clasificación...
              </option>
              {setSelectOptions(CLASSIFICATIONS)}
            </select>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Tipo de artículo
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='article_type_fk'
              className='global-form-input-select'
              value={this.state.article_type_fk}
              onChange={this.handleChange}
            >
              <option
                value={0}
                className='global-form-input-select-option'
                selected={true}
                disabled='disabled'
              >
                Seleccione un tipo de artículo...
              </option>
              {/* TODO */}
            </select>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Disponibilidad
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id='available_state'
              className='global-form-input-select'
              value={this.state.available_state}
              onChange={this.handleChange}
            >
              <option
                value=''
                className='global-form-input-select-option'
                selected={true}
                disabled='disabled'
              >
                Seleccione una disponibilidad...
              </option>
              {setSelectOptions(AVAILABILITIES)}
            </select>
          </div>

          <div className='global-form-group'>
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
                disabled='disabled'
              >
                Seleccione un estado...
              </option>
              {setSelectOptions(STATES)}
            </select>
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
              <option
                value=''
                className='global-form-input-select-option'
                selected={true}
                disabled='disabled'
              >
                Seleccione una rama...
              </option>
              {setSelectOptions(BRANCHES)}
            </select>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>Observaciones</span>
            <input
              id='obs'
              type='text'
              className='global-form-input'
              value={this.state.obs}
              onChange={this.handleChange}
            />
          </div>

          <span className='global-comp-sub-title'>ARTÍCULOS SECUNDARIOS</span>
          <span className='global-body-text'>
            El tipo de artículo seleccionado no posee elementos secundarios.
          </span>

          <div
            className='global-form-buttons-container'
            style={{ margin: '0px' }}
          >
            <button
              className='global-form-solid-button'
              onClick={this.createArticle}
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

export default CreateArticle
