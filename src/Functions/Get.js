import {
  HOST,
  LIST_WAREHOUSES,
  ARTICLE_TYPE_LIST,
  LIST_ARTICLES,
  LIST_BORROWINGS,
  DAY_IN_MS,
} from './Constants'

function handleErrors(response) {
  if (response.status == 204) {
    throw Error('No items')
  }

  if (!response.ok) {
    throw Error(response.statusText)
  }

  return response
}

// CUSTOM GET REQUEST
export function getWarehouses(responseHandler) {
  let session_warehouses = sessionStorage.getItem('warehouses')

  if (session_warehouses && session_warehouses != '[]') {
    let storage_warehouses = JSON.parse(session_warehouses)

    responseHandler('success', storage_warehouses)
    return
  }

  let url = HOST + LIST_WAREHOUSES

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let rows = response.rows

      if (rows.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let warehouses = []
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        warehouses.push({ value: obj.id, name: obj.warehouse_name })
      }

      let json = JSON.stringify(warehouses)
      sessionStorage.setItem('warehouses', json)
      responseHandler('success', warehouses)
    })
    .catch((error) => responseHandler('error', error))
}

export function getArticleTypes(classif, responseHandler) {
  let session_classif = ''
  switch (classif) {
    case 'Elementos de cocina':
      session_classif = 'kitchen'
      break
    case 'Elementos de limpieza':
      session_classif = 'cleaning'
      break
    case 'Elementos para acampar':
      session_classif = 'camp'
      break
  }

  if (!session_classif) {
    return responseHandler('error', 'No valid classif')
  }

  let condition = sessionStorage.getItem('article_types_' + session_classif)
  if (condition && condition != '[]') {
    let storage_article_types = JSON.parse(
      sessionStorage.getItem('article_types_' + session_classif)
    )

    responseHandler('success', storage_article_types)
    return
  }

  let url = HOST + ARTICLE_TYPE_LIST + '?classif=' + classif
  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let rows = response.rows

      if (rows.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let article_types = []
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        article_types.push({
          value: obj.id,
          name: obj.article_type_name,
          is_parent: obj.is_parent == 1 ? true : false,
        })
      }

      let json = JSON.stringify(article_types)
      sessionStorage.setItem('article_types_' + session_classif, json)
      responseHandler('success', article_types)
    })
    .catch((error) => responseHandler('error', error))
}

export function getArticles(warehouse, article_type, branch, responseHandler) {
  let params =
    '?warehouse_id=' +
    warehouse +
    '&article_type=' +
    article_type +
    '&branch=' +
    branch
  let url = HOST + LIST_ARTICLES + params

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let rows = response.rows

      if (rows.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let articles = []
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        articles.push({
          id: obj.id,
          label: obj.label,
          branch: obj.branch,
          available_state: obj.available_state,
          physical_state: obj.physical_state,
          obs: obj.obs,
          name: obj.Tipo.article_type_name,
          classif: obj.Tipo.classif,
          warehouse_fk: obj.Bodega.id,
        })
      }

      responseHandler('success', articles)
    })
    .catch((error) => responseHandler('error', error))
}

export function getBorrowings(responseHandler) {
  // Get information from session storage
  let session_object = sessionStorage.getItem('borrowings')
  let json_object = JSON.parse(session_object)

  if (json_object && json_object.length > 0) {
    responseHandler('success', json_object)
    return
  }

  // Make the request if there is nothing stored
  let url = HOST + LIST_BORROWINGS

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let rows = response.rows

      if (rows.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let json = JSON.stringify(rows)
      sessionStorage.setItem('borrowings', json)
      responseHandler('success', rows)
    })
    .catch((error) => responseHandler('error', error))
}

export function getFilteredBorrowings(responseHandler) {
  // Get information from session storage
  let session_object = sessionStorage.getItem('filtered_borrowings')
  let json_object = JSON.parse(session_object)

  if (json_object && json_object.length > 0) {
    responseHandler('success', json_object)
    return
  }

  // Make the request if there is nothing stored
  let url = HOST + LIST_BORROWINGS + '?has_returning=false'

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let rows = response.rows

      if (rows.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      // Calculation of the delay of a returning
      for (let i = 0; i < rows.length; i++) {
        if (Date.parse(rows[i].return_date) > Date.now()) {
          rows[i].delay = 'No hay retraso'
        } else {
          let delay_days =
            (Date.now() - Date.parse(rows[i].return_date)) / DAY_IN_MS
          if (delay_days < 1) {
            rows[i].delay = 'Se debe entregar hoy'
          } else if (delay_days < 2) {
            rows[i].delay = 'La entrega está retrasada por 1 día'
          } else {
            rows[i].delay =
              'La entrega está retrasada por ' +
              Math.trunc(delay_days) +
              ' días'
          }
        }
      }

      let json = JSON.stringify(rows)
      sessionStorage.setItem('filtered_borrowings', json)
      responseHandler('success', rows)
    })
    .catch((error) => responseHandler('error', error))
}

// SIMPLE GET REQUESTS
export function getElementById(path, responseHandler) {
  // Path should have id as param
  let url = HOST + path

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      responseHandler('success', response[0])
    })
    .catch((error) => responseHandler('error', error))
}

export function getAllArticleTypes(responseHandler) {
  let url = HOST + ARTICLE_TYPE_LIST

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let rows = response.rows

      if (rows.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let articles = []
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        articles.push({
          value: obj.id,
          name: obj.article_type_name,
        })
      }

      responseHandler('success', articles)
    })
    .catch((error) => responseHandler('error', error))
}
