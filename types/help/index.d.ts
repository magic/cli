export function maybeHelp(args: CLIArgs): string | false
export type ParsedCLI = {
  /**
   * - Parsed CLI flags or arguments.
   */
  args?: Record<string, any> | undefined
  /**
   * - Parsed subcommands.
   */
  commands?: Record<string, any> | undefined
  /**
   * - Validation errors or missing required args.
   */
  errors?: (string | string[])[] | undefined
}
export type CLIHelpMeta = {
  /**
   * - CLI name shown in the help header.
   */
  name?: string | undefined
  /**
   * - General help text or description.
   */
  text?: string | undefined
  /**
   * - Example usage text or lines.
   */
  example?: string | string[] | undefined
  /**
   * - Help text for commands.
   */
  commands?: Record<string, string> | undefined
  /**
   * - Help text for options/flags.
   */
  options?: Record<string, string> | undefined
  /**
   * - Help text for environment variables.
   */
  env?: Record<string, string> | undefined
}
export type CLIArgs = {
  /**
   * - Parsed CLI data (from argument parser).
   */
  parsed?: ParsedCLI | undefined
  /**
   * - CLI commands or argument definitions.
   */
  commands?: (string | string[])[] | undefined
  /**
   * - CLI option/flag definitions.
   */
  options?: (string | string[])[] | undefined
  /**
   * - Environment variable mappings.
   */
  env?: [string[], string, string][] | undefined
  /**
   * - Default values for options or flags.
   */
  default?: Record<string, any> | undefined
  /**
   * - Help configuration or raw string help text.
   */
  help?: CLIHelpMeta | undefined
}
