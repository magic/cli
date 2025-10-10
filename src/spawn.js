import child_process from 'child_process'

/**
 * Spawns a new process.
 * @param {string} cmd - Command to run.
 * @param {string[]} [args=[]] - Arguments for the command.
 * @param {import('child_process').SpawnOptions} [opt={}] - Spawn options.
 * @returns {import('child_process').ChildProcess} The spawned process.
 */
export const spawn = (cmd, args = [], opt = {}) => {
  /** @type {import('child_process').SpawnOptions} */
  const opts = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    ...opt,
  }

  return child_process.spawn(cmd, args, opts)
}
