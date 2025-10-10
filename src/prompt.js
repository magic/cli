import is from '@magic/types'
import readline from 'readline'
/**
 * Prompts the user for input or confirmation.
 * @param {string|string[]} [msg=''] - Message to display in the prompt.
 * @param {object} [options={}] - Prompt options.
 * @param {boolean} [options.yesNo=false] - Whether to treat the input as a yes/no confirmation.
 * @param {boolean} [options.yesDefault=false] - If true, defaults to "yes" on empty input.
 * @param {NodeJS.Process} [options.std=process] - Standard input/output streams.
 * @returns {Promise<string|boolean>} Resolves with the user input (string) or boolean for yes/no prompts.
 */
export const prompt = (msg = '', options = {}) =>
  new Promise((resolve, reject) => {
    const { yesNo = false, std = process, yesDefault = false } = options

    if (is.array(msg)) {
      msg = msg.join(' ')
    }

    if (yesNo) {
      let flag = 'y/N'

      if (yesDefault) {
        flag = 'Y/n'
      }

      if (!msg.endsWith(' ')) {
        msg += ' '
      }

      if (!msg.includes(flag)) {
        msg += `(${flag}): `
      }
    }

    const rl = readline.createInterface({
      input: std.stdin,
      output: std.stdout,
      prompt: msg,
    })

    rl.prompt()

    rl.on('line', line => {
      if (yesNo) {
        const trimmed = line.trim().toLowerCase()
        resolve(trimmed === 'y' || trimmed === 'yes' || yesDefault)
        return
      }

      resolve(line)

      // only get first line, it's a prompt
      rl.close()
    })

    rl.on('error', reject)
  })
