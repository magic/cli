import child_process from 'child_process'

import error from '@magic/error'

const libName = '@magic/cli.exec'

export const exec = (cmd, options = {}) =>
  new Promise((resolve, reject) => {
    child_process.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        const e = error(err, 'E_EXEC_ERR')
        reject(e)
        return
      }

      if (stderr) {
        const e = error(new Error(`${libName}: ${cmd} error: ${stderr}`), 'E_EXEC_STDERR')
        reject(e)
        return
      }

      resolve(stdout.trim())
    })
  })
