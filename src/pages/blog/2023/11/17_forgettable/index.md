---
title: JS中易忘却好用的
meta:
  - name: description
    content: 记录下平常用的少，但关键时刻却又很好用的方法或特性等东西。
  - name: keywords
    content: Forgettable,Useful
---

<route lang="yaml">
meta:
  title: 易忘却好用的东西
  desc: 记录下平常用的少，但关键时刻却又很好用的方法或特性等东西，关键是ta们很容易被忘记🤪。
  keywords: [Forgettable,Useful]
  date: 2023-11-17 20:25:08
</route>

# 易忘却好用的东西

记录下平常用的少，但关键时刻却又很好用的方法或特性等东西，关键是ta们很容易被忘记🤪，方便可以直接查阅，后面会不断更新，因为写的时候可能也想不起来自己已经忘记了什么了😂。

## 1. Object.assign

`Object.assign(target, ...sources)`方法用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象`target`。

```js
const target = { a: 1 }

const source1 = { b: 2 }

const source2 = { c: 3 }

Object.assign(target, source1, source2)

console.log(target) // {a:1, b:2, c:3}
```

> 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性，如上面的例子中，如果`target`对象中有`b`属性，那么`source1`中的`b`属性会覆盖`target`中的`b`属性。

## 2. Object.keys

`Object.keys(object)`方法会返回一个由一个给定对象`object`的自身可枚举`属性（key）`组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。

```js
const obj = {
  a: 'somestring',
  b: 42,
  c: false
}

console.log(Object.keys(obj)) // ["a", "b", "c"]
```

## 3. Object.values

`Object.values(object)`方法会返回一个给定对象`object`自身的所有可枚举`属性值（value）`的数组，数组中属性值的排列顺序和正常循环遍历该对象时返回的顺序一致。

```js
const obj = {
  a: 'somestring',
  b: 42,
  c: false
}

console.log(Object.values(obj)) // ["somestring", 42, false]
```

## 4. Object.entries

`Object.entries(object)`方法会返回一个给定对象`object`自身可枚举`属性的键值对（key-value）`的数组，数组中属性键值对的排列顺序和正常循环遍历该对象时返回的顺序一致。

```js
const obj = {
  a: 'somestring',
  b: 42,
  c: false
}

console.log(Object.entries(obj)) // [["a", "somestring"], ["b", 42], ["c", false]]
```

## 5. Object.fromEntries

`Object.fromEntries(array)`方法会返回一个给定数组`array`中自身可枚举`属性的键值对（key-value）`组成的对象，数组中属性键值对的排列顺序和正常循环遍历该对象时返回的顺序一致。

```js
const arr = [
  ['a', 'somestring'],
  ['b', 42],
  ['c', false]
]

console.log(Object.fromEntries(arr)) // {a: "somestring", b: 42, c: false}
```

## 6. Array.prototype.flat

`Array.prototype.flat(depth)`方法会按照指定的`depth`深度，将一个数组`array`中的所有子数组的元素递归地连接到一个新数组中，并返回这个新数组，`depth`默认为`1`。

```js
const arr = [1, 2, [3, 4]]

console.log(arr.flat()) // [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]]

console.log(arr2.flat()) // [1, 2, 3, 4, [5, 6]]

console.log(arr2.flat(2)) // [1, 2, 3, 4, 5, 6]
```

## 7. Array.prototype.flatMap

`Array.prototype.flatMap(callback)`方法会首先使用映射函数`callback`映射每个元素，然后将结果压缩成一个新数组，`flatMap`方法只会将结果数组`array`中的子数组压缩一层，`flatMap`方法返回一个新数组，不改变原数组。

```js
const arr = [1, 2, 3, 4]

console.log(arr.map(x => [x * 2])) // [[2], [4], [6], [8]]

console.log(arr.flatMap(x => [x * 2])) // [2, 4, 6, 8]

console.log(arr.flatMap(x => [[x * 2]])) // [[2], [4], [6], [8]]
```

## 8. Array.prototype.reduce

`Array.prototype.reduce(callback, initialValue)`方法会对数组中的每个元素（从左到右）执行回调函数`callback`，将回调函数的返回值和当前元素作为下一次执行回调函数的参数，最后返回一个累计的值，`initialValue`是可选的，如果指定了`initialValue`，那么在第一次执行回调函数时，`initialValue`就是第一次执行回调函数的第一个参数，如果没有指定`initialValue`，那么第一次执行回调函数时，第一个参数就是数组中的第一个元素，第二个参数就是数组中的第二个元素。

