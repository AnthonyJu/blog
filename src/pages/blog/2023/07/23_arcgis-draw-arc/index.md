---
title: ArcGIS for JS 绘制 圆弧
meta:
  - name: description
    content: ArcGIS for JS 中并未提供绘制圆弧或是扇形的API，但在开发过程中又确实需要，在一番研究后找到了合适的方法生成圆弧。
  - name: keywords
    content: ArcGIS, Draw, Arc
---

<route lang="yaml">
meta:
  title: ArcGIS for JS 绘制 圆弧
  desc: ArcGIS for JS 中并未提供绘制圆弧或是扇形的API，但在开发过程中又确实需要，在一番研究后找到了合适的方法生成圆弧。
  keywords: [ArcGIS,Draw,Arc]
  date: 2023-07-23 19:27:52
</route>

# ArcGIS for JS 绘制 圆弧

ArcGIS for JS 中并未提供绘制圆弧或是扇形的API，但在开发过程中又确实需要，在一番研究后找到了合适的方法生成圆弧。

## 1. 通过Circle生成圆弧

通过绘制 `Circle` 时，增加 `numberOfPoints` 参数，可以控制圆弧的精度，从而达到绘制圆弧的目的。

```js
// 创建一个circle，并规定生成圆的点数
const circle = new Circle({
  center: new Point({
    longitude: 120.38,
    latitude: 36.06,
  }),
  geodesic: true,
  radius: 2000,
  numberOfPoints: 360,
})
```

这样生成的圆，正好是`360`个点，也就是说，每隔`1度`生成一个点，圆弧无非是圆上的一部分，所以，我们只需要取出圆上的一部分点即可。

```js
// 获取rings
const rings = circle.rings[0]

// 模拟圆弧其角度
const startAngle = 20
const endAngle = 80

// 生成圆弧的rings
const arcRings = [[...rings.slice(startAngle, endAngle + 1), [120.38, 36.06]]]
```

这样，我们就得到了圆弧的 `rings`，接下来，就可以通过 `Polygon` 生成圆弧了。

```js
// 创建一个graphic
const graphic = new Graphic({
  geometry: new Polygon({
    rings: arcRings,
  }),
  symbol: new SimpleFillSymbol({
    color: [255, 0, 0, 0.5],
    outline: {
      color: [255, 0, 0, 0.5],
      width: 2,
    },
  }),
})

// 添加扇形到地图
view.graphics.add(graphic)
```

### 特殊情况

起始角度较大，以至于结束角度大于了360度（或者说是结束角度较小，扇形朝上时），这时取点可能需要考虑分段取点，其实我们可以通过双倍取 `Circle` 的 `rings`，然后取出我们需要的部分即可：

```js
// 获取rings
const rings = [...circle.rings[0], ...circle.rings[0]]

// 模拟圆弧其角度
const startAngle = 320
const endAngle = 50

// 生成圆弧的rings
const arcRings = [[...rings.slice(startAngle, endAngle + 1), [120.38, 36.06]]]
```

### 示例与源码

<CustomFrame route="/arcgis/draw-arc-by-circle" />

## 2. 通过自定义方法生成圆弧

自定义方法, 根据中心经纬度, 半径, 起始角度, 结束角度, 生成圆弧的方法如下:

```ts
/**
 *  生成圆弧的 rings
 * @param startAngle 开始角度
 * @param endAngle 结束角度
 * @param radius 半径
 * @param center 圆心
 */
function generateArc(
  startAngle: number,
  endAngle: number,
  radius: number,
  center: [number, number]
) {
  const pointNum: number = 100
  const points: [number, number][] = []
  let sin: number, cos: number, x: number, y: number, angle: number
  for (let i: number = 0; i <= pointNum; i++) {
    angle = startAngle + ((endAngle - startAngle) * i) / pointNum
    sin = Math.sin((angle * Math.PI) / 180)
    cos = Math.cos((angle * Math.PI) / 180)
    x = center[0] + radius * sin
    y = center[1] + radius * cos
    points.push([x, y])
  }
  return [points]
}

// 示例用法
const arcRings = generateArc(0, 90, 1000, [120.38, 36.06])

// 创建一个graphic
const graphic = new Graphic({
  geometry: new Polygon({
    rings: arcRings,
  }),
  symbol: new SimpleFillSymbol({
    color: [255, 0, 0, 0.5],
    outline: {
      color: [255, 0, 0, 0.5],
      width: 2,
    },
  }),
})

// 添加扇形到地图
view.graphics.add(graphic)
```

### 注意事项
>  - 生成的圆弧的点数越多，圆弧越平滑，但是性能越差，所以需要根据实际情况进行取舍。
>  - 在正常创建的地图中，一般是`3857`也就是`102100`坐标系，改方法生成的圆弧是在`4326`坐标系下，因此其展示的时候为`椭圆弧`，你需要在创建地图时，指定坐标系为`4326`，但是一般地图均是在`102100`坐标系下，所以这种方法一般不适用于正常的地图，但是如果你的地图是在`4326`坐标系下，那么这种方法就可以使用了。

### 示例与源码

<CustomFrame route="/arcgis/draw-arc-custom" />

