module.exports = {
  //  部署应用的基本url  可用 process.env.NODE_ENV 环境变量控制
  publicPath: './',
  //  指定生产环境目录
  outputDir: 'dist',
  //  指定生成静态资源的生成目录
  assetsDir: 'assets',
  //  指定生成的index.html的输出名
  indexPath: 'index.html',
  //  生成静态资源文件名包含hash以更好的控制缓存
  filenameHashing: true,
  //  是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效
  lintOnSave: false,
  //  设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  //  如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        Object.assign(options, {
          limit: 10000000,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        });
        return options;
      });
  },
  configureWebpack: {
    resolve: {
      alias: { // 配置快捷路径
        '@views': '@/views',
        '@component': '@/components',
        '@plugins': '@/plugins',
        '@assets': '@/assets'
      }
    },
    performance: {
      hints: false
    }
  },
  // 开发服务配置
  devServer: {
    port: '8080',
    open: false,
    host: '0.0.0.0',
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    stats: {
      // 去掉mini-css-extract-plugin莫名其妙的报warning
      children: false,
      warningsFilter: (warning) => /Conflicting order between/gm.test(warning)
    },
    proxy: {
      '/edc-pub-system-ms': {
        target: 'http://10.1.8.6:15101/edc-pub-system-ms',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/edc-pub-system-ms': '/'
        }
      },
      '/edc-dataasset-svc-ms': {
        target: 'http://10.1.8.6:12005/edc-dataasset-svc-ms',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/edc-dataasset-svc-ms': '/'
        }
      },
      '/edc-dgw-ms': {
        target: 'http://10.1.8.6:15301/edc-dgw-ms',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/edc-dgw-ms': '/'
        }
      },
      '/nl-edc-cct-sys-ms': {
        target: 'http://10.1.8.6:12001/nl-edc-cct-sys-ms',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/nl-edc-cct-sys-ms': '/'
        }
      },
      '/render-engine': {
        target: 'http://10.1.8.6:18001/render-engine',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/render-engine': '/'
        }
      },
      '/edc-pub-metainfo-ms': {
        target: 'http://10.1.8.6:15201/edc-pub-metainfo-ms',
        ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/edc-pub-metainfo-ms': '/'
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
