const { exec } = require('child_process')

const maybeHelp = require('./help')
const parse = require('./parse')

const cli = (args = {}) => {
  const parsed = parse(args)
  maybeHelp({ args, parsed })

  return parsed
}

cli.exec = (cmd, args = []) => {
  args = args.join(' ')

  const res = exec(`${cmd} ${args}`)

  res.stdout.pipe(process.stdout)
  res.stderr.pipe(process.stderr)

  return res
}

cli.spawn = cli.exec

module.exports = cli
