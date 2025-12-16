import child_process from 'child_process'

import error from '@magic/error'

const libName = '@magic/cli.execFile'

/** @typedef {child_process.ExecFileOptions & { stderrToStdout?: boolean }} CLIExecFileOptions  */

/**
 * Executes a file using child_process.execFile
 * @param {string} p - Path to the executable file.
 * @param {string[]} [args=[]] - Arguments to pass to the executable.
 * @param {CLIExecFileOptions} [options={}] - Execution options.
 * @returns {Promise<string | Buffer>} Resolves with stdout, rejects with Error.
 */
export const execFile = (p, args = [], options = {}) =>
  new Promise((resolve, reject) => {
    const { stderrToStdout = false, ...opts } = options
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
          if (stderrToStdout) {
            resolve(stderr)
            return
          } else {
            const e = error(new Error(`${libName}: error: ${stderr}`), 'E_EXECFILE_STDERR')
            reject(e)
            return
          }
        }

        resolve(stdout)
      },
    )
  })
