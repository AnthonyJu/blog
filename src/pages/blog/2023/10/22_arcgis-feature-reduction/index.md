---
title: ArcGIS 特征缩减（点聚合）
meta:
  - name: description
    content: 地图上的标记点很多时，当地图缩小时没有聚合功能，点位图标将聚到一起会非常难看，这时你只需要一个聚合功能，就可以解决这个问题。
  - name: keywords
    content: ArcGIS, Feature Reduction, 点聚合
---

<route lang="yaml">
meta:
  title: ArcGIS 特征缩减（点聚合）
  desc: 地图上的标记点很多时，当地图缩小时没有聚合功能，点位图标将聚到一起会非常难看，这时你只需要一个聚合功能，就可以解决这个问题。
  keywords: [ArcGIS, Feature Reduction, 点聚合]
  date: 2023-10-22 19:56:11
</route>

# ArcGIS 特征缩减（点聚合）

地图上的标记点很多时，当地图缩小时没有聚合功能，点位图标将聚到一起会非常难看，这时你只需要一个聚合功能，就可以解决这个问题。

可是这个`ArcGIS API for JS`文档中没有一个集中的介绍这个功能的，想要实现`点聚合`，需要多处文档配合进行实现，非常的坑，所以我在这里将这个功能集中介绍一下。

## 1. 使用FeatureLayer

