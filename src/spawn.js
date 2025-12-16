import child_process from 'child_process'

/** @typedef {import('child_process').SpawnOptions} CLISpawnOptions*/

/**
 * Spawns a new process.
 * @param {string} cmd - Command to run.
 * @param {string[]} [args=[]] - Arguments for the command.
 * @param {CLISpawnOptions} [options={}] - Spawn options.
 * @returns {import('child_process').ChildProcess} The spawned process.
 */
export const spawn = (cmd, args = [], options = {}) => {
  /** @type {CLISpawnOptions} */
  const opts = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    ...options,
  }

  return child_process.spawn(cmd, args, opts)
}
