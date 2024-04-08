---
title: JSDoc 的使用
meta:
  - name: description
    content: 如果你不想使用ts，但却又想有类型提示，不妨可以试试 JSDoc。
  - name: keywords
    content: JSDoc, ts, vue
---

<route lang="yaml">
meta:
  title: JSDoc 的使用
  desc: 如果你不想使用ts，但却又想有类型提示，不妨可以试试 JSDoc。
  keywords: [JSDoc, ts, vue]
  date: 2024-04-08 16:58:34
</route>

# 什么是 JSDoc

如果你不想使用ts，但却又想有类型提示，不妨可以试试`JSDoc`。

`JSDoc`是一种 JavaScript 文档注释规范，它允许开发者为 JavaScript 代码添加注释，以描述函数、变量、类等的用途、参数、返回值以及其他相关信息。

## JSDoc 注释

`JSDoc`注释以`/**`开头，以`*/`结尾，中间可以包含多行注释，也可以包含一些特殊的标签，如`@type`、`@param`、`@returns`等。

### 1、基础注释

```js
/**
 * @type {number}
 */
const num = 1

/**
 * @type {string}
 */
const str = 'hello'

/**
 * @type {boolean}
 */
const bool = true

/**
 * @type {Array<number>}
 */
const arr = [1, 2, 3]

/**
 * @type {number[]}
 */
const arr2 = [1, 2, 3]

/**
 * @type {string | number}
 */
const strOrNum = 'hello'
strOrNum = 1 // ok

/**
 * @type {object}
 */

const obj = {
  name: 'Tom',
  age: 18,
}

/**
 * @type {Function}
 */
function fn() {}

/**
 * @type {Promise<string>}
 */
const promise = new Promise((resolve) => {
  resolve('hello')
})

/**
 * @type {import('vue').Ref<number>}
 */
const ref = ref(1)

/** @type {HTMLElement} */
const myElement = document.querySelector(selector)
```

### 2、带参数函数注释

`@param`标签用于描述函数的参数，`@returns`标签用于描述函数的返回值。

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b
}
```

### 3、类注释

```js
/**
 * @class
 */
class Person {
  /**
   * @param {string} name
   * @param {number} age
   */
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name
  }
}

const person = new Person('Tom', 18)
```

### 4、对象注释

使用`@typedef`定义对象类型，`@property`定义对象属性，然后使用`@type`注释对象。

```js
// 自定义一个User类型
/**
 * @typedef {object} User
 * @property {string} name
 * @property {number} age
 */

/**
 * @type {User}
 */
const user = {
  name: 'Tom',
  age: 18,
}
```

如果你在其`.d.ts`文件中定义了类型，那么在`JSDoc`中可以使用`import`关键字引入类型，如果是全局类型，可以直接使用。

```js
/**
 * @type {import('./types').User}
 */
const user = {
  name: 'Tom',
  age: 18,
}

/**
 * @type {User}
 */
const user2 = {
  name: 'Tom',
  age: 18,
}
```

### 5、泛型注释

泛型使用`@template`标签。

```js
/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function identity(value) {
  return value
}
```

### 6、类型断言

```js
/**
 * @type {number ｜ string}
 */
const num = '1'

/**
 * @type {string}
 */
const str = /** @type {string} */ (num)
```

### 7、实用类型

TypeScript提供了一组预定义的实用类型，JSDoc也可以使用这些实用类型。

```js
// Record：创建一个由指定类型的属性组成的对象
/**
 * @type {Record<string, number>}
 */
const obj = {
  a: 1,
  b: 2,
}

// Partial：使所有属性变为可选
/**
 * @type {Partial<{name: string, age: number}>}
 */
const user = {
  name: 'Tom',
}

// Required：使所有属性变为必选
/**
 * @type {Required<{name?: string, age: number}>}
 */
const user = {
  name: 'Tom',
  age: 18,
}

// Omit：忽略部分属性，创建新类型
/**
 * @type {Omit<{name: string, age: number}, 'name'>}
 */
const user = {
  age: 18,
}

// Pick：选取部分属性，创建新类型
/**
 * @type {Pick<{name: string, age: number}, 'name'>}
 */
const user = {
  name: 'Tom',
}
```

> 更多TS工具类型可以查看[这里](https://www.typescriptlang.org/docs/handbook/utility-types.html)。

### 8、类型别名

```js
/**
 * @typedef {string | number} StringOrNumber
 */

/**
 * @type {StringOrNumber}
 */
const strOrNum = 'hello'

/**
 * @type {StringOrNumber}
 */
const strOrNum2 = 1

/** @typedef {{ name: string; age: number }} User */

/** @type {User} */
const user = {
  name: 'Tom',
  age: 18,
}
```

### 9、枚举

```js
/**
 * @enum {number}
 */
const Color = {
  Red: 0,
  Green: 1,
  Blue: 2,
}

/**
 * @type {Color}
 */
const color = Color.Red
```

## config 配置

在`jsconfig.json`中配置`checkJs`为`true`，可以开启`JSDoc`类型检查。

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

如果你使用的是`tsconfig.json`，则还要配置`allowJs`为`true`。

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

## JSDoc 小结

- @type 用于定义变量的类型。
- @typedef 用于定义类型别名。
- @property 或 @prop 用于定义对象的属性。
- @template 用于定义泛型。
- @enum 用于定义枚举。
- @param 用于定义函数的参数。
- @returns 或 @return 用于定义函数的返回类型。
- @class 用于定义类。
- @example 用于定义示例。

## .d.ts 文件

如果你不想在代码中写注释，可以将类型定义放在`.d.ts`文件中。

```ts
// types.d.ts
interface User {
  name: string
  age: number
}
```

然后在代码中使用。

```js
/**
 * @type {import('./types').User}
 */
const user = {
  name: 'Tom',
  age: 18,
}
```

三斜杠指令`/// <reference path="./types.d.ts" />`也可以引入类型定义文件。

```js
/// <reference path="./types.d.ts" />

/**
 * @type {User}
 */
const user = {
  name: 'Tom',
  age: 18,
}
```

## 参考文档

- [JSDoc](https://jsdoc.app/)
- [JSDoc 中文](https://jsdoc.bootcss.com/)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
