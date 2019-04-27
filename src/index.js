const { exec } = require('child_process')
const log = require('@magic/log')
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
    if (i <= 2) {
      return arg
    }
    if (arg.startsWith('-') && !options.some(opt => opt.some(o => o === arg))) {
      log.warn('Unknown cli flag:', arg)
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
  if (!is.empty(prepend)) {
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
  if (!is.empty(append)) {
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

const parseCmds = ({ commands = [], pure = false }) => {
  const cmds = {}
  commands.map((tasks = []) => {
    let key
    let idx = -1
    if (is.string(tasks) && process.argv.includes(tasks)) {
      idx = process.argv.indexOf(tasks)
      key = tasks
      // cmds[tasks] = true
    } else {
      const idxArray = tasks
        .filter( task => process.argv.includes(task))
        .map(task => process.argv.indexOf(task))
      idx = idxArray[0]
      key = tasks[0]
    }

    cmds[key] = true
    if (!pure) {
      process.argv[idx] = key
    }
  })

  return cmds
}

const parseEnv = ({ env = [], pure = false }) => {
  const environment = []

  // set env depending on env switches
  env
    .filter(([argv]) => {
      if(!is.array(argv)) {
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

const parse = args => {
  const env = parseEnv({ ...args, pure: args.pure || args.pureEnv })
  const argv = parseArgv({ ...args, pure: args.pure || args.pureArgv })
  const cmds = parseCmds({ ...args, pure: args.pure || args.pureCommands })
  return {
    env,
    environment: env,
    argv,
    options: argv,
    cmds,
    commands: cmds,
  }
}

const maybeHelp = ({ args, parsed }) => {
  const { help = 'this cli has no help text specified. if it would, we would show it now.' } = args

  const hasArgs = Object.values(parsed).some(a => !is.empty(a))
  const flags = ['help', 'h', '-h', '--h', '--help']
  const showHelp = !hasArgs || flags.some(a => process.argv.includes(a))

  if (showHelp) {
    log(help)
    process.exit()
  }
}

const cli = (args = {}) => {
  const { help = 'this cli has no help text specified. if it would, we would show it now.' } = args

  const parsed = parse(args)
  maybeHelp({ args, parsed })

  return parsed
}

cli.exec = (cmd, args = []) => {
  args = args.join(' ')

  const res = exec(`${cmd} ${args}`)

  res.stdout.pipe(process.stdout)
  res.stderr.pipe(process.stderr)

  return res
}

cli.spawn = cli.exec

module.exports = cli
