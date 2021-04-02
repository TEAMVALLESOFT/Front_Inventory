import React, { Component} from 'react'
import './Styles.css'

class CreateArticleType extends Component {
  constructor() {
    super() 
    this.state = {
      name: '',
      desc: '',
      classif: '',
      is_parent: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return(
	  <div className='ca-container'>
        <span className='global-comp-title'>Crear tipo de artículo</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un tipo de artículo. Los campos
          marcados con <strong className='global-form-mandatory'>*</strong> son obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Descripción
            </span>
            <input className='global-form-input' />
          </div>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Categoría
              <strong className='global-form-mandatory'> *</strong>
            </span>		
			      <select className='global-form-input-select'>
              <option className='global-form-input-select-option' value='#'>Seleccione uno</option>
              <option className='global-form-input-select-option' value='Elementos de cocina'>Elementos de cocina</option>
              <option className='global-form-input-select-option' value='Elementos de limpieza'>Elementos de limpieza</option>
              <option className='global-form-input-select-option' value='Elementos para acampar'>Elementos para acampar</option>
            </select>			
          </div>
          <div className='global-form-group-checkbox'>
            <input
              className='global-form-checkbox'
              name="is_parent"
              type="checkbox"
              checked={this.state.is_parent}
              onChange={this.handleInputChange} />
            <span className='global-form-label'>¿Es compuesto?
              <span className="global-form-mandatory"> *</span>
            </span>
          </div>
          <div className='global-form-buttons-container'>
            <button className='global-form-solid-button'>Enviar</button>
            <button className='global-form-outline-button'>Cancelar</button>
          </div>
        </div>
      </div> 
    )
  }
}

export default CreateArticleType