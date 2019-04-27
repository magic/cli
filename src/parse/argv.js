const is = require('@magic/types')

const parseArgv = ({
  options = [],
  prepend = {},
  append = {},
  default: def = {},
  pure = false,
}) => {
  let lastArg
  const args = {}
  // map over argv, find arguments and values.
  // arguments are all strings starting with a -,
  // values are all strings between strings starting with a -.
  process.argv.forEach((arg, i) => {
    if (i <= 1) {
      return arg
    }

    if (arg.startsWith('-')) {
      let argsArg
      options.forEach(option => {
        if (is.array(option)) {
          if (option.some(opt => opt === arg)) {
            argsArg = option[0]
          }
        } else if (option === arg) {
          argsArg = option
        }
      })
      if (argsArg) {
        lastArg = argsArg
        args[lastArg] = []
        if (!pure) {
          process.argv[i] = lastArg
        }
      }
    } else {
      if (lastArg) {
        args[lastArg].push(arg)
      }
    }
  })

  const [argv1, argv2, ...argv] = process.argv

  if (!is.empty(def)) {
    Object.entries(def).forEach(([k, v]) => {
      if (is.empty(k)) {
        args[k] = v

        argv.push(k)
        if (!is.array(v)) {
          v = [v]
        }
        v.forEach(vv => argv.push(vv))
      }
    })
  }

  let argvPrepend = []
  if (!is.array(prepend)) {
    argvPrepend.push(prepend)
  } else if (!is.empty(prepend)) {
    Object.entries(prepend).forEach(([k, v]) => {
      args[k] = v

      argvPrepend.push(k)
      if (!is.array(v)) {
        argvPrepend.push(v)
      } else {
        argvPrepend = [...argvPrepend, ...v]
      }
    })
  }

  let argvAppend = []
  if (!is.array(append)) {
    argvAppend.push(append)
  } else if (!is.empty(append)) {
    Object.entries(append).forEach(([k, v]) => {
      args[k] = v

      argvAppend.push(k)
      if (!is.array(v)) {
        argvAppend.push(v)
      } else {
        argvAppend = [...argvAppend, ...v]
      }
    })
  }

  if (!pure) {
    process.argv = [argv1, argv2, ...argvAppend, ...argv, ...argvPrepend]
  }

  return args
}

module.exports = parseArgv
