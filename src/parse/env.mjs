export const parseEnv = ({ env = [], pure = false }) => {
  const environment = []

  // set env depending on env switches
  env
    .filter(([argv]) => {
      if (!Array.isArray(argv)) {
        argv = [argv]
      }
      return argv.some(a => process.argv.includes(a))
    })
    .map(([_, key, val]) => {
      environment[key] = val
      if (!pure) {
        process.env[key] = val
      }
    })

  return environment
}
