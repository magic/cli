const parseEnv = require('./env')
const parseArgv = require('./argv')
const parseCommands = require('./commands')

const parse = args => {
  const { pure = false } = args
  const { pureEnv = pure, pureArgv = pure, pureCommands = pure } = args

  const env = parseEnv({ ...args, pure: pureEnv })
  const argv = parseArgv({ ...args, pure: pureArgv })
  const cmds = parseCommands({ ...args, pure: pureCommands })

  return {
    env,
    environment: env,
    argv,
    options: argv,
    cmds,
    commands: cmds,
  }
}

module.exports = parse
