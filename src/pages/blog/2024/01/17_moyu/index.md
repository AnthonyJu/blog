---
title: 在html中使用vue和element
meta:
  - name: description
    content: 通过cdn引入vue、element-ui、unocss，方便快速开发和测试一些小功能。
  - name: keywords
    content: html, vue, cdn
---

<route lang="yaml">
meta:
  title: 在html中使用vue和element
  desc: 通过cdn引入vue、element-ui、unocss，方便快速开发和测试一些小功能。
  keywords: [html, vue, cdn]
  date: 2024-01-27 21:21:12
</route>

# 在html中使用vue和element

方便快速开发和测试一些小功能，我们可以直接在html中引入`vue`、`element-ui`、`unocss`等，而不需要使用 vue-cli、vite 等工具。

## 引入方式

这里 CDN 使用了[unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/package/npm/) 或 [cdnjs](https://cdnjs.com/libraries/)，甚至是[esm](https://esm.sh/)。当然，你也可以下载此文件并自行提供服务。

## 相关链接

> 通过 CDN 使用 Vue：https://cn.vuejs.org/guide/quick-start.html#using-vue-from-cdn

> 通过 CDN 使用 Element Plus：https://element-plus.org/zh-CN/guide/installation.html#浏览器直接引入

> 通过 CDN 使用 unocss：https://unocss.dev/integrations/runtime

## 示例代码

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- Import style -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-plus/dist/index.css"
    />
    <!-- Import Vue 3 -->
    <script src="https://unpkg.com/vue@3"></script>
    <!-- Import component library -->
    <script src="https://unpkg.com/element-plus"></script>
    <!-- Import unocss -->
    <script>
      window.__unocss = {
        shortcuts: {
          full: 'w-full h-full',
          'flex-col': 'flex flex-col',
          'flex-items': 'flex items-center',
          'flex-b-c': 'flex justify-between items-center',
          'flex-center': 'flex justify-center items-center',
          'flex-col-center': 'flex flex-col justify-center items-center',
          'border-default': 'border border-solid',
        },
      }
    </script>
    <script src="https://unpkg.com/@unocss/runtime"></script>
  </head>

  <body>
    <div id="app">
      <div class="border-default flex-center p-20px">
        <el-button class="m-30px" type="primary">{{ message }}</el-button>
      </div>
    </div>

    <script>
      const { createApp, ref } = Vue
      const { ElMessage } = ElementPlus

      const App = {
        setup() {
          const message = ref('Hello vue!')

          function handleClick() {
            ElMessage.success('Hello Element Plus!')
          }

          return {
            message,
            handleClick,
          }
        },
      }

      const app = Vue.createApp(App)
      app.use(ElementPlus)
      app.mount('#app')
    </script>
  </body>
</html>
```

## 摸鱼鱼

是的，这是一篇摸鱼混水的文章💦，但是这种方式在一些小功能的开发和测试中还是很方便的，毕竟不需要配置环境🙈。
