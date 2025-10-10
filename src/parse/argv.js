import is from '@magic/types'
import cases from '@magic/cases'

/**
 * @typedef {string | string[]} Option
 */

/**
 * @typedef {Record<string, string | string[]>} ArgMap
 */

/**
 * @typedef {object} ParseArgvProps
 * @property {Option[]} [options] - CLI option names or aliases.
 * @property {ArgMap | string[]} [prepend] - Arguments to prepend to process.argv.
 * @property {ArgMap | string[]} [append] - Arguments to append to process.argv.
 * @property {ArgMap} [default] - Default values for options.
 * @property {boolean} [pure=false] - If true, do not modify process.argv.
 */

/**
 * @typedef {object} ParseArgvResult
 * @property {Record<string, string[]>} argv - Raw argument key/value map.
 * @property {Record<string, string[]>} args - Camel-cased argument key/value map.
 */

/**
 * Parses process.argv according to provided options, defaults, prepend/append arguments.
 *
 * @param {ParseArgvProps} props
 * @returns {ParseArgvResult}
 */
export const parseArgv = (props = {}) => {
  const { options = [], prepend = {}, append = {}, default: def = {}, pure = false } = props || {}

  /** @type {string|undefined} */
  let lastArg

  /** @type {Record<string, string[]>} */
  const argv = {}

  const argvCopy = process.argv.slice()

  // Handle prepend args first
  if (prepend) {
    if (is.array(prepend)) {
      argvCopy.splice(2, 0, ...prepend.map(String))
    } else {
      Object.entries(prepend).forEach(([k, v]) => {
        argv[k] = is.array(v) ? v.map(String) : [String(v)]
        argvCopy.splice(2, 0, k, ...(is.array(v) ? v.map(String) : [String(v)]))
      })
    }
  }

  // Append arguments will be added after existing args
  if (append) {
    if (is.array(append)) {
      argvCopy.push(...append.map(String))
    } else {
      Object.entries(append).forEach(([k, v]) => {
        argv[k] = is.array(v) ? v.map(String) : [String(v)]
        argvCopy.push(k, ...(is.array(v) ? v.map(String) : [String(v)]))
      })
    }
  }

  // Parsing loop
  argvCopy.forEach((arg, i) => {
    if (i <= 1) return

    if (arg.startsWith('-')) {
      /** @type {string} */
      let argvArg = ''
      options.forEach(option => {
        if (is.array(option)) {
          if (option.some(opt => opt === arg)) {
            argvArg = option[0]
          }
        } else if (option === arg) {
          argvArg = option
        }
      })

      if (argvArg) {
        lastArg = argvArg
        argv[lastArg] = argv[lastArg] || []
        if (!pure) argvCopy[i] = lastArg
      }
    } else {
      if (lastArg) argv[lastArg].push(arg)
    }
  })

  const [argv1, argv2, ...argvRest] = argvCopy

  const entries = Object.entries(def)

  if (entries.length) {
    entries.forEach(([k, v]) => {
      if (!argv[k] || argv[k].length === 0) {
        argv[k] = is.array(v) ? v.map(String) : [String(v)]
        argvRest.push(k)
        if (!is.array(v)) v = [v]
        v.forEach(vv => argvRest.push(String(vv)))
      }
    })
  }

  if (!pure) {
    process.argv = [argv1, argv2, ...argvRest]
  }

  /** @type {Record<string, string[]>} */
  const args = {}

  Object.entries(argv).forEach(([k, v]) => {
    args[cases.camel(k)] = v
  })

  return {
    argv,
    args,
  }
}
