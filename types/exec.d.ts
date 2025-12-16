export function exec(
  cmd: string,
  options?: child_process.ExecOptionsWithStringEncoding & {
    stderrToStdout: boolean
  },
): Promise<string>
import child_process from 'child_process'
