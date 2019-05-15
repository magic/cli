import { parseEnv } from './env.mjs'
import { parseArgv } from './argv.mjs'
import { parseCommands } from './commands.mjs'

export const parse = args => {
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
