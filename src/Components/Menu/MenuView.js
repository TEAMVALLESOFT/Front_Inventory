import React, { Component } from 'react'
import './Styles.css'

import CreateUser from '../Users/CreateUser'
import CreateArticleType from '../ArticleType/CreateArticleType'
import CreateWarehouse from '../Warehouses/CreateWarehouse'
import CreateArticle from '../Articles/CreateArticle'
import CreateBorrowing from '../Borrowing/CreateBorrowing'
import AuthBorrowingRequest from '../Borrowing/AuthBorrowingRequest'
import CreateReturning from '../Returning/CreateReturning'
import ListArticle from '../Articles/ListArticle'

class MenuView extends Component {
  constructor() {
    super()
    this.state = {
      selected: 1,
      modal: '',
    }
  }

  changeSelected = (event) => {
    let newID = parseInt(event.target.id)

    document.getElementById(this.state.selected).className = 'm-menu-label'
    document.getElementById(newID).className = 'm-menu-label selected'

    return this.setState({ selected: newID })
  }

  showUserMenu() {
    let visibility = document.getElementById('logout').style.visibility

    if (visibility == 'visible') {
      document.getElementById('logout').style.visibility = 'hidden'
      return
    }

    document.getElementById('logout').style.visibility = 'visible'
    return
  }

  showModal = (modal) => {
    this.setState({ modal: modal })
  }

  closeModal = () => {
    this.setState({ modal: '' })
  }

  logout = () => {
    this.props.changeView('login')
    return sessionStorage.clear()
  }

  getSubComponent() {
    switch (this.state.selected) {
      case 1:
        return (
          <ListArticle
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      case 2:
        return <CreateUser />
      case 3:
        return <CreateWarehouse />
      case 4:
        return <CreateArticleType />
      case 5:
        return <CreateArticle />
      case 6:
        return <CreateBorrowing />
      case 7:
        return (
          <AuthBorrowingRequest
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      case 8:
        return (
          <CreateReturning
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      default:
        return <div></div>
    }
  }

  render() {
    let component = this.getSubComponent()
    let name = sessionStorage.getItem('user_name')

    if (!name) {
      name = 'Nombre Apellido'
    }

    return (
      <div className='m-container'>
        {this.state.modal}
        <div
          id='logout'
          className='m-close-session'
          style={{ visibility: 'hidden' }}
          onClick={this.logout}
        >
          <img className='m-icon' src='./logout_gray.png' alt='logout' />
          <span className='m-label'>Cerrar sessión</span>
        </div>
        {/* HEADER */}
        <div className='m-header'>
          <div className='m-logo-container'>
            <img className='m-logo' src='./logo-scouts.png' alt='logo' />
            <span className='m-label'>Grupo Scout Centinelas 113</span>
          </div>
          <div className='m-loged-user-container' onClick={this.showUserMenu}>
            <div className='m-ellipse'>{name[0]}</div>
            <span className='m-user-name'>{name}</span>
            <img className='m-icon' src='./arrow_gray.png' alt='arrow' />
          </div>
        </div>
        {/* MENU */}
        <div className='m-body-container'>
          <div className='m-menu-container'>
            <div className='m-menu-static-label'>
              <img className='m-icon' src='./home_gray.png' alt='home' />
              <span className='m-label'>Cuadro de seguimiento</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={1}
                className='m-menu-label selected'
                onClick={this.changeSelected}
              >
                Artículos
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./person_gray.png' alt='person' />
              <span className='m-label'>Usuarios</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={2}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear usuario
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img
                className='m-icon'
                src='./inventory_gray.png'
                alt='inventory'
              />
              <span className='m-label'>Bodegas</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={3}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear bodega
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./types_gray.png' alt='types' />
              <span className='m-label'>Tipos de artículo</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={4}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear tipo de artículo
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img
                className='m-icon'
                src='./articles_gray.png'
                alt='articles'
              />
              <span className='m-label'>Artículos</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={5}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear artículo
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./outbox_gray.png' alt='outbox' />
              <span className='m-label'>Préstamos</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={6}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Solicitar préstamo
              </div>
              <div
                id={7}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Autorizar solicitudes
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./inbox_gray.png' alt='inbox' />
              <span className='m-label'>Devoluciones</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={8}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear constancia
              </div>
              <div
                id={9}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Autorizar solicitudes
              </div>
            </div>
          </div>
          {/* SUB COMPONENT */}
          <div className='m-component-container'>{component}</div>
        </div>
      </div>
    )
  }
}

export default MenuView
