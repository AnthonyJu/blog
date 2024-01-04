---
title: Vue 3.4 灌篮高手
meta:
  - name: description
    content: 实质性的改进，速度提高了2倍，重构的反应系统触发更加准确和高效, defineModel 的稳定和绑定时的同名简写。
  - name: keywords
    content: Vue3.4, defineModel
---

<route lang="yaml">
meta:
  title: Vue 3.4 灌篮高手
  desc: 实质性的改进，速度提高了2倍，重构的反应系统触发更加准确和高效, defineModel 的稳定和绑定时的同名简写。
  keywords: [Vue3.4, defineModel]
  date: 2023-12-29 20:00:38
</route>

# Vue 3.4 灌篮高手

昨天，Vue3.4`灌篮高手🏀`正式发布，此版本包括一些实质性的内部改进-最值得注意的是`重写`的模板解析器，速度提高了`2倍`，以及`重构`的反应系统，使效果触发更加准确和高效。它还打包了大量的生活质量API改进，包括`defineModel`的稳定和绑定道具时的`同名简写`。

有关更改的完整列表，请参阅[GitHub 上的完整更改日志](https://github.com/vuejs/core/blob/main/CHANGELOG.md#340-2023-12-28)。

> 依赖关系更新，升级到 3.4 时，建议同时更新以下依赖项：
>
> - Volar / vue-tsc@^1.8.27
> - vite@^5.0.0
> - @vitejs/plugin-vue@^5.0.0
> - vue-loader@^17.4.0 （如果使用 webpack 或 vue-cli）

> 原文：https://blog.vuejs.org/posts/vue-3-4

## 一、功能亮点

### 1. 2倍更快的解析器和改进的SFC构建性能

Vue3.4完全重写了模板解析器。以前，Vue使用递归下降解析器，依赖于许多正则表达式和前瞻搜索。新的解析器使用基于[htmlparser2](https://github.com/fb55/htmlparser2)中的标记器的状态机标记器，它只遍历整个模板字符串一次。结果是，对于所有大小的模板，解析器的速度始终是原来的两倍。得益于广泛的测试用例和[ecosystem-ci](https://github.com/vuejs/ecosystem-ci)，它对Vue终端用户也是100%向后兼容的。

基准测试显示，在编译Vue SFC的脚本和模板部分时，同时生成源代码映射时，性能提高了约44%，因此3.4应该会为大多数使用Vue SFC的项目带来更快的构建速度。但是，请注意，Vue SFC编译只是真实的项目中整个构建过程的一部分。与孤立的基准测试相比，端到端构建时间的最终增益可能要小得多。

在Vue核心之外，新的解析器也将有利于Volar / vue-tsc的性能，以及需要解析Vue SFC或模板的社区插件，例如Vue Macros。

> Context：[PR#9647](https://github.com/vuejs/core/pull/9674)

### 2. 更高效的反应系统

Vue3.4还提供了反应性系统的大量重构，目的是提高计算属性的重新计算效率。

为了说明正在改进的内容，让我们考虑以下场景：

```js
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // logs true

count.value = 2 // logs true again
```

在Vue 3.4之前，每当`count.value`被更改时，即使计算结果保持不变，`watchEffect`的回调也会被触发。在Vue3.4之后的优化中，回调现在仅在计算结果`实际发生变化`时才会触发。

此外，在Vue3.4中：

- 多个计算的深度变化只会触发一次同步效果。
- 数组 shift 、 unshift 、 splice 方法只触发一次同步效果。

除了基准测试中显示的收益之外，这应该在许多场景中减少不必要的组件重新呈现，同时保持完全的向后兼容性。

> Context: [PR#5912](https://github.com/vuejs/core/pull/5912)

### 3. defineModel 稳定

`defineModel`是一个新的`<script setup>`宏 ，旨在简化支持`v-model`的组件的实现。它以前在Vue3.3中作为实验特性发布，并在3.4中逐渐稳定。它现在还为使用 v-model 修饰符提供了`更好`的支持：

```ts
// making the v-model required
const model1 = defineModel({ required: true })

// providing a default value
const model2 = defineModel({ default: 0 })

// providing a default value and making it required
const model3 = defineModel('title', { required: true })

// providing a type
const model4 = defineModel({ type: String })

// or use in ts
const model5 = defineModel<string>()

// default model with options, required removes possible undefined values
const model6 = defineModel<string>({ required: true })

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
```

> Context：[RFC#503](https://github.com/vuejs/rfcs/discussions/503)

### 4. v-bind 同名速记

```html
<!-- before -->
<img :id="id" :src="src" :alt="alt" />
<!-- after -->
<img :id :src :alt />
```

> Context：[PR#9451](https://github.com/vuejs/core/pull/9451)

### 5. watch支持once选项

现在，watch 支持一个新的 once 选项，它将使回调只触发一次：

```js
watch(
  () => state.count,
  () => {
    // do something
  },
  { once: true }
)
```

> Context：[PR#9034](https://github.com/vuejs/core/pull/9034)

## 二、删除的功能

1. `响应性语法糖` 在3.3中被标记为弃用，现在在3.4中被`删除`。由于该功能是实验性的，因此此更改不需要专业人员。希望继续使用该功能的用户可以通过[Vue Macros插件](https://vue-macros.dev/features/reactivity-transform.html)进行操作。

2. app.config.unwrapInjectedRef 已删除。它在3.3中被弃用并默认启用。在3.4中，不再可能禁用此行为。

3. 模板中的 @vnodeXXX 事件侦听器现在是编译器错误而不是弃用警告。使用 @vue:XXX 监听器代替。

4. v-is 指令已删除。它在3.3中被弃用。请改用带 [vue: 前缀的 is 属性](https://vuejs.org/api/built-in-special-attributes.html#is)。

## 三、其他改动

> 剩余改动🤪：https://blog.vuejs.org/posts/vue-3-4#improved-hydration-mismatch-errors
