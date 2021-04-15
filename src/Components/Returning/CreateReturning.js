import React, { Component } from 'react'

import Alert from '../Alerts/Alert'
import CreationModal from './CreationModal'
// import { getBorrowings } from '../../Functions/Get'
import { ERROR_MESSAGE, ALERT_TIMEOUT } from '../../Functions/Constants'

class CreateReturning extends Component {
  constructor() {
    super()
    this.state = {
      alert: '',
      timeout: '',
      borrowing_requests: [
        {
          id: 1,
          user_name: 'Dummy',
          warehouse_name: 'Dummy',
          return_date: 'Dummy',
          delay: 'Dummy',
          auth_state: 'Dummy',
          article_list: [
            { article_type_name: 'dummy', article_label: 'dummy' },
            { article_type_name: 'dummy', article_label: 'dummy' },
          ],
        },
        {
          id: 2,
          user_name: 'Dummy',
          warehouse_name: 'Dummy',
          return_date: 'Dummy',
          delay: 'Dummy',
          auth_state: 'Dummy',
          article_list: [
            { article_type_name: 'dummy', article_label: 'dummy' },
          ],
        },
      ],
    }
  }

  componentDidMount() {
    // getBorrowings(this.setBorrowings)
  }

  // Functions related to requests
  setBorrowings = (response, body) => {}

  // Functions to handle alerts
  showAlert = (response, body) => {
    if (response == 'success') {
      return this.buildAlert(
        'success',
        'Constancia de devolución creada con éxito.'
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

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

  // Functions to handle modal
  showModal = (event) => {
    let id = event.target.id
    let array = this.state.borrowing_requests

    let borrowing = {}
    for (let i = 0; i < array.length; i++) {
      let obj = array[i]
      if (parseInt(obj.id) == parseInt(id)) {
        borrowing = obj
        continue
      }
    }

    if (borrowing == {}) {
      return
    }

    return this.props.showModal(
      <CreationModal borrowing={borrowing} closeModal={this.closeModal} />
    )
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
          Actualmente no hay solicitudes de préstamos autorizadas para generar
          su constancia de devolución.
        </span>
      )
    }

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={'tr-' + obj.id}>
          <td>{obj.id}</td>
          <td>{obj.user_name}</td>
          <td>{obj.return_date}</td>
          <td>{obj.delay}</td>
          <td>{obj.auth_state}</td>
          <td>
            <span
              id={obj.id}
              className='global-table-link'
              onClick={this.showModal}
            >
              Crear constancia
            </span>
          </td>
        </tr>
      )
    }

    let table = (
      <table>
        <tr>
          <th>R. Préstamo</th>
          <th>Solicitante</th>
          <th>Fecha acordada de retorno</th>
          <th>Retraso en la entrega</th>
          <th>Estado préstamo</th>
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
          Crear constancia de devolución
        </span>
        <span className='global-comp-description'>
          Seleccione una solicitud de préstamo aprobada para crear la constancia
          de devolución.
        </span>
        <div className='global-comp-form-container'>{table}</div>
      </div>
    )
  }
}

export default CreateReturning
