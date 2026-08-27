const { ConfigParser } = require('/tmp/configure-pages-repo/src/config-parser');
const settings = {
  configurationFile: 'test-config.mjs',
  blankConfigurationFile: '/tmp/configure-pages-repo/src/blank-configurations/next.js',
  properties: { output: 'export', basePath: '/repo', 'images.unoptimized': true },
  allowWrappingCall: false
}
const parser = new ConfigParser(settings)
parser.injectAll()
