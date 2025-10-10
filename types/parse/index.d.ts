export function parse(props: ParseProps): ParsedCLI
export type ParseProps = {
  options?: (string | string[])[] | undefined
  prepend?: any[] | Record<string, any> | undefined
  append?: any[] | Record<string, any> | undefined
  default?: Record<string, any> | undefined
  pure?: boolean | undefined
  pureEnv?: boolean | undefined
  pureArgv?: boolean | undefined
  pureCommands?: boolean | undefined
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
