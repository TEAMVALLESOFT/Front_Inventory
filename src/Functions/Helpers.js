import { DATE_OPTIONS } from './Constants'

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function setSelectOptions(options) {
  if (options.length < 1) {
    return
  }

  let select_options = []

  for (let i = 0; i < options.length; i++) {
    let op = options[i]

    select_options.push(
      <option
        key={op.name}
        className='global-form-input-select-option'
        value={op.value}
      >
        {op.name}
      </option>
    )
  }

  return select_options
}

export function setSelectArticleOptions(options) {
  if (options.length < 1) {
    return
  }

  let select_options = []

  for (let i = 0; i < options.length; i++) {
    let op = options[i]

    select_options.push(
      <option
        key={op.name}
        className='global-form-input-select-option'
        value={op.id}
      >
        {op.name} - {op.label}
      </option>
    )
  }

  return select_options
}

export function formatDateToLocal(date_string) {
  let date = new Date(date_string)

  return (
    date.toLocaleDateString('es-CO', DATE_OPTIONS) +
    ' ' +
    date.toLocaleTimeString()
  )
}

// Returns true if the first date is greater than the second
export function compareDates(date_1, date_2) {
  let first = new Date(date_1)
  let second = new Date(date_2)

  return first > second
}
