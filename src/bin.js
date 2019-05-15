const { spawn } = require('child_process')

const spawnCli = (cmd = 'node', args = []) => {
  const [_, _1, ...execArgv] = process.argv

  const arg = [...args, ...execArgv]

  spawn(cmd, arg, { stdio: 'inherit', env: process.env })
}

module.exports = spawnCli
