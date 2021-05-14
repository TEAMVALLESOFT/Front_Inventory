import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { validateString, setSelectOptions } from '../../Functions/Helpers'
import { getElementById, getWarehouses } from '../../Functions/Get'
import { simpleRequest } from '../../Functions/Post'
import {
  NO_ITEMS_ERROR,
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
  BRANCHES,
  AVAILABILITIES,
  STATES,
  INVALID_STRING_MESSAGE,
} from '../../Functions/Constants'

class ModifyArticle extends Component {
  constructor() {
    super()
    this.state = {
      // Request states
      id: 0,
      warehouse_fk: 0,
      article_type_fk: 0,
      available_state: '',
      physical_state: '',
      branch: '',
      obs: '',

      // Auxiliary form states
      alert: '',
      timeout: '',
      classif: '',
      article_type_name: '',
      warehouses: [],
    }
  }

  componentDidMount() {
    getWarehouses(this.setWarehouses)

    let session_id = sessionStorage.getItem('edit_article_id')
    if (session_id && session_id > 0) {
      this.setState({ id: parseInt(session_id) })
      sessionStorage.removeItem('edit_article_id')

      // return getElementById('PATH' + session_id, this.setArticleInfo)
    }

    return
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'id' && value > 0) {
      // return getElementById('PATH' + session_id, this.setArticleInfo)
    }

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      // Request states
      id: 0,
      warehouse_fk: 0,
      article_type_fk: 0,
      available_state: '',
      physical_state: '',
      branch: '',
      obs: '',

      // Auxiliary form states
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

  // Functions related to requests
  setWarehouses = (response, body) => {
    if (response == 'success') {
      return this.setState({ warehouses: body })
    }

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert('attention', 'No hay bodegas creadas.')
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  setArticleInfo = (response, body) => {
    if (response == 'success') {
      this.setState({
        available_state: body,
        physical_state: body,
        branch: body,
        obs: body,
        warehouse_fk: body,
        article_type_fk: body,
      })

      return this.buildAlert('success', 'Información de artículo recuperada.')
    }

    this.clearInputs()

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert(
        'attention',
        'No se ha encontrado un artículo con ese ID. Por favor intente con otro.'
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  responseHandler = (response, body) => {
    if (response == 'success') {
      sessionStorage.removeItem('users')
      this.buildAlert('success', 'Artículo modificado con éxito.')

      return this.clearInputs()
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  modifyArticle = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)
      return
    }

    // Verify that obs are valid
    if (!validateString(this.state.obs)) {
      setTimeout(() => this.buildAlert('attention', INVALID_STRING_MESSAGE), 10)
      return
    }

    let body = {
      id: this.state.id,
      available_state: this.state.available_state,
      physical_state: this.state.physical_state,
      branch: this.state.branch,
      obs: this.state.obs,
      warehouse_fk: this.state.warehouse_fk,
      article_type_fk: this.state.article_type_fk,
    }

    // return simpleRequest('', 'PUT', body, this.responseHandler)
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
        <span className='global-comp-title'>Modificar artículo</span>
        <span className='global-comp-description'>
          Diligencie el formulario para editar un artículo. Puede especificar el
          ID o seleccionar la acción de editar en la opción de listar artículos
          del menú lateral.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>ESPECIFIQUE EL ARTÍCULO</span>
          <span className='global-body-text'>
            Si fue redirigido a través de la opción listar artículos, los
            siguientes campos se diligencian de forma automática.
          </span>
          <div className='global-form-group'>
            <span className='global-form-label'>
              ID
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='id'
              type='numeric'
              className='global-form-input'
              value={this.state.id}
              onChange={this.handleChange}
            />
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Clasificación
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='classif'
              type='text'
              className='global-form-input'
              value={this.state.classif}
              disabled={true}
            />
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Tipo de artículo
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='article_type_name'
              type='text'
              className='global-form-input'
              value={this.state.article_type_name}
              disabled={true}
            />
          </div>
          <span className='global-comp-sub-title'>EDITE EL ARTÍCULO</span>
          <span className='global-body-text'>
            El rótulo del artículo será recalculado en función de las
            modificaciones que realice. Recuerde que si modifica un artículo
            compuesto, la bodega y la rama de los artículos secundarios también
            se modificarán con los mismos valores.
          </span>

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
              <option value={0} disabled={true}>
                Seleccione una bodega...
              </option>
              {setSelectOptions(this.state.warehouses)}
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
          <div className='global-form-buttons-container'>
            <button
              className='global-form-solid-button'
              onClick={this.modifyArticle}
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

export default ModifyArticle
