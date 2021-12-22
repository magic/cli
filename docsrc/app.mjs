export const state = {
  title: '@magic/cli',
  description: 'declarative cli wrapper for @magic',
  logotext: '@magic/cli',
  menu: [
    { to: '/#install', text: 'install' },
    { to: '/#caveats', text: 'caveats' },
    { to: '/#usage', text: 'usage' },
    { to: '/#argv', text: 'argv' },
    { to: '/#commands', text: 'commands' },
    { to: '/#help', text: 'help' },
    {
      to: '/#config',
      text: 'configuration',
      items: [
        { to: '-pure', text: 'pure' },
        { to: '-prependappend', text: 'append / prepend' },
        { to: '-default', text: 'default' },
      ],
    },
    { to: '/#clean', text: 'clean' },
    { to: '/#required', text: 'required' },
    {
      to: '/#helpers',
      text: 'helpers',
      items: [
        { to: '-exec', text: 'cli.exec' },
        { to: '-execfile', text: 'cli.execFile' },
        { to: '-spawn', text: 'cli.spawn' },
      ],
    },
    { to: '/#source', text: 'source' },
  ],
}
