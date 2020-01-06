import is from '@magic/types'
import cases from '@magic/cases'

export const parseArgv = ({
  options = [],
  prepend = {},
  append = {},
  default: def = {},
  pure = false,
}) => {
  let lastArg
  const argv = {}
  // map over argv, find arguments and values.
  // arguments are all strings starting with a -,
  // values are all strings between strings starting with a -.
  process.argv.forEach((arg, i) => {
    if (i <= 1) {
      return arg
    }

    if (arg.startsWith('-')) {
      let argvArg
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
        argv[lastArg] = []
        if (!pure) {
          process.argv[i] = lastArg
        }
      }
    } else {
      if (lastArg) {
        argv[lastArg].push(arg)
      }
    }
  })

  const [argv1, argv2, ...argvRest] = process.argv

  const entries = Object.entries(def)

  if (entries.length) {
    entries.forEach(([k, v]) => {
      if (is.empty(argv[k])) {
        argv[k] = v

        argvRest.push(k)
        if (!is.array(v)) {
          v = [v]
        }
        v.forEach(vv => argvRest.push(vv))
      }
    })
  }

  let argvPrepend = []
  if (!Array.isArray(prepend)) {
    argvPrepend.push(prepend)
  } else if (prepend.length) {
    Object.entries(prepend).forEach(([k, v]) => {
      argv[k] = v

      argvPrepend.push(k)
      if (!Array.isArray(v)) {
        argvPrepend.push(v)
      } else {
        argvPrepend = [...argvPrepend, ...v]
      }
    })
  }

  let argvAppend = []
  if (!Array.isArray(append)) {
    argvAppend.push(append)
  } else if (append.length) {
    Object.entries(append)
      .forEach(([k, v]) => {
        argv[k] = v

        argvAppend.push(k)
        if (!is.array(v)) {
          argvAppend.push(v)
        } else {
          argvAppend = [...argvAppend, ...v]
        }
      })
      .filter(a => a)
  }

  if (!pure) {
    const argvArgs = [argv1, argv2, ...argvAppend, ...argvRest, ...argvPrepend].filter(
      a => a.length > 0,
    )

    process.argv = argvArgs
  }

  const args = {}

  Object.entries(argv).map(([k, v]) => {
    args[cases.camel(k)] = v
  })

  return {
    argv,
    args,
  }
}
