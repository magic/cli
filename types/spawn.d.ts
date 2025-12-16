export function spawn(
  cmd: string,
  args?: string[],
  options?: CLISpawnOptions,
): import('child_process').ChildProcess
export type CLISpawnOptions = import('child_process').SpawnOptions
