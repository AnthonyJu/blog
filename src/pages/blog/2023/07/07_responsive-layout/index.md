---
title: CSS Grid 实现响应式布局
meta:
  - name: description
    content: 通过 CSS Grid repeat() 函数实现无需媒体查询便可轻松实现响应式布局。
  - name: keywords
    content: CSS, Grid, Responsive Layout
---

<route lang="yaml">
meta:
  title: CSS Grid 实现响应式布局
  desc: 通过 CSS Grid repeat() 函数实现无需媒体查询便可轻松实现响应式布局。
  keywords: [CSS, Grid, Responsive Layout]
  date: 2023-07-07 21:07:16
</route>

# CSS Grid 实现响应式布局

在 Web 开发中，布局是一个非常重要的部分。CSS 提供了多种布局方式，其中`Grid`布局是一种非常强大和灵活的布局方式，我们可以使用`Grid`布局来实现复杂的页面布局和响应式设计。

不看啰里八嗦的，可直接翻到最后，查看`Grid 终极响应式布局代码`。

## 1、Grid 布局简介

Grid 布局是一种二维网格布局方式，可以将页面分成多个行和列，并将元素放置在这些行和列中。Grid 布局提供了非常灵活的布局方式，可以实现复杂的页面布局和响应式设计。

在 CSS 中，我们可以使用`display: grid`属性来创建一个 Grid 布局。然后，我们可以使用`grid-template-columns`和`grid-template-rows`属性来定义网格的列和行。我们还可以使用`grid-template-areas`属性来定义网格的区域，以便更方便地布局元素。

例如，我们可以使用以下代码来创建一个包含 2 行 5 列的网格：

```scss
.grid-0 {
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;

  div {
    background-color: var(--el-color-primary);
  }
}
```

具体呈现为：

<div class="grid-0">
  <div /><div /><div /><div /><div /><div /><div /><div />
</div>

<style lang='scss'>
.grid-0 {
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;

  div {
    background-color: var(--el-color-primary);
  }
}
</style>

## 2、repeat() 函数

在上面的例子中，我们使用`grid-template-columns`和`grid-template-rows`属性来定义网格的列和行。但是，如果我们想要创建一个包含 100 列的网格，那么我们就需要写 100 个`1fr`，这样的代码显然是不可取的。

为了解决这个问题，CSS 提供了`repeat()`函数，我们可以使用`repeat()`函数来重复一个值。例如，我们可以使用以下代码来创建一个包含 100 列的网格：

```scss
.grid {
  grid-template-columns: repeat(100, 1fr);
}
```

具体呈现：呃🤔️，你懂的，太多了，我就不贴了。

## 3、repeat() 函数的参数

`repeat()`函数接受两个参数，第一个参数代表`计数`，第二个参数代表`轨道`（轨道是一列或一行的通用名称）。

### 3.1 第一个参数

可以是以下三种之一：

- 数字（比如1，2，3）
-`auto-fit`关键字
-`auto-fill`关键字

显然，数字值设定了特定的轨道数。但是，`auto-fit`和`auto-fill`可以根据可用空间的大小，设置不同数量的轨道。这使得它们在没有媒体查询的响应式布局中非常方便。下面我们将对它们进行详细介绍。

### 3.2 第二个参数

指定了要重复的轨道数。可选值包括：

- 长度值，可使用单位包括`fr、px、em、%和ch`等等
- `min-content`关键字
- `max-content`关键字
- `auto`关键字
- `minmax()`函数，其可以嵌套`min()`或者`max()`函数
- `fit-content()`函数
- 命名线

正如你所看到的，这个参数有很多可能的选项，它们看起来可能有点混乱，尤其是当几个选项组合在一起的时候。在此，我们将尽量把事情简单化，以免陷入混乱。在大多数情况下，轨道参数是相当简单和直观的。

## 4、minmax()函数

`minmax()`函数本身需要两个参数--最小值和最大值，中间用逗号隔开。因此，通过 minmax()，我们可以在灵活的环境中为轨道设置一系列可能的尺寸。

例如，我们可以将一列设置为`minmax(40px, 100px)`，这意味着其最小宽度为`40px`，最大宽度为`100px`。

`minmax()`的两个参数都可以使用长度值，如`fr、px、em、% 和 ch`，以及`min-content`、`max-content`和`auto`。不过，最好至少为一个参数使用长度值，因为关键字不应该同时作为两个参数工作（不过有时确实可以这样做，例如`minmax(min-content,max-content)）`。

下面代码设置了五列，每一列的最小宽度为100px，最大宽度为1fr：

