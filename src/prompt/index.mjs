import fs from 'fs'
import readline from 'readline'

import log from '@magic/log'

import PasswordStream from './PasswordStream.mjs'

export const prompt = ({ msg = '', yesNo = false, pass = false, std = process }) =>
  new Promise((resolve, reject) => {

    const pwStream = new PasswordStream(std.stdout)

    const rl = readline.createInterface({
      input: data => {
        // data = '*'
        console.log({data});
        std.stdin.write(data)
      },
      output: pwStream,
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
