import child_process from 'child_process'

const libName = '@magic/cli.exec'

export const exec = (cmd, options = {}) =>
  new Promise((resolve, reject) => {
    child_process.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        const e = new Error(`${libName}: ${cmd} error: ${err.message}`)
        e.name = 'E_EXEC_ERR'
        reject(e)
        return
      }

      if (stderr) {
        const e = new Error(`${libName}: ${cmd} error: ${stderr}`)
        e.name = 'E_EXEC_STDERR'
        reject(e)
        return
      }

      resolve(stdout.trim())
    })
  })
