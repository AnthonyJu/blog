---
title: 给博客添加点特效
meta:
  - name: description
    content: 给网站增加了一些华丽的特效：飘落的樱花，点击时的烟花，鼠标默认光标。
  - name: keywords
    content: [Effect, Sakura, Cursor]
---

<route lang="yaml">
meta:
  title: 给博客添加点特效
  desc: 给网站增加了一些华丽的特效：飘落的樱花🌸，点击时的烟花🎆，鼠标🖱️默认光标。
  keywords: [Effect, Sakura, Cursor]
  date: 2023-06-22 21:35:29
</route>

# 给博客添加点特效

感觉博客有些太静态了🧐，于是给网站增加了一些华丽的特效：飘落的樱花🌸，点击时的烟花🎆，鼠标🖱️默认光标。

## 飘落的樱花 🌸

随时随机的飘落花瓣简直不要太温馨了🤗

> 代码：<a href="/sakura.js" download="sakura.js">点击下载 sakura.js</a>

食用方式：直接引入即可（默认开启）

```html
<script src="/sakura.js"></script>
```

代码第一行的`SAKURA_NUM`代表飘落樱花数量。

```ts
const SAKURA_NUM = 30
```

启用与禁用方式：

```ts
toggleSakura()
```

## 点击时的烟花 🎆

嘎嘎秀有木有😂

> 代码：<a href="/fireworks.js" download="fireworks.js">点击下载 fireworks.js</a>

食用方式：直接引入即可（默认开启）

```html
<script src="/fireworks.js"></script>
```

启用与禁用方式：
```ts
toggleFireworks()
```

## 鼠标 🖱️ 默认光标

鼠标瞬间变得萌萌哒🤪

食用方式：

```css
body {
  cursor: url('/cursor.cur'), auto;
}
```

> 默认光标：<a href="/cursor.cur" download="cursor.cur">点击下载</a>
