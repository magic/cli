import { parseEnv } from './env.mjs'
import { parseArgv } from './argv.mjs'
import { parseCommands } from './commands.mjs'
import { parseRequired } from './required.mjs'
import { clean } from './clean.mjs'

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
