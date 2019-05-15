const { exec, spawn } = require('child_process')

const spawnCli = file => {
  const [_, _1, ...execArgv] = process.argv

  const argv = ['--experimental-modules', '--experimental-json-modules', file, ...execArgv]

  const cmd = 'node'
  spawn(cmd, argv, { stdio: 'inherit', env: process.env })
}

module.exports = spawnCli