const { spawn } = require('child_process')

const spawnCli = (args = [], cmd = 'node') => {
  const [_, _1, ...execArgv] = process.argv

  const arg = [...args, ...execArgv]

  if (cmd === 'node') {
    if (!arg.includes('--experimental-json-modules')) {
      arg = ['--experimental-json-modules', ...arg]
    }

    if (!arg.includes('--experimental-modules')) {
      arg = ['--experimental-modules', ...arg]
    }
  }
  spawn(cmd, arg, { stdio: 'inherit', env: process.env })
}

module.exports = spawnCli
