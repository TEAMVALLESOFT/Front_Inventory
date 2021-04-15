import React, { Component } from 'react'
import './Styles.css'

import Modal from './Modal'
import {
  getArticles,
  getWarehouses,
  getAllArticleTypes,
} from '../../Functions/Get'
import { setSelectOptions } from '../../Functions/Helpers'
import { AVAILABILITIES } from '../../Functions/Constants'

class ListArticle extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      article_types: [],
      warehouses: [],
      warehouse_fk: '',
      article_type_fk: '',
      available_state_fk: '',
      value: '',
    }
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value
    let temp = []

    if (attribute == 'warehouse_fk') {
      let warehouse = value
      getArticles(
        warehouse,
        this.state.article_type_fk,
        this.state.value,
        this.setArticles
      )
    }

    if (attribute == 'article_type_fk') {
      let article_type_fk = value
      getArticles(
        this.state.warehouse_fk,
        article_type_fk,
        this.state.value,
        this.setArticles
      )
    }

    if (attribute == 'available_state_fk') {
      this.setState({ [attribute]: value })
      getArticles(
        this.state.warehouse_fk,
        this.state.article_type_fk,
        this.state.value,
        this.setArticles
      )
    }

    return this.setState({ [attribute]: value })
  }

  componentDidMount(event) {
    let warehouse = ''
    let article_type_fk = ''

    getArticles(warehouse, article_type_fk, this.state.value, this.setArticles)
    getWarehouses(this.setWarehouses)
    getAllArticleTypes(this.setArticleTypes)
  }

  // Functions to handle states
  setArticles = async (response, body) => {
    if (response == 'success') {
      let temp = []
      if (!this.state.warehouse_fk) {
        if (!this.state.available_state_fk) {
          return this.setState({ articles: body })
        } else {
          for (let z = 0; z < body.length; z++) {
            if (body[z]['available_state'] == this.state.available_state_fk) {
              temp.push(body[z])
            }
          }
          return this.setState({ articles: temp })
        }
      }

      for (let x = 0; x < body.length; x++) {
        if (body[x]['warehouse_fk'] == this.state.warehouse_fk) {
          if (!this.state.available_state_fk) {
            temp.push(body[x])
          } else {
            if (body[x]['available_state'] == this.state.available_state_fk) {
              temp.push(body[x])
            }
          }
        }
      }

      if (!temp.length) {
        alert('No hay items')
        return this.setState({ articles: temp })
      }

      return this.setState({ articles: temp })
    }

    if (body == 'No items' || body.message == 'No items') {
      this.setState({ articles: [] })
      return alert('No items')
    }

    this.setState({ articles: [] })
    return alert('no items')
  }

  setWarehouses = (response, body) => {
    if (response == 'success') {
      return this.setState({ warehouses: body })
    }

    if (body == 'No items' || body.message == 'Not Found') {
      return alert('No hay bodegas creadas.')
    }

    return alert(ERROR_MESSAGE)
  }

  setArticleTypes = (response, body) => {
    if (response == 'success') {
      return this.setState({ article_types: body })
    }

    if (body == 'No items') {
      document.getElementById('article_type_fk').disabled = true
      this.setState({ article_types: [] })

      return alert(
        'No hay tipos de artículo asociados a la clasificación seleccionada.'
      )
    }
  }

  // Auxiliary functions
  setTable() {
    let rows = this.state.articles

    if (rows.length < 1) {
      return (
        <span className='global-body-text' style={{ marginBottom: '0px' }}>
          Actualmente no hay artículos guardados.
        </span>
      )
    }

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={obj.id}>
          <td>{obj.label}</td>
          <td>{obj.classif}</td>
          <td>{obj.name}</td>
          <td>{obj.branch}</td>
          <td>{obj.available_state}</td>
          <td>{obj.physical_state}</td>
          {obj.obs ? (
            <td>
              <span
                className='global-table-link'
                onClick={() => this.showModal(obj.name, obj.label, obj.obs)}
              >
                Ver más
              </span>
            </td>
          ) : (
            <td>
              <span className='global-table-link' style={{ color: '#999999' }}>
                N/A
              </span>
            </td>
          )}
        </tr>
      )
    }

    let table = (
      <table>
        <tr>
          <th>Rótulo</th>
          <th>Clasificación</th>
          <th>Tipo de artículo</th>
          <th>Rama</th>
          <th>Disponibilidad</th>
          <th>Estado</th>
          <th>Observaciones</th>
        </tr>
        {table_rows}
      </table>
    )

    return table
  }

  showModal(name, label, obs) {
    return this.props.showModal(
      <Modal name={name} label={label} obs={obs} closeModal={this.closeModal} />
    )
  }

  closeModal = () => {
    return this.props.closeModal()
  }

  render() {
    let table = this.setTable()

    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>Lista de artículos</span>
        <span className='global-comp-description'>
          Aquí podrá listar todos los artículos en existencia. utilice las
          listas desplegables para filtrar los elementos.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-special-form-group'>
            <select
              id='warehouse_fk'
              className='global-special-form-input-select'
              value={this.state.warehouse_fk}
              defaultValue=''
              onChange={this.handleChange}
            >
              <option value=''>Todas las bodegas...</option>
              {setSelectOptions(this.state.warehouses)}
            </select>
            <select
              id='article_type_fk'
              className='global-special-sec-form-input-select'
              value={this.state.article_type_fk}
              defaultValue=''
              onChange={this.handleChange}
            >
              <option value=''>Todos los tipos de artículos...</option>
              {setSelectOptions(this.state.article_types)}
            </select>
            <select
              id='available_state_fk'
              className='global-special-sec-form-input-select'
              value={this.state.available_state_fk}
              defaultValue=''
              onChange={this.handleChange}
            >
              <option value=''>Todos los estados de disponibilidad...</option>
              {setSelectOptions(AVAILABILITIES)}
            </select>
          </div>
          {table}
        </div>
      </div>
    )
  }
}

export default ListArticle
