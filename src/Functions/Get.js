import {
  HOST,
  LIST_WAREHOUSES,
  ARTICLE_TYPE_LIST,
  LIST_ARTICLES,
} from './Constants'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// COMMON POST REQUEST
export function getWarehouses(responseHandler) {
  if (sessionStorage.getItem('warehouses')) {
    let storage_warehouses = JSON.parse(sessionStorage.getItem('warehouses'))

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
      if (response.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let warehouses = []
      for (let i = 0; i < response.length; i++) {
        let obj = response[i]

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

  if (sessionStorage.getItem('article_types_' + session_classif)) {
    let storage_article_types = JSON.parse(
      sessionStorage.getItem('article_types_' + session_classif)
    )

    responseHandler('success', storage_article_types)
    return
  }

  // CAN BE IMPROVED
  let url = HOST + ARTICLE_TYPE_LIST + '?classif=' + classif

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

      let article_types = []
      for (let i = 0; i < response.length; i++) {
        let obj = response[i]

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

export function getArticles(responseHandler) {
  if (sessionStorage.getItem('articles')) {
    let storageArticles = JSON.parse(sessionStorage.getItem('articles'))
    if (storageArticles[0].hasOwnProperty('label')) {
      let articles = []
      for (let i = 0; i < storageArticles.length; i++) {
        let obj = storageArticles[i]
        articles.push({
          id: obj.id,
          label: obj.label,
          branch: obj.branch,
          name: obj.name,
          classif: obj.classif,
        })
      }

      sessionStorage.setItem('articles', JSON.stringify(articles))
      responseHandler('success', articles)
      return
    }

    responseHandler('success', storageArticles)
    return
  }

  let url = HOST + LIST_ARTICLES

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

      let articles = []
      for (let i = 0; i < response.length; i++) {
        let obj = response[i]

        articles.push({
          id: obj.id,
          label: obj.label,
          branch: obj.branch,
          name: obj.Tipo.article_type_name,
          classif: obj.Tipo.classif,
        })
      }

      let json = JSON.stringify(articles)
      sessionStorage.setItem('articles', json)
      responseHandler('success', articles)
    })
    .catch((error) => responseHandler('error', error))
}
