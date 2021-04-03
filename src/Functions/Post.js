const HOST = 'http://localhost:3000/api/'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// SERVICES
export const LOGIN = 'user/login'
export const CREATE_USER = 'user/create'
export const CREATE_WAREHOUSE = 'warehouse/create'
export const CREATE_ARTICLE_TYPE = 'article_type/create'

// SIMPLE POST REQUES
export function postRequest(path, data, responseHandler) {
  let url = HOST + path

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => responseHandler('success', response))
    .catch((error) => responseHandler('error', error))
}
