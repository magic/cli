import is from '@magic/types'

/**
 * @typedef {object} ParsedCLI
 * @property {Record<string, string>} env
 * @property {Record<string, any>} argv
 * @property {Record<string, any>} args
 * @property {Record<string, boolean>} commands
 * @property {Array<string|string[]>} errors
 */

/**
 * @typedef {object} ParseRequiredArgs
 * @property {ParsedCLI} [parsed]
 * @property {object} [props]
 * @property {Array<string|string[]> | string} [props.required]
 */

/**
 * Validates that required CLI arguments exist.
 *
 * @param {ParseRequiredArgs} args
 * @returns {Array<string|string[]>} - List of missing required arguments.
 */
export const parseRequired = (args = {}) => {
  const { parsed, props } = args

  if (is.empty(props?.required)) {
    return []
  }

  /** @type {string[]} */
  const errors = []

  if (is.string(props?.required)) {
    props.required = [props.required]
  }

  props?.required?.forEach(req => {
    if (is.array(req)) {
      const some = req.some(a => parsed?.argv[a])

      if (!some) {
        errors.push(...req)
      }
    } else {
      const opt = parsed?.argv[req]

      if (is.empty(opt)) {
        errors.push(req)
      }
    }
  })

  return errors
}
