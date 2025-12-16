export function cli(args?: ParseProps): ParsedCLI
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
export type ParseProps = {
  options?: (string | string[])[] | undefined
  prepend?: any[] | Record<string, any> | undefined
  append?: any[] | Record<string, any> | undefined
  default?: Record<string, any> | undefined
  pure?: boolean | undefined
  pureEnv?: boolean | undefined
  pureArgv?: boolean | undefined
  pureCommands?: boolean | undefined
  single?: string[] | undefined
  commands?: (string | string[])[] | undefined
  env?: [string[], string, string][] | undefined
  required?: (string | string[])[] | undefined
  help?: object | undefined
}
export type ParsedCLI = {
  env: Record<string, string>
  argv: Record<string, any>
  args: Record<string, any>
  commands: Record<string, boolean>
  errors: Array<string | string[]>
}
import { spawn as spawner } from './spawn.js'
import { exec as execute } from './exec.js'
import { prompt as promptUser } from './prompt.js'
import { execFile as executeFile } from './execFile.js'
