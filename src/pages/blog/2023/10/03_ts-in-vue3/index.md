---
title: TS 在 Vue3 中的使用
meta:
  - name: description
    content: TS 配合 Vue3 的 setup 语法糖的类型定义，及一些第三方插件的TS类型定义。
  - name: keywords
    content: Vue3, TS, Setup
---

<route lang="yaml">
meta:
  title: TS 在 Vue3 中的使用
  desc: TS 配合 Vue3 的 setup 语法糖的类型定义，及一些第三方插件的TS类型定义。
  keywords: [Vue3, TS, Setup]
  date: 2023-10-03 21:13:15
</route>

# TS 在 Vue3 中的使用

TS配合Vue3的setup语法糖的类型定义，及一些第三方插件的TS类型定义，以下示例代码在`unplugin-auto-import`插件的帮助下，可以自动导入，无需手动导入。

## 一、setup 中的 TS 类型定义

### 1. props 类型标注

定义`props`时可以通过运行时声明或是类型声明进行，配合`<script setup>`语法糖，推荐使用基于类型的声明。

通过泛型参数来定义 props 的类型：

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
  oth: YourType
}>()
</script>
```

也可以将 props 的类型移入一个单独的接口中：

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

> 语法限制
> 在 3.2 及以下版本中，`defineProps()`的泛型类型参数仅限于类型文字或对本地接口的引用。

当使用基于类型的声明时，失去了为 props 声明默认值的能力。这可以通过`withDefaults`编译器宏解决：

```vue
<script setup lang="ts">
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
</script>
```

### 2. emits 类型标注

在`<script setup>`中，`emit`函数的类型标注也可以通过运行时声明或是类型声明进行：

运行时声明：

```vue
<script setup lang="ts">
const emit = defineEmits(['change', 'update'])
</script>
```

类型声明：

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

如果你使用的是vue3.3+，这里有更简洁的语法：

```vue
<script setup lang="ts">
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

### 3. ref() 类型标注

ref 会根据初始化时的值推导其类型：

```ts
// 推导出的类型：Ref<number>
const year = ref(2020)

// TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为：

```ts
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```

有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个类型：

```ts
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！
```

> 个人觉得还是使用泛型参数更简洁一些。

如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 undefined 的联合类型：

```ts
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()
```

### 4. reactive() 类型标注

`reactive()`也会隐式地从它的参数中推导类型：

```ts
// 推导得到的类型：{ title: string }
const book = reactive({ title: 'TS在Vue3中的使用' })
```

要显式地标注一个 reactive 变量的类型，我们可以使用接口：

```ts
interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'TS在Vue3中的使用' })
```

> 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。

### 5. computed() 类型标注

`computed()`会自动从其计算函数的返回值上推导出类型：

```ts
const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

> 由于 computed() 的是必须返回一个值，所以它的类型推导会比较准确，一般不需要显式地标注类型。

当然也可以通过泛型参数显式指定类型：

```ts
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```

### 6. provide / inject 类型标注

`provide`和`inject`通常会在不同的组件中运行。要正确地为注入的值标记类型，Vue 提供了一个`InjectionKey`接口，它是一个继承自 Symbol 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：

```ts
import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol('key') as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined
```

> 建议将注入 key 的类型放在一个单独的文件中，这样它就可以被多个组件导入。

当使用字符串注入`key`时，注入值的类型是`unknown`，需要通过泛型参数显式声明：

```ts
const foo = inject<string>('foo') // 类型：string | undefined
```

注意注入的值仍然可以是`undefined`，因为无法保证提供者一定会在运行时`provide`这个值。

当提供了一个默认值后，这个`undefined`类型就可以被移除：

```ts
const foo = inject<string>('foo', 'bar') // 类型：string
```

当然如果你确定该值将始终被提供，则还可以强制转换该值：

```ts
const foo = inject<string>('foo') as string // 类型：string
```

### 7. 模板引用 类型标注

模板引用需要通过一个显式指定的泛型参数和一个初始值`null`来创建：

```vue
<template>
  <div ref="div" />
  <input ref="input">
</template>

<script setup lang="ts">
const div = ref<HTMLDivElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
</script>
```

如果你的ref写在了`子组件`上，你想获取子组件的类型，以便调用它公开的方法或属性，我们首先需要通过`typeof`得到其类型，再使用 TypeScript 内置的`InstanceType`工具类型来获取其实例类型：

```vue
<!-- Parent.vue -->
<script setup lang="ts">
import Child from './Child.vue'

const modal = ref<InstanceType<typeof Child> | null>(null)

function openModal() {
  modal.value?.open()
}
</script>
```

### 8. 事件处理函数 类型标注

在处理原生`DOM`事件时，应该为我们传递给事件处理函数的参数正确地标注类型：

