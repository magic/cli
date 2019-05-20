const { spawn } = require('child_process')

const spawnCli = (args = [], cmd = 'node') => {
  const [_, _1, ...execArgv] = process.argv

  if (!Array.isArray(args)) {
    args = [args]
  }

  let arg = [...args, ...execArgv]

  if (cmd === 'node') {
    if (!arg.includes('--experimental-json-modules')) {
      arg = ['--experimental-json-modules', ...arg]
    }

    if (!arg.includes('--experimental-modules')) {
      arg = ['--experimental-modules', ...arg]
    }
  }

  const opts = {
    stdio: 'inherit',
  }

  if (!arg) {
    arg = []
  }


  const isWin = process.platform === 'win32'
  if (isWin) {
    opts.shell = true
  }

  const sp = spawn(cmd, arg, opts)

  sp.on('error', error => {
    console.log(error)
    process.exit(1)
  })

  sp.on('close', code => {
    process.exit(code)
  })
}

module.exports = spawnCli
