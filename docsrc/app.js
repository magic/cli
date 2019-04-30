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
        to: '/#config',
        text: 'configuration',
        items: [
          { to: '/#config-pure', text: 'pure' },
          { to: '/#config-prepend-append', text: 'append / prepend' },
          { to: '/#config-default', text: 'default' },
        ],
      },
    ],
  },
}
