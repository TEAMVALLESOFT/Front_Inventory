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
import AuthReturningRequest from '../Returning/AuthReturningRequest'

import { setOptionsByRol } from '../../Functions/MenuOptions'
import { parseOptionToStatic } from '../../Functions/Helpers'

class MenuView extends Component {
  constructor() {
    super()
    this.state = {
      selected: 0,
      modal: '',
    }
  }

  componentDidMount() {
    this.collapseAll()

    let rol = sessionStorage.getItem('user_rol')
    let id = 'group-'
    let num = 1

    switch (rol) {
      case 'administrador':
        id = id + 1
        this.setState({ selected: 1 })
        break

      case 'jefe de bodega':
        id = id + 3
        num = 5
        this.setState({ selected: 5 })
        break

      default:
        id = id + 5
        num = 9
        this.setState({ selected: 9 })
        break
    }

    let component = document.getElementById(id)
    component.style.display = 'block'
    document.getElementById(num).className = 'm-menu-label selected'

    id = parseOptionToStatic(num)
    document.getElementById(id).className =
      'm-menu-static-label static-selected'

    return
  }

  // Functions to handle states
  changeSelected = (event) => {
    let newID = parseInt(event.target.id)

    document.getElementById(this.state.selected).className = 'm-menu-label'
    document.getElementById(newID).className = 'm-menu-label selected'

    let id = parseOptionToStatic(this.state.selected)
    document.getElementById(id).className = 'm-menu-static-label'

    id = parseOptionToStatic(newID)
    document.getElementById(id).className =
      'm-menu-static-label static-selected'

    return this.setState({ selected: newID })
  }

  logout = () => {
    this.props.changeView('login')
    return sessionStorage.clear()
  }

  // Functions to handle modal
  showModal = (modal) => {
    this.setState({ modal: modal })
  }

  closeModal = () => {
    this.setState({ modal: '' })
  }

  // Auxiliary functions
  showUserMenu() {
    let visibility = document.getElementById('logout').style.visibility

    if (visibility == 'visible') {
      document.getElementById('logout').style.visibility = 'hidden'
      return
    }

    document.getElementById('logout').style.visibility = 'visible'
    return
  }

  getSubComponent() {
    switch (this.state.selected) {
      case 1:
        // LIST USERS
        return <div></div>
      case 2:
        return <CreateUser />
      case 3:
        // MODIFY USER
        return <div></div>
      case 4:
        return <CreateWarehouse />
      case 5:
        return <CreateArticleType />
      case 6:
        return (
          <ListArticle
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      case 7:
        return <CreateArticle />
      case 8:
        // MODIFY ARTICLE
        return <div></div>
      case 9:
        // LIST BORROWINGS
        return <div></div>
      case 10:
        return <CreateBorrowing />
      case 11:
        // MODIFY BORROWING
        return <div></div>
      case 12:
        return (
          <AuthBorrowingRequest
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      case 13:
        // LIST RETURNINGS
        return <div></div>
      case 14:
        return (
          <CreateReturning
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      case 15:
        // MODIFY RETURNING
        return <div></div>
      case 16:
        return (
          <AuthReturningRequest
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
        )
      default:
        return <div></div>
    }
  }

  collapse = (event) => {
    this.collapseAll()

    let id = event.target.id.split('-')
    let component = document.getElementById('group-' + id[1])
    component.style.display = 'block'

    return
  }

  collapseAll = () => {
    for (let i = 1; i <= 16; i++) {
      let id = 'group-' + i
      let component = document.getElementById(id)

      if (component != null) {
        component.style.display = 'none'
      }
    }

    return
  }

  getRolOptions() {
    let rol = sessionStorage.getItem('user_rol')

    if (!rol) {
      rol = 'jefe de rama'
    }

    return setOptionsByRol(rol, this.collapse, this.changeSelected)
  }

  render() {
    let menuOptions = this.getRolOptions()
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
          <div className='m-menu-container'>{menuOptions}</div>
          {/* SUB COMPONENT */}
          <div className='m-component-container'>{component}</div>
        </div>
      </div>
    )
  }
}

export default MenuView
