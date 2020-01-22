import readline from 'readline'

import log from '@magic/log'

export const prompt = (std, { msg = '', yesNo = false }) =>
  new Promise((resolve, reject) => {
    if (msg) {
      log(msg)
    }
    const rl = readline.createInterface({
      input: stdin,
      output: stdout,
    })

    rl.on('line', line => {
      if (yesNo) {
        line = line.trim().toLowerCase() === 'y' || line.trim().toLowerCase() === 'yes'
      }

      resolve(line)

      // only get first line, it's a prompt
      rl.close()
    })

    rl.on('error', reject)
  })
