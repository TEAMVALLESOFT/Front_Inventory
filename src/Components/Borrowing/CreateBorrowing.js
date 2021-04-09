import React, { Component } from 'react'
import './Styles.css'

import AuxiliaryForm from './AuxiliaryForm'
import { setSelectOptions } from '../../Functions/Helpers'
import { getWarehouses } from '../../Functions/Get'
import {
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
} from '../../Functions/Constants'

class CreateBorrowing extends Component {
  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      // Request states
      name: sessionStorage.getItem('user_name'),
      email: sessionStorage.getItem('user_email'),
      warehouse_fk: 0,
      pick_up_date:'',
      return_date: '',

      // Auxiliary form states
      classif: '',
      alert: '',
      timeout: '',
      cont: 1,
      secondaryArticles: [<AuxiliaryForm
        id={'sf-1'}
        key={'sf-1'}
        delete={this.deleteSecondaryForm}
      />],
      warehouses: [],
      branch: '',
      Articles: [],
      article_types: [
        {
          value: 1,
          name: 'Carpa pequeña',
        },
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

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      name: '',
      email: '',
      warehouse_fk: 0,
      pick_up_date:'',
      return_date: '',  
    })
  }

  setWarehouses = (response, body) => {
    if (response == 'success') {
      return this.setState({ warehouses: body })
    }

    if (body == 'No items') {
      alert('No hay bodegas creadas.')
    }

    return alert(ERROR_MESSAGE)
  }


  scroll = () => {
    this.myRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == 'success') {
      alert('Petición de solicitud creada con éxito.')
      return this.clearInputs()
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  CreateBorrowing = () => {
    this.close()
    this.scroll()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      alert(MANDATORY_MESSAGE)
      return
    }

    let body = {
      name: this.state.name,
      email: this.state.email,
      warehouse_fk: this.state.warehouse_fk,
      pick_up_date: this.state.pick_up_date,
      return_date: this.state.return_date,
    }

  }

  // Auxiliary functions
  checkMandatoryInputs() {
    if (this.state.warehouse_fk < 0) {
      return false
    }


    if (!this.state.pick_up_date) {
      return false
    }

    if (!this.state.return_date) {
      return false
    }

    return true
  }

  addNewSecondaryForm = () => {
    let array = this.state.secondaryArticles
    let newCont = this.state.cont + 1

    array.push(
      <AuxiliaryForm
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
        <div className='cb-secondary-form-container'>
          {array}
          <div className='cb-secondary-form-add-container'>
            <img
              className='cb-add-icon'
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

    return
  }

  render() {
    let forms = this.enableChildForms()

    return (
        <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title' ref={this.myRef}>
          Solicitud de préstamo
        </span>
        <span className='global-comp-description'>
          Diligencie el formulario para solicitar un préstamo. Todos los campos son obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>SOLICITUD</span>
		  
		  <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre solicitante
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='name'
              type='text'
              value={this.state.name}
              onChange={this.handleChange}
              className='global-form-input'
              disabled = 'disabled'
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Correo solicitante
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='email'
              value={this.state.email}
              onChange={this.handleChange}
              className='global-form-input'
              type='email'
              disabled = 'disabled'
            />
          </div>
		  
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
              Fecha de recogida
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='pick_up_date'
              value={this.state.pick_up_date}
              onChange={this.handleChange}
              className='global-form-input'
              type='date'
            />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Fecha de devolución
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input
              id='return_date'
              value={this.state.return_date}
              onChange={this.handleChange}
              className='global-form-input'
              type='date'
            />
          </div>

          <span className='global-comp-sub-title'>ARTÍCULOS</span>
          {forms}

          <div
            className='global-form-buttons-container'
            style={{ margin: '0px' }}
          >
            <button
              className='global-form-solid-button'
              onClick={this.createBorrowing}
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

export default CreateBorrowing