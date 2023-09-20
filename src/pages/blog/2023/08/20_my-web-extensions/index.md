---
title: 自己开发的浏览器插件
meta:
  - name: description
    content: 介绍一下自己开发的浏览器插件，使用人数终于突破500人次了。
  - name: keywords
    content: Browser, Web Extensions
---

<route lang="yaml">
meta:
  title: 自己开发的浏览器插件
  desc: 介绍一下自己开发的浏览器插件，使用人数终于突破500人次了。
  keywords: [Browser, Web Extensions]
  date: 2023-08-20 20:44:32
</route>

## 自己开发的浏览器插件

介绍一下自己前段时间开发的浏览器插件，一个是用于取色的[Color Picker](https://microsoftedge.microsoft.com/addons/detail/color-picker/kdalomkmijnajhdenobbpjckagnmgmdg?hl=zh-CN)，一个是用于管理扩展的[Extension Manager（极简）](https://microsoftedge.microsoft.com/addons/detail/extension-manager%EF%BC%88%E6%9E%81%E7%AE%80%EF%BC%89/pfiggkflfkhohkmegglgnlgakdbmjdfh?hl=zh-CN)，这两个都已经上架`Edge浏览器`的插件商店了，累计使用人数终于突破`500`人次啦😃。

## Color Picker

插件商店中用了很多，发现没有一个好用的`取色插件`，而且多数取色插件都比较臃肿，所以就自己开发了一个，这个插件的特点是：`简单、轻量、快速`，没有其他多余的功能，只有取色功能，取色时会自动将颜色值复制到`剪贴板`，方便直接粘贴使用，并且可以在`非浏览器窗口`使用。

![Color Picker](./images/picker.png)

## Extension Manager（极简）

插件过多时就需要一款`插件管理器`，同样的我发现多数插件管理器都比较繁琐，还不好看，所以就自己开发了一个，提供了插件的、`启用`、`禁用`、`卸载`、`排序`、`匹配`等功能，没有其他的额外操作，仅在一个面板上即可完成所有操作：

> 1. 支持扩展启用、禁用、卸载（双击扩展图标）。
> 2. 支持三种排序方式，默认排序、激活优先、手动排序（点击扩展图标拖拽进行排序）。
> 3. 支持点击扩展名称进入扩展配置界面。
> 4. 提供与扩展管理相同快捷按钮：管理扩展、扩展商店。
> 5. 提供两种主题，浅色、深色。
> 6. 提供规则匹配，根据当前打开网站，自动启用与禁用扩展。

![Extension Manager](./images/ext-manager.png)

## 项目地址

这两个插件都可以在我的`GitHub`上找到源码：

> 1. [Color Picker](https://github.com/AnthonyJu/webext-color-picker)
> 2. [Extension Manager（极简）](https://github.com/AnthonyJu/webext-minimalism-extension-manager)

## 其他浏览器使用

谷歌浏览器是肯定没问题的跟Edge应该是一样的，其他浏览器没有测试过，再就是如果要在其他浏览器使用，包括谷歌浏览器，需要自己添加，因为谷歌商店的开发者需要花软妹币，而且需要绑定国外银行卡。具体操作如下

> 1. 下载源码，解压到本地：[Color Picker](https://raw.githubusercontent.com/AnthonyJu/static/main/color-picker/extension.zip)、[Extension Manager（极简）](https://raw.githubusercontent.com/AnthonyJu/static/main/minimalism-extension-manager/extension.zip)
> 2. 打开浏览器设置，找到`扩展程序`，打开`开发者模式`。
> 3. 点击`加载已解压的扩展程序`，选择解压后的文件夹即可。

## 潜在问题及后续

哈哈哈哈哈， `Color Picker`应该没啥问题，我还想好了一个优化使用的地方，等后续有时间有心情再弄吧。`Extension Manager（极简）`常用功能没有，匹配这个有一点，有时会出现匹配失败的情况，这个后续再看看吧，多数情况下正常浏览都没啥问题，如果有人反应的话，我就立刻修复，没有人反应的话，我就emmmmm😂。
