import React, { Component } from 'react'
import './Styles.css'

import Modal from './Modal'
// import { getBorrowings } from '../../Functions/Get'

class AuthBorrowingRequest extends Component {
  constructor() {
    super()
    this.state = {
      borrowing_requests: [
        {
          borrowing_id: 1,
          user_name: 'Dummy',
          creation_date: 'Dummy',
          pick_up_date: 'Dummy',
          return_date: 'Dummy',
          auth_state: 'Dummy',
        },
        {
          borrowing_id: 2,
          user_name: 'Dummy',
          creation_date: 'Dummy',
          pick_up_date: 'Dummy',
          return_date: 'Dummy',
          auth_state: 'Dummy',
        },
      ],
    }
  }

  componentDidMount() {
    // getBorrowings(this.setBorrowings)
  }

  // Functions related to requests
  setBorrowings = (response, body) => {}

  // Functions to handle modal
  showModal = () => {
    return this.props.showModal(<Modal closeModal={this.closeModal} />)
  }

  closeModal = () => {
    return this.props.closeModal()
  }

  // Auxiliary functions
  setTable() {
    let rows = this.state.borrowing_requests

    if (rows.length < 1) {
      return (
        <span className='global-body-text' style={{ marginBottom: '0px' }}>
          Actualmente no hay solicitudes de préstamos para autorizar.
        </span>
      )
    }

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={'tr-' + obj.borrowing_id}>
          <td>{obj.borrowing_id}</td>
          <td>{obj.user_name}</td>
          <td>{obj.creation_date}</td>
          <td>{obj.pick_up_date}</td>
          <td>{obj.return_date}</td>
          <td>{obj.auth_state}</td>
          <td>
            <span className='global-table-link' onClick={this.showModal}>
              Autorizar
            </span>
          </td>
        </tr>
      )
    }

    let table = (
      <table>
        <tr>
          <th>Referencia</th>
          <th>Solicitante</th>
          <th>Fecha solicitud</th>
          <th>Fecha de recogida</th>
          <th>Fecha de retorno</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        {table_rows}
      </table>
    )

    return table
  }

  render() {
    let table = this.setTable()

    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>
          Autorizar solicitudes de préstamos
        </span>
        <span className='global-comp-description'>
          Seleccione una solicitud de préstamos para autorizarla.
        </span>
        <div className='global-comp-form-container'>{table}</div>
      </div>
    )
  }
}

export default AuthBorrowingRequest
