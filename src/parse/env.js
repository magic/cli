import is from '@magic/types'
/**
 * @typedef {[string|string[], string, string]} EnvTuple
 *   Tuple of: [CLI switches], environment variable name, value].
 *
 * @typedef {object} ParseEnvProps
 * @property {EnvTuple[]} env - Environment variables to parse.
 * @property {boolean} [pure=false] - If true, do not modify process.env.
 */

/**
 * Parses environment switches from process.argv.
 *
 * @param {ParseEnvProps} props
 * @returns {Record<string, string>} - Environment variables set.
 */
export const parseEnv = ({ env = [], pure = false }) => {
  /** @type {Record<string, string>} */
  const environment = {}

  // set env depending on env switches
  env
    .filter(([argv]) => {
      if (!is.array(argv)) {
        argv = [argv]
      }
      return argv.some(a => process.argv.includes(a))
    })
    .map(([_, key, val]) => {
      environment[key] = val
      if (!pure) {
        process.env[key] = val
      }
    })

  return environment
}
