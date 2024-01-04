---
title: Vue 3.3 浪客剑心
meta:
  - name: description
    content: 此版本的重点是开发人员体验的改进，特别是TypeScript对SFC的使用。
  - name: keywords
    content: Vue3.3, TS, Script Setup
---

<route lang="yaml">
meta:
  title: Vue 3.3 浪客剑心
  desc: 此版本的重点是开发人员体验的改进，特别是TypeScript对SFC的使用。
  keywords: [Vue3.3, TS, Script Setup]
  date: 2023-06-20 12:57:53
</route>

# Vue 3.3 浪客剑心

此版本侧重于开发人员体验改进 - 特别是 TypeScript 的 SFC 使用。结合[Vue Language Tools](https://github.com/vuejs/language-tools/)（以前称为 Volar）的 1.6 版本，我们解决了将 Vue 与 TypeScript 一起使用时的许多长期存在的痛点`<script setup>`。

有关更改的完整列表，请参阅[GitHub 上的完整更改日志](https://github.com/vuejs/core/blob/main/CHANGELOG.md#330-2023-05-08)。

> 依赖关系更新，升级到 3.3 时，建议同时更新以下依赖项：
>
> - Volar / vue-tsc@^1.6.4
> - vite@^4.3.5
> - @vitejs/plugin-vue@^4.2.0
> - vue-loader@^17.1.0 （如果使用 webpack 或 vue-cli）

> 原文：https://blog.vuejs.org/posts/vue-3-3

## 一、`<script setup>` + TS DX改进

### 1. 支持类型导入和复杂类型

以前，`defineProps` `defineEmits` 的类型参数位置中使用的类型仅限于局部类型，并且仅支持类型文本和接口。这是因为Vue需要能够分析props接口上的属性，以便生成相应的运行时选项。

这个限制现在在3.3中得到了解决。编译器现在可以解析导入的类型，并支持有限的复杂类型集：

```vue
<script setup lang="ts">
import type { Props } from './foo'

// imported + intersection type
defineProps<Props & { extraProp?: string }>()
</script>
```

请注意，复杂类型支持是基于`AST`的，因此不是100%全面的。一些需要实际类型分析的复杂类型，例如不支持条件类型。可以对单个props的类型使用条件类型，但不能对整个props对象使用条件类型。

> 详细信息：[PR#8083](https://github.com/vuejs/core/pull/8083)

### 2. 泛型组件

使用 `<script setup>` 的组件现在可以通过 `generic` 属性接受泛型类型参数:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

`generic`的值与TypeScript中`<...>之间`的参数列表用法完全相同。例如，您可以使用多个参数、`extend约束`、默认类型和引用导入的类型：

```vue
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'

defineProps<{
  id: T
  list: U[]
}>()
</script>
```

此功能以前需要显式选择加入，但现在在最新版本的`volar/vue-tsc`中默认启用。

> 讨论：[RFC#436](https://github.com/vuejs/rfcs/discussions/436)<br />
> 相关：[generic defineComponent() - PR#7963](https://github.com/vuejs/core/pull/7963)

### 3. `defineEmits`

以前，`defineEmits`的类型参数仅支持调用签名语法：

```ts
// 之前
const emit = defineEmits<{
  (e: 'foo', id: number): void
  (e: 'bar', name: string, ...rest: any[]): void
}>()
```

该类型与`emit`的返回类型匹配，但编写起来有点冗长和笨拙。3.3引入了一种更符合人体工程学的声明发射的方式，类型为：

```ts
// 之后
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
```

在类型文字中，键是事件名称，值是指定附加参数的数组类型。虽然不是必需的，但是您可以使用带标签的元组元素来实现显式性，就像上面的示例一样。

仍然支持调用签名语法。

### 4. defineSlots 设置 slots 类型

新的`defineSlots`宏可以用来声明预期的插槽和它们各自的预期插槽属性：

```vue
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: { id: number }) => any
}>()
</script>
```

`defineSlots()`只接受一个类型参数，没有运行时参数。类型参数应该是一个类型字面量

- key 是 slot 名称
- value 是 slot 函数

`defineSlots`的返回值与 `useSlots` 返回的 slots 对象相同。

目前的一些限制：

- volar / vue-tsc中尚未实现所需的插槽检查。
- Slot 函数的返回类型目前是忽略的，是任何类型，但我们可能会在将来利用它进行 slot 内容检查。

除了在`<script setup>`中使用 defineSlots 定义 slots 类型，还能在 `defineComponent` 中的 slots 属性中定义。

也有相应的使用选项。这两个API都没有运行时含义，并且纯粹用作IDE和 `slots` `defineComponent` `vue-tsc`的类型提示。

> 详细信息：[PR#7982](https://github.com/vuejs/core/issues/7982)

## 二、实验性功能

### 1. reactive 解构

之前是 Reactivity Transform 提案的一部分（已被废弃），现在已被拆分为单独的功能。
该功能可以解构 props 并保持响应性，并提供了一种更符合人体工程学的方式来声明 props 的默认值：

```vue
<template>
  {{ msg }}
</template>

<script setup>
import { watchEffect } from 'vue'

const { msg = 'hello' } = defineProps(['msg'])

watchEffect(() => {
  // accessing `msg` in watchers and computed getters
  // tracks it as a dependency, just like accessing `props.msg`
  console.log(`msg is: ${msg}`)
})
</script>
```

此功能是实验性的，需要明确的选择加入。以 Vite 为例：

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    Vue({
      script: {
        propsDestructure: true
      },
    }),
  ]
}
```

> 详细信息：[RFC#502](https://github.com/vuejs/rfcs/discussions/502)

### 2. defineModel

以前，对于支持v-model双向绑定的组件，它需要:

1. 声明一个prop
2. 当打算更新prop时触发相应的事件： `update:propName`

```vue
<!-- 之前 -->
<template>
  <input :value="modelValue" @input="onInput">
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
console.log(props.modelValue)

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
```

3.3使用新`defineModel`宏简化了用法。宏自动注册一个prop，并返回一个ref：

```vue
<!-- 之后 -->
<template>
  <input v-model="modelValue">
</template>

<script setup>
const modelValue = defineModel()
console.log(modelValue.value)
</script>
```

```vue
<!-- 之后：父组件 -->
<template>
  <ChildCom v-model="msg" />
</template>

<script setup>
const msg = ref('hello')
</script>

<!-- 之后:子组件 -->
<template>
  <div @click="setMsg">
    {{value}}
  </div>
</template>

<script setup>
const msg = defineModel()

function setMsg() {
  msg.value = 'world'
}
</script>
```

此功能是实验性的，需要明确的选择加入。以 Vite 为例：

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    Vue({
      script: {
        defineModel: true
      },
    }),
  ]
}
```

> 详细信息：[RFC#503](https://github.com/vuejs/rfcs/discussions/503)

## 三、其他值得注意的功能

### 1. defineOptions

新的宏允许直接在`<script setup>`中声明组件选项，而不需要单独的块： `<script>`

```vue
<script setup>
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false,
})
</script>
```

### 2. toRef toValue 提供Getter支持

`toRef` 已得到增强，以支持将`values/getters/ref`规范化为ref：

```ts
// 等同于 ref(1)
toRef(1)
// 创建一个只读ref，该ref在.value访问上调用getters
toRef(() => props.foo)
// 按原样返回现有引用
toRef(existingRef)
```

调用 toRef 类似于`computed`，但如果 getter 没有昂贵的计算，toRef 会更高效；
toValue 则相反，将 values/getters/ref 标准化为 value：

```ts
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1
```

> 详情：[PR#7997](https://github.com/vuejs/core/pull/7997)

## 四、JSX 导入源支持

目前，Vue的类型自动注册全局JSX类型。这可能会导致与其他需要JSX类型推断的库（特别是React）一起使用的冲突。

从 3.3 开始，Vue 支持通过 TypeScript 的`jsxImportSource`选项指定 JSX 命名空间。这允许用户根据他们的用例选择全局或每个文件选择加入。

为了向后兼容，3.3 仍然全局注册 JSX 命名空间。我们计划在 3.4 中移除默认的全局注册。`jsxImportSource`如果您将 TSX 与 Vue 一起使用，则应在升级到 3.3 后向您添加`tsconfig.json`以避免在 3.4 中损坏。

## 五、维护基础设施改进

此版本建立在许多维护基础架构改进的基础上，使我们能够更快更有信心地移动：

- 通过将类型检查与汇总构建分离并从移动到`rollup-plugin-typescript2 ` `rollup-plugin-esbuild`，构建速度提高了10倍。
- 通过从Jest迁移到[Vitest](https://vitest.dev/)来实现更快的测试。
- 通过移动`@microsoft/api-extractor` `rollup-plugin-dts` 得到更快的类型生成。
- 在发布前，通过[ecosystem-ci-catches](https://github.com/vuejs/ecosystem-ci)回归的主要生态系统依赖者进行全面回归测试！
