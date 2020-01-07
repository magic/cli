import is from '@magic/types'

export const parseRequired = ({ required, options }) => {

  if (is.empty(required)) {
    return []
  }

  const errors = []

  Object.keys(required).forEach(req => {
    const opt = options[req]
    if (is.empty(opt)) {
      errors.push(req)
    }
  })

  return errors
}
