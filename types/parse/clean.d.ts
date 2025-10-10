export function clean(
  cli: import('./index.js').ParsedCLI,
  props?: CleanProps,
): import('./index.js').ParsedCLI
export type CleanProps = {
  /**
   * - List of single-value argument keys to clean.
   */
  single?: string[] | undefined
  /**
   * - Default values for arguments.
   */
  default?: Record<string, any> | undefined
}
