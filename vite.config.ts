import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import viteImagemin from 'vite-plugin-imagemin'
import Shiki from 'markdown-it-shikiji'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    hmr: true,
    host: true,
    open: true,
    port: 6060,
    proxy: {},
  },

  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/element/index.scss" as *;',
      },
    },
  },

  optimizeDeps: {
    include: [
      '@element-plus/icons-vue',
      '@vueuse/core',
      'axios',
      'element-plus/es',
      'element-plus/es/components/base/style/index',
      'element-plus/es/components/message/style/index',
      'unplugin-vue-router/runtime',
    ],
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue', '.md'],
      routeBlockLang: 'yaml',
      dts: 'src/typed-router.d.ts',
      exclude: ['**/components/**/*'],
    }),

    // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        propsDestructure: true,
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
        'src/utils',
      ],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: process.env.NODE_ENV === 'production' ? ElementPlusResolver({ importStyle: 'sass' }) : undefined,
      dts: 'src/components.d.ts',
    }),

    {
      name: 'vite:element-plus-auto-import-in-dev',
      transform(code, id) {
        if (process.env.NODE_ENV === 'development' && /src\/main.ts$/.test(id)) {
          return {
            code: `
                  import ElementPlus from 'element-plus';
                  import 'element-plus/dist/index.css';
                  ${code.split('(ctx) => {').join('(ctx) => {ctx.app.use(ElementPlus);')};
                `,
            map: null,
          }
        }
      },
    },

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/anncwb/vite-plugin-imagemin/tree/master/#readme
    viteImagemin({
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
    }),

    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left query-target overflow-hidden',
      headEnabled: true,
      async markdownItSetup(md) {
        // https://prismjs.com/
        md.use(await Shiki({
          defaultColor: false,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        }))
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'JuPeng\'s Blog',
        short_name: 'JuPeng\'s Blog',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
      preload: 'swap',
    },
    onFinished() {
      generateSitemap({ hostname: 'https://blog.jupeng.top' })
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window', 'element-plus'],
  },
})
