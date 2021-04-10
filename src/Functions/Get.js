import { HOST, LIST_WAREHOUSES, LIST_ARTICLES } from './Constants'

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

export function getArticles(responseHandler) {
  if (sessionStorage.getItem('articles')) {
    let storageArticles = JSON.parse(sessionStorage.getItem('articles'))
    if (storageArticles[0].hasOwnProperty('label')) {
      let articles = []
      for (let i = 0; i < storageArticles.length; i++) {
        let obj = storageArticles[i]
        articles.push({ id: obj.id, label: obj.label, branch: obj.branch,
          name: obj.name, classif: obj.classif })
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

        articles.push({ id: obj.id, label: obj.label, branch: obj.branch,
          name: obj.Tipo.article_type_name, classif: obj.Tipo.classif })
      }

      let json = JSON.stringify(articles)
      sessionStorage.setItem('articles', json)
      responseHandler('success', articles)
    })
    .catch((error) => responseHandler('error', error))
}