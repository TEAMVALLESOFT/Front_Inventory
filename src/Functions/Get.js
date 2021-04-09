import { HOST, LIST_WAREHOUSES } from './Constants'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// SIMPLE POST REQUES
export function getWarehouses(responseHandler) {
  if (sessionStorage.getItem('warehouses')) {
    let storageWarehouses = JSON.parse(sessionStorage.getItem('warehouses'))

    if (storageWarehouses[0].hasOwnProperty('warehouse_name')) {
      let warehouses = []
      for (let i = 0; i < storageWarehouses.length; i++) {
        let obj = storageWarehouses[i]

        warehouses.push({ value: obj.id, name: obj.warehouse_name })
      }

      sessionStorage.setItem('warehouses', JSON.stringify(warehouses))
      responseHandler('success', warehouses)
      return
    }

    responseHandler('success', storageWarehouses)
    return
  }

  let url = HOST + LIST_WAREHOUSES

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      if (response.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let warehouses = []
      for (let i = 0; i < response.length; i++) {
        let obj = response[i]

        warehouses.push({ value: obj.id, name: obj.warehouse_name })
      }

      let json = JSON.stringify(response)
      sessionStorage.setItem('warehouses', json)
      responseHandler('success', warehouses)
    })
    .catch((error) => responseHandler('error', error))
}
