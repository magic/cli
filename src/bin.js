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

  spawn(cmd, arg, opts)
}

module.exports = spawnCli
