---
title: 测试文章
meta:
  - name: description
    content: Hello World
  - name: keywords
    content: super duper SEO
---

<route lang="yaml">
meta:
  title: 文章测试
  desc: 编译Markdown到Vue组件,vite-plugin-md的精简版。
  poster: 20230606_1/20230606_1.png
  date: 2023-06-06 12:00:00
</route>

# vite-plugin-vue-markdown

[![NPM version](https://img.shields.io/npm/v/vite-plugin-vue-markdown?color=a1b858)](https://www.npmjs.com/package/vite-plugin-vue-markdown)

Compile Markdown to Vue component. A lite version of [vite-plugin-md](https://github.com/antfu/vite-plugin-md).

- Use Markdown as Vue components
- Use Vue components in Markdown

## Install

Install

```bash
npm i vite-plugin-vue-markdown -D # yarn add vite-plugin-vue-markdown -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown()
  ],
}
```

And import it as a normal Vue component

## Import Markdown as Vue components

```html
<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './README.md'

export default {
  components: {
    HelloWorld,
  },
}
</script>
```

## Use Vue Components inside Markdown

You can even use Vue components inside your markdown, for example

```html
<CounterApp :init='5'/>
```

<CounterApp :init='5'/>

Note you can either register the components globally, or use the `<script setup>` tag to register them locally.

```ts
import { createApp } from 'vue'
import App from './App.vue'
import CounterApp from './CounterApp.vue'

const app = createApp(App)

// register global
app.component('CounterApp', CounterApp) // <--

app.mount()
```

```html
<script setup>
import { CounterApp } from './CounterApp.vue'
</script>

<CounterApp :init='5'/>
```

Or you can use [`vite-plugin-components`](#work-with-vite-plugin-components) for auto components registration.

## Frontmatter

Frontmatter will be parsed and inject into Vue's instance data `frontmatter` field.

For example:

```md
---
name: My Cool App
---

# Hello World

This is {{frontmatter.name}}
```

Will be rendered as

```html
<h1>Hello World</h1>
<p>This is My Cool App</p>
```

It will also be passed to the wrapper component's props if you have set `wrapperComponent` option.

## Document head and meta

To manage document head and meta, you would need to install [`@unhead/vue`](https://unhead.harlanzw.com/integrations/vue/setup) and do some setup.

```bash
npm i @unhead/vue
```

```js
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true // <--
    })
  ]
}
```

```js
// src/main.js
import { createApp } from 'vue'

import { createHead } from '@unhead/vue' // <--

const app = createApp(App)

const head = createHead() // <--
app.use(head) // <--
```

Then you can use frontmatter to control the head. For example:

```yaml
---
title: My Cool App
meta:
  - name: description
    content: Hello World
---
```

For more options available, please refer to [`@unhead/vue`'s docs](https://unhead.harlanzw.com/integrations/vue/setup).

## Options

`vite-plugin-vue-markdown` uses [`markdown-it`](https://github.com/markdown-it/markdown-it) under the hood, see [`markdown-it`'s docs](https://markdown-it.github.io/markdown-it/) for more details

```ts
// vite.config.js
import Markdown from 'vite-plugin-vue-markdown'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItPrism from 'markdown-it-prism'

export default {
  plugins: [
    Markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        // for example
        md.use(MarkdownItAnchor)
        md.use(MarkdownItPrism)
      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body'
    })
  ],
}
```

See [the tsdoc](./src/types.ts) for more advanced options

## Example

See the [/example](./example).

Or the pre-configured starter template [Vitesse](https://github.com/antfu/vitesse).

## Integrations

### Work with [vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie)

```ts
import Markdown from 'vite-plugin-vue-markdown'
import Voie from 'vite-plugin-voie'

export default {
  plugins: [
    Voie({
      extensions: ['vue', 'md'],
    }),
    Markdown()
  ],
}
```

Put your markdown under `./src/pages/xx.md`, then you can access the page via route `/xx`.


### Work with [vite-plugin-components](https://github.com/antfu/vite-plugin-components)

`vite-plugin-components` allows you to do on-demand components auto importing without worrying about registration.

```ts
import Markdown from 'vite-plugin-vue-markdown'
import ViteComponents from 'vite-plugin-components'

export default {
  plugins: [
    Markdown(),
    // should be placed after `Markdown()`
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: path => path.endsWith('.md'),
    })
  ],
}
```

Components under `./src/components` can be directly used in markdown components, and markdown components can also be put under `./src/components` to be auto imported.

## TypeScript Shim

```ts
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}
```

## License

MIT License © 2020-PRESENT [Anthony Fu](https://github.com/antfu)
