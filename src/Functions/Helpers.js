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
