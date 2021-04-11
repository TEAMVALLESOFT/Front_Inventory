import React, { Component } from 'react'
import './Styles.css'

import { setSelectOptions } from '../../Functions/Helpers'
import { setSelectArticleOptions } from '../../Functions/Helpers'
import { getArticles } from '../../Functions/Get'
import {
  CLASSIFICATIONS,
  BRANCHES,
} from '../../Functions/Constants'

class AuxiliaryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Request states
      article_fk: '',

      // Auxiliary form states
      classif: '',
      article_type_fk: 0,
      branch: '',
      article_types: [
        {
          value: 1,
          name: 'Carpa pequeña',
        },
      ],
      articles: [],
    }

    this.prevState = {
      // validate previous states
      article_fk: '',
  
      // validate previous form states
      classif: '',
      article_type_fk: 0,
      branch: '',
    }
  }

  // Functions to handle states
  handleChange = (event) => {
    let comp_attribute = event.target.id.split('-')
    let attribute = comp_attribute[2]
    let value = event.target.value

    return this.setState({ [attribute]: value })
  }
  
  componentDidMount() {
    localStorage.setItem(this.props.id, 'incomplete')
    getArticles(this.setArticles)
  }

  componentWillUnmount() {
    localStorage.setItem(this.props.id, 'delete')
  }

  collapse = () => {
    let component = document.getElementById(this.props.id)

    if (component.style.display == 'block') {
      component.style.display = 'none'
      return
    }

    component.style.display = 'block'
    return
  }

  delete = () => {
    return this.props.delete(this.props.id)
  }

  setArticles = (response, body) => {
    if (response == 'success') {
  
      return this.setState({ articles: body })
    }

    if (body == 'No items') {
      alert('No hay artículos creados.')
    }

    return alert(ERROR_MESSAGE)
  }

  componentDidUpdate() {
    // Uso tipico (no olvides de comparar las props):
    if (this.state.article_fk !== this.prevState.article_fk) {
      if (this.checkMandatoryInputs()){
        localStorage.setItem(this.props.id, this.state.article_fk)
        console.log(localStorage.getItem(this.props.id), this.props.id)
      }
    }
  }

  clearInputs = () => {
    return this.setState({
      // Request states
      article_fk: '',

      // Auxiliary form states
      classif: '',
      article_type_fk: 0,
      branch: '',
      article_types: [
        {
          value: 1,
          name: 'Carpa pequeña',
        },
      ],
      articles: [],
    })
  }

  checkMandatoryInputs() {
    if (this.state.article_type_fk < 0) {
      return false
    }

    if (!this.state.branch) {
      return false
    }

    if (!this.state.classif) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='af-container'>
        <div className='af-header-container'>
          <img
            className='af-delete-icon'
            src='./remove_gray.png'
            alt='delete'
            onClick={this.delete}
          />
          <div className='af-header'>
            <span className='af-header-title'>
              {(this.state.article_type_fk && this.state.article_fk)?(this.state.article_types[0]['name']+' - '+this.state.article_fk): 'Nuevo Artículo'}
            </span>
            <img
              className='af-arrow-icon'
              src='./arrow_gray.png'
              alt='arrow'
              onClick={this.collapse}
            />
          </div>
        </div>
        <div
          id={this.props.id}
          className='af-body-container'
          style={{ display: 'none' }}
        >
          <div className='global-form-group'>
            <span className='global-form-label'>
              Clasificación
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id={this.props.id + '-' + 'classif'}
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
              id={this.props.id + '-' + 'article_type_fk'}
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
              {setSelectOptions(this.state.article_types)}
            </select>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Rama
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id={this.props.id + '-' + 'branch'}
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
            <span className='global-form-label'>
              Artículo
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <select
              id={this.props.id + '-' + 'article_fk'}
              className='global-form-input-select'
              value={this.state.article_fk}
              onChange={this.handleChange}
            >
              <option
                value=''
                className='global-form-input-select-option'
                selected={true}
                disabled='disabled'
              >
                Seleccione un artículo...
              </option>
              {setSelectArticleOptions(this.state.articles)}
            </select>
          </div>

        </div>
      </div>
    )
  }
}

export default AuxiliaryForm
