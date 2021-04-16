const { REACT_APP_HOST } = process.env

// SELECT OPTIONS
export const BRANCHES = [
  { name: 'Cachorros', value: 'Cachorros' },
  { name: 'Lobatos', value: 'Lobatos' },
  { name: 'Webelos', value: 'Webelos' },
  { name: 'Scouts', value: 'Scouts' },
  { name: 'Rovers', value: 'Rovers' },
  { name: 'Tropa', value: 'Tropa' },
  { name: 'Intendencia', value: 'Intendencia' },
  { name: 'Auxiliar', value: 'Auxiliar' },
]

export const CLASSIFICATIONS = [
  { name: 'Elementos de cocina', value: 'Elementos de cocina' },
  { name: 'Elementos de limpieza', value: 'Elementos de limpieza' },
  { name: 'Elementos para acampar', value: 'Elementos para acampar' },
]

export const AVAILABILITIES = [
  { name: 'Disponible', value: 'Disponible' },
  { name: 'Prestado', value: 'Prestado' },
  { name: 'Dado de baja', value: 'Dado de baja' },
]

export const STATES = [
  { name: 'Funcional', value: 'Funcional' },
  { name: 'Incompleto', value: 'Incompleto' },
  { name: 'No funcional', value: 'No funcional' },
]

// SERVICES
export const HOST = REACT_APP_HOST
  ? REACT_APP_HOST
  : 'http://localhost:3001/api/'
export const LOGIN = 'user/login'
export const CREATE_USER = 'user/create'
export const CREATE_WAREHOUSE = 'warehouse/create'
export const LIST_WAREHOUSES = 'warehouse/list'
export const CREATE_ARTICLE_TYPE = 'article_type/create'
export const ARTICLE_TYPE_LIST = 'article_type/list'
export const CREATE_ARTICLE = 'article/create'
export const LIST_ARTICLES = 'article/list'
export const CREATE_BORROWING = 'borrowing/create'
export const LIST_BORROWINGS = 'borrowing/list'
export const BORROWING_BY_ID = 'borrowing/id'
export const BORROWING_APPROVED = 'borrowing/approved'
export const BORROWING_REJECTED = 'borrowing/rejected'
export const CREATE_RETURNING = 'returning/create'

// ALERTS
export const MANDATORY_MESSAGE =
  'Verifique que ha llenado todos los campos obligatorios.'
export const ERROR_MESSAGE =
  'Ha ocurrido un error. Por favor intente más tarde.'
export const EMAIL_MESSAGE =
  'El formato del correo electrónico no es válido. Por favor verifique.'
export const NON_ITEM_MESSAGE =
  'No hay ningun artículo para esta selección.'
export const ALERT_TIMEOUT = 6000

// OTHERS
export const DAY_IN_MS = 1000 * 60 * 60 * 24
export const DATE_OPTIONS = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}
