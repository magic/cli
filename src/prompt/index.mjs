import fs from 'fs'
import readline from 'readline'

import log from '@magic/log'

export const prompt = (msg = '', options = {}) =>
  new Promise((resolve, reject) => {
    const { yesNo = false, pass = false, std = process } = options

    const rl = readline.createInterface({
      input: std.stdin,
      output: std.stdout,
      prompt: msg,
    })

    rl.prompt()

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
