export function parseCommands(props?: ParseCommandsProps): Record<string, boolean>
export type ParseCommandsProps = {
  /**
   * - Commands or alias arrays to check.
   */
  commands?: (string | string[])[] | undefined
  /**
   * - If true, do not modify process.argv.
   */
  pure?: boolean | undefined
}