```scss
.grid-1 {
  grid-template-columns: repeat(5, minmax(100px, 1fr));
}
```

<div class="grid-1">
  <div /><div /><div /><div /><div /><div /><div /><div />
</div>

<style lang='scss'>
.grid-1 {
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  grid-gap: 15px;
  overflow: auto;

  div {
    background-color: var(--el-color-primary);
  }
}
</style>

## 5、使用min()或者max()

`minmax()`函数的参数也可以是`min()`或`max()`函数。这两个函数都接收两个参数。`min()`函数应用两个值中较小的值，而`max()`函数应用较大的值。这在响应式环境中非常有用。

例如：

```scss
.grid-2 {
  grid-template-columns: repeat(5, minmax(min(60px, 10vw), 1fr));
}
```

<div class="grid-2">
  <div /><div /><div /><div /><div /><div /><div /><div />
</div>

<style lang='scss'>
.grid-2 {
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: repeat(5, minmax(min(60px, 10vw), 1fr));
  grid-gap: 15px;
  overflow: auto;

  div {
    background-color: var(--el-color-primary);
  }
}
</style>

上面的代码设置了五列。在宽屏幕浏览器上，五列的间距均为`1fr`。在较窄的设备上，列会越来越窄。一旦达到`60px`和`10vw`之间的较低值，就会停止缩小。因此，在窄屏幕上，我们仍然会发现内容悬挂在容器外；要做到完全响应式，还有很长的路要走。

如果你觉得`minmax()`、`min()`和`max()`的组合在现阶段有点令人失望，请坚持住，它们的真正威力将在`repeat()`函数第一个参数设置为`auto-fit`和`auto-fill`时显现。

## 6、使用auto-fit和auto-fill

auto-fit和auto-fill关键字是设置固定轨道数的替代方法。它们告诉浏览器在给定空间内尽可能多地填充轨道。

例如：

```scss
.grid-3 {
  grid-template-columns: repeat(auto-fit, 200px);
}
```

<div class="grid-3">
  <div /><div /><div /><div /><div /><div /><div /><div />
</div>

<style lang='scss'>
.grid-3 {
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 15px;
  overflow: auto;

  div {
    background-color: var(--el-color-primary);
  }
}
</style>

在上面的演示中，div 的宽度被设置为`200px`，那些无法在一行中显示的 div 会被放到下一行。如果我们将`auto-fit`改为`auto-fill`，就会发现没有什么不同，因为在这种情况下，它们的作用是一样的。它们之间的区别只有在特殊情况下才会显现出来。

## 7、结合minmax()和auto-fit/auto-fill

### 7.1 使用auto-fit和minmax()

下面示例中，minmax()设置了最大列宽为200px，最小列宽为1fr：
```scss
.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

<div class="grid-4">
  <div /><div /><div /><div /><div /><div /><div /><div />
</div>

<style lang='scss'>
.grid-4 {
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 15px;

  div {
    background-color: var(--el-color-primary);
  }
}
</style>

每个 div 的宽度必须至少为`200px`。如果右侧有额外空间（小于 200 像素），div 会展开以填充空间。如果我们拓宽浏览器，一旦又有`200px`的空间，就会在行中添加另一个 div。同样的情况也会反过来发生：当我们缩小浏览器时，一旦没有至少`200px`的空间可以容纳，行中的最后一个 div 就会进入下一行。一旦该 div 掉下去，其余的 div 就会展开以填满该行。

同样，如果我们把`auto-fit`换成`auto-fill`，就会看到相同的行为。

不过，这个例子有一个限制。如果我们将浏览器窗口设置得足够窄，最终就会出现单列。当这一列的宽度小于 200px 时，div 就会开始溢出其容器。

### 7.2 使用auto-fit，minmax()和min()

通过引入`min()`来控制小宽度下的情况:

```scss
.grid-5 {
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
}
```

现在，最小列宽有两个选项。浏览器会选择最小值。一旦列的宽度小于 200px，100% 就是较小的值，因此以它为准。这意味着剩下的一列现在被设置为宽度：100%，因此在宽度不断减小的情况下，它仍能很好地适应其容器。

## 8、Grid 终极响应式布局 代码

呃，是的就是上面 7.2 的代码，再贴一遍，方便复制粘贴🤪：

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
}
```

## 9、参考文档

> 1、译文：https://mp.weixin.qq.com/s/Ff5e4SXSC_RPMst_GA1wHg <br/>
> 2、原文：https://www.sitepoint.com/css-grid-repeat-function
