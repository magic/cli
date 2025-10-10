import { parseEnv } from './env.js'
import { parseArgv } from './argv.js'
import { parseCommands } from './commands.js'
import { parseRequired } from './required.js'
import { clean } from './clean.js'

export const parse = props => {
  const { pure = false } = props

  const { pureEnv = pure, pureArgv = pure, pureCommands = pure } = props

  const env = parseEnv({ ...props, pure: pureEnv })
  const { argv, args } = parseArgv({ ...props, pure: pureArgv })
  const commands = parseCommands({ ...props, pure: pureCommands })

  const cli = {
    env,
    argv,
    args,
    commands,
    errors: [],
  }

  const parsed = clean(cli, props)

  parsed.errors = parseRequired({ props, parsed })

  return parsed
}
