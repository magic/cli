import child_process from 'child_process'

export const spawn = (cmd, args = [], opt = {}) => {
  const opts = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    ...opt,
  }

  return child_process.spawn(cmd, args, opts)
}
