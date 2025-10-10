export function parseArgv(props?: ParseArgvProps): ParseArgvResult
export type Option = string | string[]
export type ArgMap = Record<string, string | string[]>
export type ParseArgvProps = {
  /**
   * - CLI option names or aliases.
   */
  options?: Option[] | undefined
  /**
   * - Arguments to prepend to process.argv.
   */
  prepend?: string[] | ArgMap | undefined
  /**
   * - Arguments to append to process.argv.
   */
  append?: string[] | ArgMap | undefined
  /**
   * - Default values for options.
   */
  default?: ArgMap | undefined
  /**
   * - If true, do not modify process.argv.
   */
  pure?: boolean | undefined
}
export type ParseArgvResult = {
  /**
   * - Raw argument key/value map.
   */
  argv: Record<string, string[]>
  /**
   * - Camel-cased argument key/value map.
   */
  args: Record<string, string[]>
}
