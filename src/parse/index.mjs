import { parseEnv } from './env.mjs'
import { parseArgv } from './argv.mjs'
import { parseCommands } from './commands.mjs'

export const parse = ({ pure = false, ...props }) => {
  const { pureEnv = pure, pureArgv = pure, pureCommands = pure } = props

  const env = parseEnv({ ...props, pure: pureEnv })
  const { argv, args } = parseArgv({ ...props, pure: pureArgv })
  const cmds = parseCommands({ ...args, pure: pureCommands })

  return {
    env,
    environment: env,
    argv,
    options: argv,
    args,
    cmds,
    commands: cmds,
  }
}
