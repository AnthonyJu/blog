---
title: 自定义ArcGIS Map Popup
meta:
  - name: description
    content: ArcGIS 自己的 Popup 组件无法满足工作中所需的样式，利用 Vue 的创建方式来实现 Popup 的完全自定义。
  - name: keywords
    content: ArcGIS, Custom, Popup
---

<route lang="yaml">
meta:
  title: 自定义 ArcGIS Map Popup
  desc: ArcGIS 自己的 Popup 组件无法满足工作中所需的样式，利用 Vue 的创建方式来实现 Popup 的完全自定义。
  keywords: [ArcGIS, Custom, Popup]
  date: 2023-06-28 15:02:23
</route>

# 自定义ArcGIS Map Popup

ArcGIS 自己的 Popup 组件样式太过单一，且使用WebComponent实现，无法满足或修改为工作中UI所设计的样式，利用 Vue 的 `createApp` 方法来实现 Popup 的完全自定义。

## 1. 手动开启 Popup

ArcGIS Map 的 Popup 组件可以手动开启的，开启方式如下：

```ts
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

onMounted(() => {
  // 创建 Map 实例
  const map = new Map({ basemap: 'topo-vector' })

  // 创建 MapView 实例
  const view = new MapView({
    container: 'viewDiv',
    map,
    center: [120.38, 36.06],
    zoom: 13
  })

  view.when(() => {
    // 禁用弹出窗口自动出现，并使用单击事件手动打开弹出窗口。
    view.popupEnabled = false
    view.on('click', (e) => {
      view.openPopup({
        location: e.mapPoint,
        title: 'Popup Title',
        content: 'Popup Content'
      })
    })
  })
})
```

## 2. 替换 content

使用 `createApp` 方法创建 Vue 实例，然后将实例的 `div` 元素作为 Popup 的 `content` 属性值，即可实现自定义的 Popup 组件。

- `createApp` 方法的第一个参数为 Vue 组件
- `createApp` 方法的第二个参数为 Vue 组件的 props，我们可以把需要的参数传递给自定义的 Vue 组件，如 MapView 的 `Popup` 实例，你也可以根据自己的需求，传递其他props。
- 在第二个参数中，也可以传递方法，但需要符合写法规范，需要以 `on` 开头，如 `onEventEmit`，这样在 Vue 组件中，就可以通过 `emit('eventEmit', arg)` 来触发该方法并进行传参，这样就实现了与父组件的交互。

父组件示例：

```ts
import { createApp } from 'vue'
import CustomPopup from './CustomPopup.vue'

const content = document.createElement('div')

createApp(CustomPopup, {
  view,
  onEventEmit: (arg: any) => {
    alert(arg)
  },
}).mount(content)

view.openPopup({ title: 'custom popup', content, location: e.mapPoint })
```

子组件示例：

```vue
<template>
  <div class="h-200px flex-col-center bg-#fff">
    <div mb-10>自定义子组件</div>
    <div>
      <ElButton type="primary" @click="onClick">
        触发父组件事件
      </ElButton>
      <ElButton type="primary" @click="view.closePopup()">
        关闭弹窗
      </ElButton>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type MapView from '@arcgis/core/views/MapView'

const props = defineProps<{
  view: MapView
}>()
const emit = defineEmits<{
  eventEmit: [arg: string]
}>()

console.log(props.view)

function onClick() {
  emit('eventEmit', '我是子组件传递的参数')
}
</script>
```

## 3. 注意事项

> 第一次打开 Popup 组件时，会比较慢，因为需要加载 Dom 的相关资源，后续打开就会很快了。你可以在触发开启 Popup 的地方，将鼠标样式改为`progress`，在 CustomPopup 组件中，当元素展示在视口中时，将鼠标样式改为`default`。

```ts
// 由于我使用了 VueUse 的 useElementVisibility 方法，所以这里的代码是这样的
// CustomPopup 组件的根元素 ref
const popupRef = ref()
const targetIsVisible = useElementVisibility(popupRef)
watch(targetIsVisible, (visible) => {
  if (visible) document.body.style.cursor = 'default'
})
```

> 当然你可能存在多个自定义的 Popup 组件，并且可能是开启另一后，再去直接开启另一个，这样就会出现鼠标样式不对的情况，所以触发开启 Popup 的地方加上这段代码，就可以解决这个问题：

```ts
// 把title当做id，通过title来判断是否是当前自定义的Popup组件
if (!view.popup.visible && view.popup.title !== 'custom popup') {
  document.body.style.cursor = 'progress'
}
```

> 本次使用的 ArcGIS 版本为4.27，如果你使用的版本不同，可能会出现一些问题，如：`view.openPopup` 无法打开 Popup，这时你可以使用 `view.popup.open` 来打开，其次使用 `view.popupEnabled` 属性可能会报错，这时你可以使用 `view.popup.autoOpenEnabled` 属性来代替，具体的属性和方法，可以查看：[ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html)。

## 4. 示例与源码

<CustomFrame route="/arcgis/costom-popup" />