```js
const arr = [1, 2, 3, 4]

console.log(arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
})) // 10

console.log(arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
}, 5)) // 15

console.log(arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
}, 0)) // 10

console.log(arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue
}, 1)) // 11
```

## 9. Array.prototype.fill

`Array.prototype.fill(value, start, end)`方法用一个固定值`value`填充一个数组`array`中从索引`start`到索引`end`结束的全部元素，`end`默认为`array.length`，`start`默认为`0`，`fill`方法返回修改后的数组，不改变原数组。

```js
const arr = [1, 2, 3, 4]

console.log(arr.fill(2)) // [2, 2, 2, 2]

console.log(arr.fill(3, 1)) // [2, 3, 3, 3]

console.log(arr.fill(4, 1, 2)) // [2, 4, 3, 3]

console.log(arr.fill(5, -2)) // [2, 4, 5, 5]

console.log(arr.fill(6, -3, -1)) // [2, 6, 6, 5]
```

## 10. Array.from

`Array.from(arrayLike, mapFn, thisArg)`方法从一个类似数组或可迭代对象`arrayLike`中创建一个新的数组，`mapFn`是可选的，如果指定了`mapFn`，那么在创建新数组时，会对`arrayLike`中的每个元素执行一次`mapFn`，`thisArg`是可选的，如果指定了`thisArg`，那么在执行`mapFn`时，`mapFn`中的`this`指向`thisArg`，`Array.from`方法返回一个新数组，不改变原数组。

```js
const arr = [1, 2, 3, 4]

console.log(Array.from(arr)) // [1, 2, 3, 4]

console.log(Array.from(arr, x => x * 2)) // [2, 4, 6, 8]

console.log(Array.from(arr, function (x) { return x * this }, 2)) // [2, 4, 6, 8]
```

如果`arrayLike`是一个字符串，那么`Array.from`方法会将字符串中的每个字符作为一个元素，放入新数组中。

```js
console.log(Array.from('foo')) // ["f", "o", "o"]
```

如果`arrayLike`是一个`Set`对象，那么`Array.from`方法会将`Set`对象中的每个元素作为一个元素，放入新数组中。

```js
const set = new Set([1, 2, 3, 4])

console.log(Array.from(set)) // [1, 2, 3, 4]
```

如果`arrayLike`是一个`Map`对象，那么`Array.from`方法会将`Map`对象中的每个键值对作为一个元素，放入新数组中。

```js
const map = new Map([[1, 2], [3, 4]])

console.log(Array.from(map)) // [[1, 2], [3, 4]]
```

如果`arrayLike`是一个类似数组的对象，那么`Array.from`方法会将`arrayLike`中的每个元素作为一个元素，放入新数组中。

```js
const obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

console.log(Array.from(obj)) // ["a", "b", "c"]
```

如果该对象只有`length`属性，那么返回的新数组中的每个元素都是`undefined`。

```js
const obj = {
  length: 3
}

console.log(Array.from(obj)) // [undefined, undefined, undefined]
```

此时可以搭配`fill`方法使用。

```js
const obj = {
  length: 3
}

console.log(Array.from(obj).fill(1)) // [1, 1, 1]
```

## 11. Object.groupBy

`Object.groupBy(array, key)`方法会将一个数组`array`中的元素按照指定的`key`属性进行分组，`Object.groupBy`方法返回一个对象，对象中的每个属性都是一个数组，数组中的元素都是`array`中的元素，`array`中的元素按照指定的`key`属性进行分组，如果`array`中的元素没有指定的`key`属性，那么该元素会被忽略。

```js
const arr = [
  { name: '张三', type: 'human' },
  { name: '小白', type: 'dog' },
  { name: '小黑', type: 'cat' },
  { name: '李四', type: 'human' },
  { name: '小黄', type: 'dog' },
]

console.log(Object.groupBy(arr, 'type'))
// {
//   human: [
//     {name:"张三",type:"human"},
//     {name:"李四",type:"human"}
//   ],
//   dog: [
//     {name:"小白",type:"dog"},
//     {name:"小黄",type:"dog"}
//   ],
//   cat: [
//     {name:"小黑",type:"cat"}
//   ]
// }
```
