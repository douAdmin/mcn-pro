import { defineConfig } from 'umi'
import { join } from 'path'
import antdDefaultSetting from './antd.default.setting'
import proxy from './proxy'
import routes from './routes'

// const CompressionWebpackPlugin = require("compression-webpack-plugin")

const { REACT_APP_ENV } = process.env
const staticDir = 'static'
const isEnvProduction = process.env.NODE_ENV === "production"

const publicPath = isEnvProduction ? './' : '/'

export default defineConfig({
  // 输出路径
  outputPath: './dist',
  // 修改webpack打包配置
  chainWebpack(config, { env, webpack, createCSSRule }) {

    // 控制js输出文件
    const jsFileName = `${staticDir}/js/[name].[hash:8].js`
    const jsChunkFilename = `${staticDir}/js/[name].[contenthash:8].chunk.js`
    config.output
      .filename(jsFileName)
      .chunkFilename(jsChunkFilename)

    // 控制css输出文件
    const cssFileName = `${staticDir}/css/[name].[contenthash:8].css`
    const cssChunkFilename = `${staticDir}/css/[name].[contenthash:8].chunk.css`
    config.plugin('extract-css').tap(() => [{
      filename: cssFileName,
      chunkFilename: cssChunkFilename,
      ignoreOrder: true
    }])

    // 控制图片 svg 输出文件
    const imageFileName = `${staticDir}/image/[name].[hash:8].[ext]`
    const imageChunkFilename = `${staticDir}/image/[name].[hash:8].chunk.[ext]`
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .tap((options) => {
        return {
          ...options,
          name: imageFileName,
          fallback: {
            ...options.fallback,
            options: { name: imageChunkFilename, esModule: false },
          },
        }
      })
    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("file-loader")
      .loader(require.resolve("file-loader"))
      .tap((options) => ({
        ...options,
        name: imageFileName,
      }));


    // 控制字体输出文件
    const fontFileName = `${staticDir}/fonts/[name].[hash:8].[ext]`
    const fontChunkFilename = `${staticDir}/fonts/[name].[hash:8].chunk.[ext]`

    config.module
      .rule("fonts")
      .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
      .use("file-loader")
      .loader(require.resolve("file-loader"))
      .tap((options) => ({
        ...options,
        name: fontFileName,
        fallback: {
          ...options.fallback,
          options: { name: fontChunkFilename, esModule: false }
        }
      }))

    // 添加gzip压缩 TODO:老是报错暂时没有找到原因
    // config.when(isEnvProduction, (config) => {
    //   config
    //     .plugin(CompressionWebpackPlugin)
    //     .use(new CompressionWebpackPlugin({
    //       filename: "[path].gz[query]",
    //       algorithm: "gzip",
    //       test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
    //       threshold: 10240,
    //       minRatio: 0.8,
    //       deleteOriginalAssets: true
    //     }))
    // })
  },
  terserOptions: {
    compress: {
      drop_console: isEnvProduction, // 生成环境去除无用的console
    },
  },
  // 路由模式
  history: {
    type: 'hash'
  },
  // 访问静态文件路径
  publicPath: publicPath,
  // 开启 hash 文件后缀
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...antdDefaultSetting,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': antdDefaultSetting.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'openAPI.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
})
