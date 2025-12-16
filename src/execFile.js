import child_process from 'child_process'

import error from '@magic/error'

const libName = '@magic/cli.execFile'

/**
 * Executes a file using child_process.execFile
 * @param {string} p - Path to the executable file.
 * @param {string[]} [args=[]] - Arguments to pass to the executable.
 * @param {child_process.ExecFileOptions} [opts={}] - Execution options.
 * @returns {Promise<string | Buffer>} Resolves with stdout, rejects with Error.
 */
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
          const e = error(new Error(`${libName}: error: ${stderr}`), 'E_EXECFILE_STDERR')
          reject(e)
          return
        }

        resolve(stdout)
      },
    )
  })
