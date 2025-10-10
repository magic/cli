export function execFile(
  p: string,
  args?: string[],
  opts?: import('child_process').ExecFileOptions,
): Promise<string | Buffer>
