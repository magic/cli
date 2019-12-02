const { spawn } = require('child_process')

const spawnCli = (args = [], cmd = 'node') => {
  const [_, _1, ...execArgv] = process.argv

  if (!Array.isArray(args)) {
    args = [args]
  }

  let arg = [...args, ...execArgv]

  if (cmd === 'node') {
    // node 12.4.0+ does not use that flag anymore
    const [major, minor, patch] = process.version
      .substring(1)
      .split('.')
      .map(n => parseInt(n))

    if (!arg.includes('--experimental-json-modules')) {
      arg = ['--experimental-json-modules', ...arg]
    }

    if (!arg.includes('--experimental-modules')) {
      arg = ['--experimental-modules', ...arg]
    }
    if (!arg.includes('--es-module-specifier-resolution')) {
      arg = ['--es-module-specifier-resolution', 'node', ...arg]
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
