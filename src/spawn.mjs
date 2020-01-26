import child_process from 'child_process'

export const spawn = (cmd, args = []) => {
  const opts = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  }

  return child_process.spawn(cmd, args, opts)
}
