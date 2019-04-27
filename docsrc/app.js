module.exports = {
  state: {
    logotext: '@magic/cli',
    menu: [
      { to: '/#dependencies', text: 'dependencies' },
      { to: '/#install', text: 'install' },
      { to: '/#caveats', text: 'caveats' },
      { to: '/#usage', text: 'usage' },
      { to: '/#argv', text: 'argv' },
      { to: '/#commands', text: 'commands' },
      { to: '/#help', text: 'help' },
      {
        to: '/#configuration',
        text: 'config',
        items: [
          { to: '/#configuration-pure', text: 'pure' },
          { to: '/#prepend-append', text: 'append / prepend' },
          { to: '/#default', text: 'default' },
        ],
      },
    ],
  },
}
