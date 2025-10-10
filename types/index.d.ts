export function cli(args?: { options?: (string | string[])[] | undefined }): object
export namespace cli {
  export { spawner as spawn }
  export { execute as exec }
  export { promptUser as prompt }
  export { executeFile as execFile }
}
export const spawn: (
  cmd: string,
  args?: string[],
  opt?: import('child_process').SpawnOptions,
) => import('child_process').ChildProcess
export const exec: (
  cmd: string,
  options?: {
    stderrToStdout?: boolean | undefined
  },
) => Promise<string>
export const prompt: (
  msg?: string | string[],
  options?: {
    yesNo?: boolean | undefined
    yesDefault?: boolean | undefined
    std?: NodeJS.Process | undefined
  },
) => Promise<string | boolean>
export const execFile: (
  p: string,
  args?: string[],
  opts?: import('child_process').ExecFileOptions,
) => Promise<string | Buffer>
export default cli
import { spawn as spawner } from './spawn.js'
import { exec as execute } from './exec.js'
import { prompt as promptUser } from './prompt.js'
import { execFile as executeFile } from './execFile.js'
