---
title: JS 中的深拷贝与浅拷贝
meta:
  - name: description
    content: JS 中的深拷贝与浅拷贝的区别，以及实现与使用。
  - keywords: JS，DeepClone
---

<route lang="yaml">
meta:
  title: JS 中的深拷贝与浅拷贝
  desc: JS 中的深拷贝与浅拷贝的区别，以及实现与使用。
  keywords: [JS,DeepClone]
  date: 2023-07-15 18:13:09
</route>

# JS 中的深拷贝与浅拷贝

## 什么是深拷贝与浅拷贝

在 JavaScript 中，深拷贝和浅拷贝是两种不同的对象复制方式。浅拷贝只复制对象的引用，而深拷贝则会复制整个对象，包括对象的所有属性和嵌套对象。


## 深拷贝的实现

### JSON.parse(JSON.stringify())

用于将一个对象转换为 JSON 字符串，然后再将 JSON 字符串转换回对象。该方法可以实现深拷贝，因为它会复制整个对象，包括对象的所有属性和嵌套对象。例如：

```js
const obj1 = { a: 1, b: { c: 2 } }
const obj2 = JSON.parse(JSON.stringify(obj1))
console.log(obj2) // { a: 1, b: { c: 2 } }
console.log(obj1 === obj2) // false
```

但是，该方法也有一些缺点：

- 会忽略 undefined
- 会忽略 symbol
- 不能序列化函数
- 不能解决循环引用的对象

### 递归复制

递归复制是一种手动实现深拷贝的方法。该方法通过递归遍历对象的所有属性和嵌套对象，并将它们复制到一个新对象中。例如：

```js
function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = deepCopy(obj1)
console.log(obj2) // { a: 1, b: { c: 2 } }
console.log(obj1 === obj2) // false
```

### lodash实现深拷贝

lodash 是一个 JavaScript 实用工具库，提供了很多常用的工具函数。其中，`cloneDeep` 函数可以用于实现深拷贝：

```js
import cloneDeep from 'lodash/cloneDeep'

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = cloneDeep(obj1)
console.log(obj2) // { a: 1, b: { c: 2 } }
console.log(obj1 === obj2) // false
```

### 扩展运算符实现单层的深拷贝

扩展运算符可以用于复制数组和对象。但是，它只能复制对象的一层，因此它可以实现单层的深拷贝：

```js
const arr1 = [1, 2, 3]
const arr2 = [...arr1]
console.log(arr2) // [1, 2, 3]
console.log(arr1 === arr2) // false

const obj1 = { a: 1, b: 2 }
const obj2 = { ...obj1 }
console.log(obj2) // { a: 1, b: 2 }
console.log(obj1 === obj2) // false
```
