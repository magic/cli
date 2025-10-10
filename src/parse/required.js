import is from '@magic/types'

export const parseRequired = (args = {}) => {
  const {
    parsed,
    props: { required },
  } = args

  if (is.empty(required)) {
    return []
  }

  const errors = []

  required.forEach(req => {
    if (is.array(req)) {
      const some = req.some(a => parsed.argv[a])

      if (!some) {
        errors.push(req)
      }
    } else {
      const opt = parsed.argv[req]

      if (is.empty(opt)) {
        errors.push(req)
      }
    }
  })

  return errors
}
