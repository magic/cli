import child_process from 'child_process'

import error from '@magic/error'

const libName = '@magic/cli.exec'

/**
 * Executes a shell command using child_process.exec
 * @param {string} cmd - The shell command to execute.
 * @param {child_process.ExecOptionsWithStringEncoding & { stderrToStdout: boolean }} [options = {}] - Execution options.
 * @returns {Promise<string>} Resolves with stdout or stderr (if stderrToStdout = true), rejects with Error.
 */
export const exec = (cmd, options) =>
  new Promise((resolve, reject) => {
    const { stderrToStdout = false, ...opts } = options || {}

    child_process.exec(cmd, opts, (err, stdout, stderr) => {
      if (err) {
        const e = error(err, 'E_EXEC_ERR')
        reject(e)
        return
      }

      if (stderr) {
        if (stderrToStdout) {
          resolve(stderr)
          return
        }

        const e = error(new Error(`${libName}: ${cmd} error: ${stderr}`), 'E_EXEC_STDERR')
        reject(e)
        return
      }

      resolve(stdout)
    })
  })
