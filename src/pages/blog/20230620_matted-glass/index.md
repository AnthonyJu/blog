---
title: 背景毛玻璃效果
meta:
  - name: description
    content: 在网页开发过程中，些许的背景毛玻璃效果，会让页面看起来更加的高级一些。
  - keywords: 背景, css, 毛玻璃
---

<route lang="yaml">
meta:
  title: 背景毛玻璃效果
  desc: 在网页开发过程中，些许的背景毛玻璃效果，会让页面看起来更加的高级一些。
  tags: [背景, css, 毛玻璃]
  date: 2023-06-11 22:28:56
</route>

# 背景毛玻璃效果

在开发首页的时候，一些元素需要添加适当的背景🌁，但是又不想让背景太过于突兀🧐，这个时候就想到背景毛玻璃效果了。😬但是毛玻璃效果的实现方式有很多种，这里只介绍一种最简单也是我最常用的。

## 实现原理

通过`background-color`添加带透明度的背景色，使用`backdrop-filter`的`blur`属性来控制背景模糊的程度，再辅以`box-shadow`来实现简单的阴影效果，这样一个简单的毛玻璃效果就实现了。

## 效果展示

<script setup lang="ts">
  import Demo from './components/demo.vue'
</script>

<Demo></Demo>

> 参考链接：http://tool.mkblog.cn/glassmorphism
