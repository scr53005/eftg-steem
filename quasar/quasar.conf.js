// Configuration for your app

const path = require('path')
/* uncomment next line and chain command below to rebuild icons */
// const IconFactory = require('icon-factory')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'fuse',
      'pdf'
//      { path: 'pdf', server: false}
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'material-icons',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      gzip: true,
      analyze: true,
      /*
      extendWebpack (cfg) {
        cfg.output = {
          ...cfg.output,
          globalObject: 'this'
        }
      },
      */
      chainWebpack (chain) {
        chain.output.set('globalObject', 'this')
        /* use when publishing */
        /*
        chain.plugin('icon-factory')
          .use(IconFactory, [
            [{
              preset: 'electron',
              source: './src/statics/icon-prototype_1480x1480.png',
              target: './src/statics/icons',
              options: false,
              minify: 'optipng',
              mode: undefined,
              debug: true
            }]
          ])
        */
        chain.module.rule('lint')
          .test(/\.(js|vue)$/)
          .use('eslint')
          .loader('eslint-loader')
          .options({
            cache: true
          })
        chain.module.rule('template-engine')
          .test(/\.pug$/)
          .use('pug')
          .loader('pug-plain-loader')
        chain.resolve.alias
          .set('~', __dirname)
          .set('@', path.resolve(__dirname, 'src'))
      }
    },
    devServer: {
      https: false,
      port: 8081,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QBtnDropdown',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemSeparator',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QChip',
        'QInput',
        'QChipsInput',
        'QSelect',
        'QField',
        'QAutocomplete',
        'QSearch',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QScrollArea',
        'QDatetime',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QTree',
        'QCheckbox',
        'QNoSsr',
        'QCollapsible',
        'QDialog'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Meta',
        'Cookies'
      ]
    },
    animations: ['bounceInDown', 'bounceInUp'],
    ssr: {
      pwa: {
        runtimeCaching: [
          {
            urlPattern: '/statics',
            handler: 'networkFirst'
          }
        ]
      }
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'EFTG',
        short_name: 'EFTG',
        description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    }
  }
}