```vue
<template>
  <input type="text" @change="handleChange">
</template>

<script setup lang="ts">
function handleChange(event) {
  // `event` 隐式地标注为 `any` 类型
  console.log(event.target.value)
}
</script>
```

没有类型标注时，这个`event`参数会隐式地标注为`any`类型。这也会在`tsconfig.json`中配置了`"strict": true`或 `"noImplicitAny": true`时报出一个 TS 错误。因此，建议显式地为事件处理函数的参数标注类型。此外，你在访问`event`上的属性时可能需要使用`类型断言`：

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## 二、第三方插件的 TS 类型定义

### 1. ArcGIS API for JS

以创建`Graphic`为例：

```ts
import Graphic from '@arcgis/core/Graphic'

const graphic = new Graphic({
  geometry: {
    type: 'point', // => TS Error: 不能将类型“{ type: string; longitude: number; latitude: number; }”分配给类型“GeometryProperties”。对象字面量只能指定已知属性，并且“type”不在类型“GeometryProperties”中。
    longitude: 120.123,
    latitude: 36.456
  },
  symbol: {
    type: 'simple-marker', // 类似的错误
    color: 'red'
  }
})
```

以上添加到地图上是没有问题的，官方的文档也是这样写的，因为都是JS，但是在TS中，我们需要为`geometry`和`symbol`指定类型，我们只需要实例化对应的类即可：

```ts
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'

const graphic = new Graphic({
  geometry: new Point({
    longitude: 120.123,
    latitude: 36.456
  }),
  symbol: new SimpleMarkerSymbol({
    color: 'red'
  })
})
```

> 适用于所有的`ArcGIS API for JS`中类似的情况。

### 2. ECharts + Vue-ECharts

以下面官方的Vue3示例为例：

```vue
<template>
  <VChart class="chart" :option="option" />
</template>

<script setup>
import { provide, ref } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'

// 引入 echarts 核心模块中的注册方法use
import { use } from 'echarts/core'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 图表后缀都为 Chart
import { PieChart } from 'echarts/charts'

// 引入组件，组件后缀都为 Component
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

provide(THEME_KEY, 'dark')

const option = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
```

在写`option`时会没有任何提示，`option`的类型定义我们需要自己从`echarts`中导入：

```ts
// 用来组合Option 类型的 ComposeOption
import type { ComposeOption } from 'echarts/core'

// 图表系列类型的定义后缀都为 SeriesOption
import type { PieSeriesOption } from 'echarts/charts'

// 组件类型的定义后缀都为 ComponentOption
import type {
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>

// 使用
const options = ref<EChartsOption>({
  // ...现在就有了提示
})
```

> ECharts文档：https://echarts.apache.org/zh/index.html<br/>
> Vue-ECharts文档：https://github.com/ecomfe/vue-echarts#readme

### 3. Axios

```ts
import axios from 'axios'
import type { AxiosResponse } from 'axios'

// 定义返回数据的类型，一般是后端返回的数据结构，比较通用，可以放在一个单独的文件中
interface Res<T> {
  code: number
  data: T
  // ...其他字段
}

// 根据具体接口定义返回数据的类型
interface ReturnData {
  id: number
  age: string
  parent: string
  // ...其他字段
}

// 接口参数类型
interface YourData {
  id: number
  name: string
  // ...其他字段
}

// 请求函数通常放在单独文件中，使用时导入，以 post 请求为例
async function fetchData(data: YourData) {
  const res = await axios<Res<ReturnData>>({
    method: 'post',
    url: 'your url',
    data,
  })

  // 如果只需要后端返回的数据，可以直接 return res.data
  // 这样下面 then 中的res的类型就是 Res<ReturnData>
  return res
}

// ts会自动推导出返回数据的类型
const data: YourData = { id: 1, name: 'Ju Peng' }
fetchData(data).then((res) => {
  console.log(res.data) // res.data 的类型为 ResData
  console.log(res.data.data) // data.data 的类型为 ReturnData
})
```

> Axios文档：https://www.axios-http.cn

### 4. VueRequest

`VueRequest`一般与`axios`配合使用，你只需要定义好axios请求函数，然后使用`useRequest`即可，ts会自动推导出返回数据的类型：

```ts
import { useRequest } from 'vue-request'

import { fetchData } from './api' // 使用上面 axios 定义的请求函数

const { data, run } = useRequest(fetchData, {
  manual: true,
  defaultParams: { id: 1, name: 'Ju Peng' }, // 默认参数，必须是 YourData 类型，否则会报错
})

run({ id: 1, name: 'Ju Peng' }) // 调用传参数，必须是 YourData 类型，否则会报错

// data 的类型为 Ref<AxiosResponse<Res<ReturnData>>>
console.log(data.value.data) // data.value.data 的类型为 ResData
console.log(data.value.data.data) // data.value.data.data 的类型为 ReturnData
```

> VueRequest文档：https://www.attojs.com/
