export function parseEnv({ env, pure }: ParseEnvProps): Record<string, string>
/**
 * Tuple of: [CLI switches], environment variable name, value].
 */
export type EnvTuple = [string | string[], string, string]
export type ParseEnvProps = {
  /**
   * - Environment variables to parse.
   */
  env: EnvTuple[]
  /**
   * - If true, do not modify process.env.
   */
  pure?: boolean | undefined
}
