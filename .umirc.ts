import path from 'path'

export default {
  npmClient: 'yarn',
  mfsu: false,
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
  lessLoader: {
    modifyVars: {
      hack: `true; @import '${path.resolve(__dirname, './src/variable.less')}';`
    }
  }
};
