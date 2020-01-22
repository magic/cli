import readline from 'readline'

export const prompt = (std, { firstLine = true, yesNo = false }) =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: stdin,
      output: stdout,
    })

    rl.on('line', line => {
      if (yesNo) {
        line = line.trim().toLowerCase() === 'y' || line.trim().toLowerCase() === 'yes'
      }

      resolve(line)

      // only get first line
      if (firstLine) {
        rl.close()
      }
    })

    rl.on('error', reject)
  })
