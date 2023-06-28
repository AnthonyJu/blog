---
title: 炫酷主题切换
meta:
  - name: description
    content: 在切换主题的时候，通过View Transitions API，实现炫酷的主题切换效果。
  - keywords: dark mode, view transitions
---

<route lang="yaml">
meta:
  title: 炫酷主题切换
  desc: 在切换主题的时候，通过View Transitions API，实现炫酷的主题切换效果。
  keywords: [DarkMode, View Transitions]
  date: 2023-06-14 20:15:26
</route>

# 炫酷主题切换

通常情况下，网站只有一套主题，但是随着用户的需求🤓，我们需要为网站添加一个暗黑模式🌗，这个时候就需要切换主题了。而且个人比较喜欢😘`黑暗模式`，所以这个功能是必须的。在本博客开发过程中，我发现🤩了一个很有意思的 CSS 属性，可以实现炫酷的切换效果，它就是`view-transition`，但需要搭配 JS 来使用，下面就来看看🧐如何使用吧。

## View Transitions

View Transitions API 是一类较新的 web API, 目前, chrome 111+ 已经支持该 API， 利用快照 snapshot 技术为 DOM 更新提供了更加便利的过渡机制。

## 实现原理

首先通过 JS 进行触发：

```js
document.startViewTransition(() => {
  // do something
})
```

调用 `startViewTransition()` 后, 浏览器会记录第一张快照, 然后执行触发 DOM 状态变动的代码.执行完毕后, 浏览器会捕捉第二张快照.

有了这两个两个快照, 浏览器就会在页面的最上层, 构建一个类似下面结构的伪元素树:

```cs
:: view-transition
└─ :: view-transition-group(root)
    └─ :: view-transition-image-pair(root)
      ├─ :: view-transition-old(root)
      └─ :: view-transition-new(root)
```

接下来，我们只需要去控制这个些伪元素树，即可实现过渡动画效果。

## 实现代码

首先是 CSS 部分：

```css
/** 取消该模式的默认过渡动画 */
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}

/** 切换主题时调整快照的顺序 */
::view-transition-old(root) {
  z-index: 999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 999;
}
```

是的 CSS 部分就这么简单，接下来是 JS 部分：

```ts
// 使用view-transition进行主题过渡
function toggleTheme(e: MouseEvent) {
  // 不支持view-transition则直接切换主题
  // @ts-expect-error failed to resolve types
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  const x = e.clientX
  const y = e.clientY
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  // @ts-expect-error failed to resolve types
  const trans = document.startViewTransition(() => {
    toggleDark()
    const root = document.documentElement
    root.classList.remove(isDark.value ? 'light' : 'dark')
    root.classList.add(isDark.value ? 'dark' : 'light')
  })

  trans.ready.then(() => {
    const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${radius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${isDark.value ? 'new' : 'old'}(root)`,
      },
    )
  })
}
```

其中 `toggleDark()` 与 `isDark` 是 [vueuse](https://vueuse.org/) 中用来切换与记录当前主题状态的，如果你不使用 vueuse，你可以自己实现一个，例如，isDark 可以使用以下代码实现：

```ts
const isDark = root.classList.contains('dark')
```

调用 `startViewTransition()` 后, 会返回一个 `ViewTransition` 对象，该对象提供对过渡达到不同状态（例如，准备运行动画或动画完成）或完全跳过过渡做出反应的功能。其中`ready`属性返回一个`Promise`，创建伪元素树并且过渡动画即将开始时，该 Promise 将被解析。

在本次实现中，我使用了 `clip-path` 属性来实现动画效果（这才是炫酷本酷😎，通过点击的位置去圆形过渡），当然你也可以使用其他的属性，比如 `transform`、`opacity` 等等，只要你能实现你想要的效果就行。

## 还需注意

- 再进行过渡时，页面将会`失去交互能力`，直到过渡结束。
- TS类型不支持，需要使用 `@ts-expect-error` 来忽略类型检查。
- CSS中如果使用了stylelint，需要忽略 `::view-transition` 伪元素。
- 该 API 目前还处于`实验阶段`，可能会有较大的改动，不建议在生产环境中使用（我用了🤨）。

## 尝试一下

点击下面的按钮（或点击顶部的切换按钮），切换一下主题吧！🤗

<script setup lang="ts">
import { toggleTheme } from '@/utils/toggleTheme'
</script>

<div>
  <el-button @click="toggleTheme" type="primary">切换主题</el-button>
  <el-button @click="toggleTheme" type="success">切换主题</el-button>
  <el-button @click="toggleTheme" type="warning">切换主题</el-button>
  <el-button @click="toggleTheme" type="danger">切换主题</el-button>
  <el-button @click="toggleTheme" type="info">切换主题</el-button>
</div>

## 参考资料

> 1、[JS startViewTransition() Method](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)<br />2、[CSS View Transitions Module](https://drafts.csswg.org/css-view-transitions/#intro)
