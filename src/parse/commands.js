import log from '@magic/log'
import is from '@magic/types'

export const parseCommands = (props = {}) => {
  const { commands = [], pure = false } = props
  const { argv } = process
  const runAll = argv.includes('all')

  const cmds = Object.fromEntries(
    commands
      .map((tasks = []) => {
        let key
        let idx = -1

        if (is.string(tasks)) {
          if (argv.includes(tasks)) {
            idx = argv.indexOf(tasks)
            key = tasks
          } else if (runAll) {
            key = tasks
          }
        } else if (is.array(tasks)) {
          if (runAll) {
            key = tasks[0]
          } else {
            const idxArray = tasks
              .filter(task => argv.includes(task))
              .map(task => argv.indexOf(task))

            idx = idxArray[0]
            key = tasks[0]
          }
        } else {
          log.error(
            'E_UNEXPECTED_TASK',
            `@magic/cli: got unexpected task type: ${typeof tasks}, can handle strings or arrays`,
          )
        }

        if (idx > -1) {
          if (!pure) {
            argv[idx] = key
          }

          return [key, true]
        } else if (runAll) {
          return [key, true]
        }
      })
      .filter(a => a),
  )

  return cmds
}
