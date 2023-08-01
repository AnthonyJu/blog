---
title: 自定义ArcGIS Map Popup
meta:
  - name: description
    content: ArcGIS 自己的 Popup 组件无法满足工作中所需的样式，利用 Vue 的创建方式来实现 Popup 的完全自定义。
  - keywords: ArcGIS, Custom, Popup
---

<route lang="yaml">
meta:
  title: 自定义ArcGIS Map Popup
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

  // 创建 Map 实例
  const map = new Map({ basemap: 'topo-vector' })

  // 创建 MapView 实例
  const view = new MapView({
    container: 'viewDiv',
    map,
    center: [120.38, 36.06],
    zoom: 13
  })

  // 手动开启 Popup 组件，监听底图点击事件时，如果不开启autoOpenEnabled，鼠标左键是无法触发 Popup 组件的
  view.when(() => {
    view.popup.autoOpenEnabled = true

    view.on('click', (e) => {
      view.popup.open({
        location: e.mapPoint,
        title: 'Popup Title',
        content: 'Popup Content'
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
  popup: view.popup,
  onEventEmit: (arg: any) => {
    console.log(arg)
  },
}).mount(div)

view.popup.open({ content, location: e.mapPoint })
```

子组件示例：

```vue
<template>
  <div class="h-400px bg-blue">
    <el-button type="primary" @click="onClick">
      EventEmit
    </el-button>
    <el-button type="primary" size="default" @click="popup.close()">
      Close Popup
    </el-button>
  </div>
</template>

<script setup lang='ts'>
import type Popup from '@arcgis/core/widgets/Popup'

const props = defineProps<{
  popup: Popup
}>()
const emit = defineEmits<{
  eventEmit: [arg: string]
}>()

function onClick() {
  emit('eventEmit', 'arg from child')
}
</script>

<style lang="scss">
.esri-popup {
  box-shadow: none;

  .esri-popup__main-container {
    background-color: transparent;

    .esri-popup__header,
    .esri-popup__footer {
      display: none;
    }

    .esri-popup__content {
      margin: 0;

      --calcite-ui-background: transparent;
      --calcite-ui-foreground-1: transparent;

      .esri-widget {
        background-color: transparent;
      }
    }
  }
}
</style>
```

## 3. 注意事项

> 第一次打开 Popup 组件时，会比较慢，因为需要加载 Dom 的相关资源，后续打开就会很快了。你可以在触发开启 Popup 的地方，将鼠标样式改为`progress`，在 CustomPopup 组件中，当元素展示在视口中时，将鼠标样式改为`default`。

```ts
// 由于我是用了 VueUse 的 useElementVisibility 方法，所以这里的代码是这样的
const popupRef = ref() // CustomPopup 组件的根元素 ref
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

## 4. 示例

<!-- TODO: 示例 -->

