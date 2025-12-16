export function execFile(
  p: string,
  args?: string[],
  options?: CLIExecFileOptions,
): Promise<string | Buffer>
export type CLIExecFileOptions = child_process.ExecFileOptions & {
  stderrToStdout?: boolean
}
import child_process from 'child_process'
