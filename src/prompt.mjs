import is from '@magic/types'
import readline from 'readline'

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
        line = trimmed === 'y' || trimmed === 'yes' || yesDefault
      }

      resolve(line)

      // only get first line, it's a prompt
      rl.close()
    })

    rl.on('error', reject)
  })
