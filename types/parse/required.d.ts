export function parseRequired(args?: ParseRequiredArgs): Array<string | string[]>
export type ParsedCLI = {
  env: Record<string, string>
  argv: Record<string, any>
  args: Record<string, any>
  commands: Record<string, boolean>
  errors: Array<string | string[]>
}
export type ParseRequiredArgs = {
  parsed?: ParsedCLI | undefined
  props?:
    | {
        required?: string | (string | string[])[] | undefined
      }
    | undefined
}
