import log from '@magic/log'

import { findLongestString } from './findLongestString.mjs'

export const envToHelp = env => {
  const envStrings = env.map(env => env[0])

  const longest = findLongestString(envStrings)

  return env
    .map(e => {
      const [cmds, name, value] = e
      const [sw, ...aliases] = cmds
      const swc = log.paint('yellow', sw)

      const dist = longest.length - sw.length
      const placeholder = Array(dist + 1).join(' ')

      const aliasString = aliases.map(a => log.paint('yellow', a)).join('", "')

      return `${swc}:${placeholder} set process.${name} to ${value} - alias: ["${aliasString}"]`
    })
    .join('\n')
}
