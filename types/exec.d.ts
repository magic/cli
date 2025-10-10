export function exec(
  cmd: string,
  options?: {
    stderrToStdout?: boolean | undefined
  },
): Promise<string>
