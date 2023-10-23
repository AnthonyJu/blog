---
title: ArcGIS for JS 进阶使用
meta:
  - name: description
    content: 在 ArcGIS for JS 中的特殊使用，与高级用法
  - name: keywords
    content: ArcGIS, Advanced Usage
---

<route lang="yaml">
meta:
  title: ArcGIS for JS 进阶使用
  desc: 在 ArcGIS for JS 中的特殊使用，与高级用法
  keywords: [ArcGIS, Advanced Usage]
  date: 2023-09-10 10:27:24
</route>

# ArcGIS for JS 进阶使用

## 1. 自定义地图底图

```ts
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Basemap from '@arcgis/core/Basemap'
import BaseTileLayer from '@arcgis/core/layers/BaseTileLayer'

// 自定义底图
const TintLayer = new BaseTileLayer({
  // @ts-expect-error 参数不匹配
  getTileUrl(level: any, row: any, col: any) {
    return `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}&tk=你的密钥`
  },
})
// 创建 Basemap 实例
const mapBaseMap = new Basemap({ baseLayers: [TintLayer] })
// 创建 Map 实例
const map = new Map({ basemap: mapBaseMap })

// 创建 MapView 实例
const view = new MapView({
  container: 'viewDiv',
  map,
  center: [120.38, 36.06],
  zoom: 13,

})
```
