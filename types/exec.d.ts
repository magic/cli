export function exec(cmd: string, options?: CLIExecOptions): Promise<string>
export type CLIExecOptions = child_process.ExecOptionsWithStringEncoding & {
  stderrToStdout?: boolean
}
import child_process from 'child_process'
