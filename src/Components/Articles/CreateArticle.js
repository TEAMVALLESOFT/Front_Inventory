import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import SecondaryForm from './SecondaryForm'
import { setSelectOptions } from '../../Functions/Helpers'
import { postRequest } from '../../Functions/Post'
import { getWarehouses } from '../../Functions/Get'
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
      cont: 0,
      secondaryArticles: [],
      warehouses: [],
      article_types: [
        {
          value: 1,
          name: 'Carpa pequeña',
          is_parent: true,
        },
        { value: 2, name: 'Estacas', is_parent: false },
      ],
    }
  }

  componentDidMount() {
    getWarehouses(this.setWarehouses)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (
      (this.state.warehouse_fk > 0 || attribute == 'warehouse_fk') &&
      (this.state.classif.length > 0 || attribute == 'classif')
    ) {
      document.getElementById('article_type_fk').disabled = false
    }

    if (attribute == 'article_type_fk') {
      for (let i = 0; i < this.state.article_types.length; i++) {
        let obj = this.state.article_types[i]
        if (obj.value == value && obj.is_parent) {
          let array = []
          array.push(
            <SecondaryForm
              id='sf-0'
              key='sf-0'
              delete={this.deleteSecondaryForm}
            />
          )
          this.setState({
            secondaryArticles: array,
            cont: 0,
          })
          continue
        }

        if (obj.value == value && !obj.is_parent) {
          this.setState({
            secondaryArticles: [],
            cont: 0,
          })
          continue
        }
      }
    }

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

  setWarehouses = (response, body) => {
    if (response == 'success') {
      return this.setState({ warehouses: body })
    }

    if (body == 'No items') {
      return this.buildAlert('attention', 'No hay bodegas creadas.')
    }

    return this.buildAlert('error', ERROR_MESSAGE)
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

  addNewSecondaryForm = () => {
    let array = this.state.secondaryArticles
    let newCont = this.state.cont + 1

    array.push(
      <SecondaryForm
        id={'sf-' + newCont}
        key={'sf-' + newCont}
        delete={this.deleteSecondaryForm}
      />
    )

    return this.setState({ secondaryArticles: array, cont: newCont })
  }

  deleteSecondaryForm = (key) => {
    if (this.state.secondaryArticles.length == 1) {
      return
    }

    let array = this.state.secondaryArticles
    for (let i = 0; i < array.length; i++) {
      if (array[i].key == key) {
        array.splice(i, 1)
        continue
      }
    }

    this.setState({ secondaryArticles: [] })

    return this.setState({ secondaryArticles: array })
  }

  enableChildForms = () => {
    let length = this.state.secondaryArticles.length

    if (length > 0) {
      let array = []

      for (let i = 0; i < length; i++) {
        array.push(this.state.secondaryArticles[i])
      }

      return (
        <div className='ca-secondary-form-container'>
          {array}
          <div className='ca-secondary-form-add-container'>
            <img
              className='ca-add-icon'
              src='./add_gray.png'
              alt='add'
              onClick={this.addNewSecondaryForm}
            />
            <span
              className='sf-header-title'
              style={{ cursor: 'pointer' }}
              onClick={this.addNewSecondaryForm}
            >
              Agregar artículo
            </span>
          </div>
        </div>
      )
    }

    return (
      <span className='global-body-text'>
        El tipo de artículo seleccionado no posee elementos secundarios.
      </span>
    )
  }

  render() {
    let forms = this.enableChildForms()

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
              {setSelectOptions(this.state.warehouses)}
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
              disabled={true}
            >
              <option
                value={0}
                className='global-form-input-select-option'
                selected={true}
                disabled={true}
              >
                Seleccione un tipo de artículo...
              </option>
              {setSelectOptions(this.state.article_types)}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
          {forms}

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
