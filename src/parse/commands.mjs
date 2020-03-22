export const parseCommands = ({ commands = [], pure = false }) => {
  const { argv } = process
  const runAll = argv.includes('all')

  const cmds = {}
  commands.map((tasks = []) => {
    let key
    let idx = -1
    if (typeof tasks === 'string') {
      if (argv.includes(tasks)) {
        idx = argv.indexOf(tasks)
        key = tasks
      } else if (runAll) {
        key = tasks
      }
    } else {
      if (!Array.isArray(tasks)) {
        tasks = [tasks]
      }

      if (runAll) {
        key = tasks[0]
      } else {
        const idxArray = tasks.filter(task => argv.includes(task)).map(task => argv.indexOf(task))

        idx = idxArray[0]
        key = tasks[0]
      }
    }

    if (idx > -1) {
      cmds[key] = true

      if (!pure) {
        argv[idx] = key
      }
    } else if (runAll) {
      cmds[key] = true
    }
  })

  return cmds
}
