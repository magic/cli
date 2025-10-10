export function prompt(
  msg?: string | string[],
  options?: {
    yesNo?: boolean | undefined
    yesDefault?: boolean | undefined
    std?: NodeJS.Process | undefined
  },
): Promise<string | boolean>
