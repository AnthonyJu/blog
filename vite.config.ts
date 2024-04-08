import fs from 'node:fs'
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
import Shiki from '@shikijs/markdown-it'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import ElementPlus from 'unplugin-element-plus/vite'
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
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      dts: 'src/components.d.ts',
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: process.env.NODE_ENV === 'production' ? ElementPlusResolver({ importStyle: 'sass' }) : undefined,
    }),

    // https://github.com/element-plus/unplugin-element-plus/tree/main/#readme
    process.env.NODE_ENV === 'development'
      ? {
          name: 'vite:element-plus-auto-import-in-dev',
          transform(code, id) {
            if (/src\/main.ts$/.test(id)) {
              const codeList = code.split('export const createApp = ViteSSG(')
              return {
                code: `
                  ${codeList[0]}
                  import ElementPlus from 'element-plus'
                  import 'element-plus/theme-chalk/src/index.scss'
                  export const createApp = ViteSSG(
                  ${codeList[1].split('(ctx) => {').join('(ctx) => {ctx.app.use(ElementPlus);')};
                `,
                map: null,
              }
            }
          },
        }
      : ElementPlus({ useSource: true }),

    // 更新文件时自动添加lastmod
    {
      name: 'vite:update-md-lastmod',
      handleHotUpdate({ file, timestamp }) {
        if ((file.includes('/blog/') || file.includes('/note/')) && file.endsWith('.md')) {
          // 读取文件内容
          const content = fs.readFileSync(file, 'utf-8')
          // 正则读取文件内容中的latestmod
          const latestmod = content.match(/latestmod: (.+?)\n/)?.[1]
          // 如果时间间隔小于3h则不更新
          if (latestmod && timestamp - new Date(latestmod).getTime() < 1000 * 60 * 60 * 3) return
          // 获取当前时间
          const newLatestmod = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }).replaceAll('/', '-')
          // 格式化newLastmod为yyyy-MM-dd HH:mm:ss
          const newLatestmodFormatted = `${newLatestmod.split(' ')[0].split('-').map(item => item.padStart(2, '0')).join('-')} ${newLatestmod.split(' ')[1]}`
          // 更新文件内容
          const newContent = latestmod
            ? content.replace(/lastmod: (.+?)\n {2}latestmod: (.+?)\n<\/route>/, `lastmod: ${latestmod}\n  latestmod: ${newLatestmodFormatted}\n</route>`)
            : content.replace(/<\/route>/, `  lastmod: ${newLatestmodFormatted}\n  latestmod: ${newLatestmodFormatted}\n</route>`)
          // 写入文件
          fs.writeFileSync(file, newContent, 'utf-8')
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
