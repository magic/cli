import is from '@magic/types'

export const parseRequired = ({ props, parsed }) => {
  const { options, required } = props

  if (is.empty(required)) {
    return []
  }

  const errors = []

  required.forEach(req => {
    const opt = parsed.argv[req]
    if (is.empty(opt)) {
      errors.push(req)
    }
  })

  return errors
}
