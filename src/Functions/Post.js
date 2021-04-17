import { HOST } from './Constants'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// SIMPLE POST REQUEST
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

// SIMPLE PUT REQUEST
export function putRequest(path, data, responseHandler) {
  let url = HOST + path

  fetch(url, {
    method: 'PUT',
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