在我们使用点位标注时，一般是使用`GraphicLayer`，但是它没有聚合功能，而[FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html)有个属性[featureReduction](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#featureReduction)，这个属性就是用来实现聚合的。

### 1.1 创建方式

但是使用`FeatureLayer`，是无法通过`add`方法添加点位的，我们需要使用`FeatureLayer`的`source`属性，来实现点位的添加，这也是`FeatureLayer`的第二种[创建方式](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#constructors-summary)：

```ts
const featureLayer = new FeatureLayer({
  objectIdField: 'ObjectID', // 每个特征的唯一值或标识符
  source: [], // 这里是点位数据
})
```

- [objectIdField](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#objectIdField)是必要的，不进行配置会报错的。

- [source](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#source)的项可以有两种创建方式：

```ts
const source1 = [{
  geometry: {
    type: 'point',
    x: 120.38,
    y: 36.06,
    spatialReference: {
      wkid: 4326,
    },
  },
  attributes: {
    // ...自定义点位相关的数据
  },
}]

// 是的geometry我们也可以通过 Point 来实现
const source2 = [{
  geometry: new Point({
    x: 120.38,
    y: 36.06,
    spatialReference: {
      wkid: 4326,
    },
  }),
  attributes: {
    // ...自定义点位相关的数据
  },
}]
```

### 1.2 点位Symbol

可以看到在上面的`source`中，我们并没有配置点位的`symbol`，但即使配置了，也不会生效，我们需要在`FeatureLayer`中配置[renderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#renderer)，这个`renderer`就是用来配置点位的样式的：

```ts
const featureLayer = new FeatureLayer({
  // ...其他属性
  renderer: new SimpleRenderer({
    symbol: new PictureMarkerSymbol({ // 这里是点位的样式
      url: Pic,
      width: '24px',
      height: '24px',
    }),
  }),
})
```

具体你想使用什么样的样式，就配置什么样的样式，这里就不多说了，你可以在[官方文档](https://developers.arcgis.com/javascript/latest/api-reference/)中找到相关支持`Point`的Simple相关类。

### 1.3 获取点位信息

在上面的`source`中，我们配置了点位的`attributes`，这个`attributes`就是点位的信息，一般来说我们都是通过点击点位来获取点位携带的附属信息，但此处需要额外配置一下：

```ts
const featureLayer = new FeatureLayer({
  // ...其他属性
  outFields: ['*'], // * 表示获取所有的属性
  fields: [ // 这里是点位的对应属性
    {
      name: 'name',
      alias: 'name',
      type: 'string',
    }
    // ...其他属性
  ],
})
```

- 这里的`outFields`代表获取所有的属性，如果你只想获取部分属性，可以配置为`['name', 'age']`，这样就只会获取`name`和`age`属性。

- 其次是[fields](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#fields)，这里是配置点位的属性，他需要与你在`source`中配置的`attributes`对应，如果你在`attributes`中配置了`name`属性，那么这里就需要配置`name`属性，否则获取不到。

## 2. 配置FeatureReduction

在创建`FeatureLayer`时，我们需要配置[featureReduction](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#featureReduction)属性，这个属性就是用来实现聚合的：

```ts
const featureLayer = new FeatureLayer({
  // ...其他属性
  featureReduction: {
    type: 'cluster',
    clusterRadius: '200px'
  }
})
```

- [type](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html#type)：聚合类型，对于`FeatureLayer`只能配置为`cluster`。
- [clusterRadius](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html#clusterRadius)：聚合半径，这里可以配置为`number`或者`string`，如果配置为`number`，那么就是以`pt`为单位，如果配置为`string`，那么就是以`px`或者`m`为单位，比如`200px`或者`200m`。

### 2.1 聚合样式

到了这里，我们就可以看到聚合的效果了，但是聚合的样式是跟你的点位样式一样的，导致无法区分聚合前和聚合后的点位，所以我们需要不同于定位的配置聚合后的样式：

```ts
const featureLayer = new FeatureLayer({
  // ...其他属性
  featureReduction: {
    type: 'cluster',
    clusterRadius: '200px',
    clusterMinSize: '24px', // 聚合后的最小样式
    clusterMaxSize: '60px', // 聚合后的最大样式
    symbol: new SimpleMarkerSymbol({
      color: [226, 119, 40],
      size: 84,
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    }),
  }
})
```

- [clusterMinSize](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html#clusterMinSize)：聚合图标的最小大小
- [clusterMaxSize](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html#clusterMaxSize)：聚合图标的最大大小

配置以上之后，我们就可以看到聚合图标会随着聚合的数量变化而大小变化了。

- [symbol](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html#symbol)：聚合图标的样式，这里的样式是`SimpleMarkerSymbol`，当然你也可以使用其他的样式，比如`PictureMarkerSymbol`。

### 2.2 聚合数量展示

在聚合图标上，我们通常需要一个数字，来展示聚合的数量，我们需要配置[labelingInfo](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureReductionCluster.html#labelingInfo)：

```ts
const featureLayer = new FeatureLayer({
  // ...其他属性
  featureReduction: {
    // ...其他属性
    labelingInfo: [{
      labelExpressionInfo: {
        expression: 'Text($feature.cluster_count, \'#,###\')', // 这里是聚合数量的表达式，当数量大于1000时，会以1,000的形式展示
      },
      symbol: {
        type: 'text',
        color: '#004a5d',
        font: {
          size: '24px',
        },
      },
      labelPlacement: 'center-center',
    }],
  }
})
```

- [labelExpressionInfo](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#labelExpressionInfo)：这里是配置聚合数量的表达式，这里的表达式是`Arcade`表达式，具体的表达式可以参考[官方文档](https://developers.arcgis.com/arcade/)。
- [symbol](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#symbol)：这里是配置聚合数量的样式，在2D地图使用`TextSymbol`即可。
- [labelPlacement](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#labelPlacement)：这里是配置聚合数量的位置，这里配置为`center-center`，表示居中显示。

### 2.3 聚合数量样式变化

我们可以发现上面的`labelingInfo`是一个数组，这是因为我们可以配置多个聚合数量的样式，比如我们可以配置[where](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#where)属性，使其一个聚合数量小于10的样式，一个聚合数量大于10小于100的样式，一个聚合数量大于100的样式：

```ts
const featureLayer = new FeatureLayer({
  // ...其他属性
  featureReduction: {
    // ...其他属性
    labelingInfo: [
      {
      // ...其他属性
        where: 'cluster_count < 10',
      },
      {
      // ...其他属性
        where: 'cluster_count >= 10 AND cluster_count < 100',
      },
      {
      // ...其他属性
        where: 'cluster_count >= 100',
      }
    ],
  }
})
```

## 3. 示例与源码

<CustomFrame route="/arcgis/feature-reduction" />
