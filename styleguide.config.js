module.exports = {
    components: 'components/**/index.{ts,tsx}',
    webpackConfig: require('./webpack.config.build.js'),
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', [{}]).parse
  }