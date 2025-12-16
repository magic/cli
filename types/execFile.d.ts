export function execFile(
  p: string,
  args?: string[],
  opts?: child_process.ExecFileOptions,
): Promise<string | Buffer>
import child_process from 'child_process'
