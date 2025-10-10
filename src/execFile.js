import child_process from 'child_process'

import error from '@magic/error'

const libName = '@magic/cli.execFile'

export const execFile = (p, args = [], opts = {}) =>
  new Promise((resolve, reject) => {
    child_process.execFile(
      p,
      args.filter(a => a),
      opts,
      (err, stdout, stderr) => {
        if (err) {
          const e = error(err, 'E_EXECFILE_ERR')
          reject(err)
          return
        }
        if (stderr) {
          const e = error(new Error(`${libName}: ${cmd} error: ${stderr}`), 'E_EXECFILE_STDERR')
          reject(e)
          return
        }

        resolve(stdout)
      },
    )
  })
