---
title: ES7-ES13新特性
---

<route lang="yaml">
meta:
  title: ES7-ES13新特性
  keywords: [ES6-ES13, New Features]
  date: 2023-06-18 19:47:21
</route>

# ES7-ES13新特性

## 一、 ES7新特性

### 1. 求幂运算符

```javascript
3 ** 2 === 3 ** 2 // 9
```

### 2.数组的includes方法

```javascript
[1, 2, NaN].includes(NaN) // true
  [1, 2, NaN].indexOf(NaN) // -1
```

> 如果仅仅查找数据是否在数组中，建议使用includes，如果是查找数据的索引位置，建议使用indexOf更好一些

## 二、 ES8新特性

### 1. async和await

#### 1-1.Async

async 函数，使得异步操作变得更加方便。

- 更好的语义。
- 返回值是 Promise。

```javascript
async function test() {

}
test()
```

#### 1-2.Await

`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```javascript
async function test() {
  const res1 = await ajax('http://localhost:3000/blog1')
  const res2 = await ajax('http://localhost:3000/blog2')
  return res2
}

test().then((res) => {
  console.log('返回结果', res)
}).catch((err) => {
  console.log('err', err)
})
```

#### 1-3.错误处理

```javascript
try {
  const res1 = await ajax('http://localhost:3000/blog1')
  const res2 = await ajax('http://localhost:3000/blog2')
}
catch (err) {
  console.log('err', err)
}
```

### 2.对象方法扩展

```javascript
const obj = {
  name: 'kerwin',
  age: 100
}
console.log(Object.values(obj))
```

<img src="@/assets/note/javascript/image-20220920154527417.png" alt="image-20220920154527417"  />

```javascript
const obj = {
  name: 'kerwin',
  age: 100
}
console.log(Object.entries(obj))
```

<img src="@/assets/note/javascript/image-20220920154622530.png" alt="image-20220920154622530"  />

```javascript
const obj = {
  name: 'kerwin',
  age: 100
}
console.log(Object.getOwnPropertyDescriptors(obj))
```

<img src="@/assets/note/javascript/image-20220920155143538.png" alt="image-20220920155143538"  />

**克隆对象**

```javascript
const obj1 = {
  name: 'Kerwin',
  age: 100,
  location: {
    provice: '辽宁',
    city: '大连'
  },
  // 只设置city，防止破坏province
  get city() {
    return this.location.city
  },
  set city(value) {
    this.location.city = value
  },
  set nameset(value) {
    this.name = value.substring(0, 1).toUpperCase() + value.substring(1)
  },
  get nameset() {
    return this.name
  }
}
console.log(Object.getOwnPropertyDescriptors(obj1))
const obj2 = {}

// Object.assign(obj2,obj1)//无法克隆 get set方法
Object.defineProperties(obj2, Object.getOwnPropertyDescriptors(obj1))
```

### 3. 字符串填充

> padStart()、padEnd()方法可以使得字符串达到固定长度，有两个参数，字符串目标长度和填充内容。

```javascript
const str = 'kerwin'

console.log(str.padStart(10, 'x'))// xxxxkerwin
console.log(str.padEnd(10, 'x'))// kerwinxxxx
console.log(str.padStart(5, 'x'))// kerwin
console.log(str.padEnd(5, 'x'))// kerwin
```

### 4. 函数参数的末尾加逗号

```javascript
function test(
  a,
  b,
  c,
) {
  console.log(a, b)
}
test(
  1,
  2,
  3,
)
```

> 『末尾逗号』在添加新的参数、属性、元素时是有用的，你可以直接新加一行而不必给上一行再补充一个逗号，这样使版本控制工具的修改记录也更加整洁


## 三、ES9新特性

### 1. 对象的剩余参数与扩展运算符

#### 1-1 对象的剩余参数

```javascript
const obj = {
  name: 'kerwin',
  age: 100,
  location: 'dalian'
}

const { name, ...other } = obj
console.log(name) // kerwin
console.log(other) // {age: 100, location: 'dalian'}
```

#### 1-2 对象的扩展运算符

```javascript
const obj1 = {
  name: 'kerwin'
}

const obj2 = {
  age: 100
}

console.log({ ...obj1, ...obj2 })
```

### 2.正则表达式命名捕获组

JS正则表达式可以返回一个匹配的对象, 一个包含匹配字符串的类数组, 比如: 以 YYYY-MM-DD的格式解析日期，

这样的代码可读性很差, 并且在改变正则表达式的结构的时候很有可能就会改变匹配对象的索引

ES9允许使用命名捕获 `?<name>` , 在打开捕获括号后立即命名

```javascript
const str = '今天是2022-10-10'
const reg = /([0-9]{4})-([0-9]{2})-([0-9]{2})/g

const res1 = reg.exec(str)
console.log(res1)
```

<img src="@/assets/note/javascript/image-20220921110518183.png" />

```javascript
const str = '今天是2022-10-10'
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g

const res1 = reg.exec(str)
console.log(res1)
```

<img src="@/assets/note/javascript/image-20220921110644896.png" />

### 3. Promise.finally()

> 无论是成功还是失败, 都运行同样的代码, 比如隐藏对话框, 关闭数据连接

```javascript
function ajax() {
  return new Promise((resolve, reject) => {
    reject(1111)
  })
}
// showloading
ajax().then((res) => {

}).catch((err) => {

}).finally(() => {
  // hideloading
  console.log('finally')
})
```

### 4. 异步遍历器

#### 4-1 同步遍历器的问题

```javascript
function* fn() {
  yield 1111
  yield 2222

}
const syncI = fn()
console.log(syncI.next())
console.log(syncI.next())
console.log(syncI.next())
```

<img src="@/assets/note/javascript/image-20220921132030973.png" />


```javascript
function* fn() {
  yield new Promise(resolve => resolve('1111'))
  yield new Promise(resolve => resolve('2222'))

}
const syncI = fn()
syncI.next().value.then((res) => { console.log(res) })
syncI.next().value.then((res) => { console.log(res) })
```

<img src="@/assets/note/javascript/image-20220921132403676.png" />

> `value`属性的返回值是一个 Promise 对象，用来放置异步操作。但是这样写很麻烦，不太符合直觉，语义也比较绕。



#### 4-2 异步遍历器生成函数

> Generator 函数返回一个同步遍历器，异步 Generator 函数的作用，是返回一个异步遍历器对象。在语法上，异步 Generator 函数就是async函数与 Generator 函数的结合。

```javascript
async function* fn() {
  yield new Promise(resolve => resolve('1111'))
  yield new Promise(resolve => resolve('2222'))

}
const asyncI = fn()

asyncI.next().then((res) => {
  console.log(res)
  return asyncI.next()
}).then((res) => {
  console.log(res)
  return asyncI.next()
})
  .then((res) => {
    console.log(res)
  })
```

<img src="@/assets/note/javascript/image-20220921132528997.png" />

#### 4-3 for await of

> `for...of`循环用于遍历同步的 Iterator 接口。新引入的`for await...of`循环，则是用于遍历异步的 Iterator 接口。

```javascript
async function test() {
  for await (const i of asyncI) {
    console.log(i)
  }
}
test()
```

#### 4-4 案例改造

```javascript
function timer(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(t)
    }, t)
  })
}

async function* fn() {
  yield timer(1000)// 任务1
  yield timer(2000)// 任务2
  yield timer(3000)// 任务3
}

// 使用一下 for await ...of
async function fn1() {
  for await (const val of fn()) {
    console.log('start', Date.now())
    console.log(val)
    console.log('end', Date.now())
  }
}
fn1()
```

#### 4-5 nodejs用法

```javascript
// 传统写法
function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  )
  readStream.on('data', (chunk) => {
    console.log(`>>> ${chunk}`)
  })
  readStream.on('end', () => {
    console.log('### DONE ###')
  })
}

// 异步遍历器写法
async function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  )

  for await (const chunk of readStream) {
    console.log(`>>> ${chunk}`)
  }
  console.log('### DONE ###')
}
```

## 四、ES10新特性

### 1. Object.fromEntries

> Object.fromEntries()方法允许你轻松地将键值对列表转换为对象

```javascript
const arr = [['name', 'kerwin'], ['age', 100]]
console.log(Object.fromEntries(arr))// {name: 'kerwin', age: 100}

const m = new Map()
m.set('name', 'tiechui')
m.set('age', 18)
console.log(Object.fromEntries(m))
```

**用处**

```javascript
const str = 'name=kerwin&age=100'

const searchParams = new URLSearchParams(str)
console.log(Object.fromEntries(searchParams))// {name: 'kerwin', age: '100'}
```

### 2. trimStart() and trimEnd()

> trimStart()和trimEnd()方法在实现与trimLeft()和trimRight()相同。

```javascript
const str = '   kerwin    '
console.log(`|${str.trimStart(str)}|`)
console.log(`|${str.trimEnd(str)}|`)
console.log(`|${str.trimLeft(str)}|`)
console.log(`|${str.trimRight(str)}|`)
```

### 3. Symbol 对象的 description 属性

> 为Symbol对象添加了只读属性 description ，该对象返回包含Symbol描述的字符串。

```javascript
const s = Symbol('kerwin')
console.log(s.description) // kerwin
```

### 4. 可选的 catch

```javascript
const pro1 = new Promise((resolve, reject) => {
  // 执行器函数
  setTimeout(() => {
    resolve('成功的结果')
  }, 30000)
})
const pro2 = new Promise((resolve, reject) => {
  // 执行器函数
  setTimeout(() => {
    reject()
  }, 2000)
})
async function test() {
  try {
    await Promise.race([pro1, pro2])
  }
  catch {
    console.log('不关心错误结果，网络超时')
  }
}
test()
```

## 五、ES11新特性

### 1. Promise.allSettled

> Promise.allSettled() 方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise ，并带有一个对象数组，每个对象表示对应的 promise 结果。

```javascript
const promises = [ajax('/200接口'), ajax('/401接口')]

Promise.allSettled(promises).then((results) => {
  // 过滤出成功的请求
  results.filter(item => item.status === 'fulfilled')
  过滤出失败的请求
  results.filter(item => item.status === 'rejected')
})
```

### 2.module新增

#### 2-1 动态导入 import()

> 标准用法的 import 导入的模块是静态的，会使所有被导入的模块，在加载时就被编译（无法做到按需编译，降低首页加载速度）。有些场景中，你可能希望根据条件导入模块或者按需导入模块，这时你可以使用动态导入代替静态导入。

```javascript
<body>
    <button>login</button>
    <script type="module">
        let role1 = "管理员"
        let role2 = "普通用户"

        function login(){
            return "普通用户"
        }

        async function render(role){
            if(role===role1){
                let res1 = await import("./1.js")
                console.log(res1.default)
            }else{
                let res2 = await import("./2.js")
                console.log(res2.default)
            }
        }

        let obtn = document.querySelector("button")
        obtn.onclick = function(){
            let role = login()
            render(role)
        }
    </script>
</body>

```

#### 2-2 import.meta

import.meta 会返回一个对象，有一个 url 属性，返回当前模块的url路径，只能在模块内部使用。

```javascript
<script type="module">
        import obj from './1.js'
</script>

// 1.js

console.log(import.meta)
export default {

}
```

#### 2-3 export * as obj from 'module'

```javascript
// 1.js
export default {
  name: '111111'
}

export function test1() {

}
// 2.js
export default {
  name: '22222'
}
export function test2() {

}
export * as obj1 from './1.js'
// html
 <script type="module">
        import * as obj from './2.js'
        console.log(obj)
 </script>
```

<img src="@/assets/note/javascript/image-20220922111416681.png" />

### 3.字符串的matchAll方法

> matchAll() 方法返回一个包含所有匹配正则表达式的结果的迭代器。可以使用 for...of 遍历，或者使用 展开运算符(...) 或者 Array.from 转换为数组.

```javascript
const str = `
<ul>
<li>1111</li>
<li>2222</li>
<li>3333</li>
<li>4444</li>
</ul>
`
const reg = /<li>(.*)<\/li>/g

console.log(str.match(reg))
// '<li>1111</li>', '<li>2222</li>', '<li>3333</li>', '<li>4444</li>'
```

```javascript
const str = `
<ul>
<li>1111</li>
<li>2222</li>
<li>3333</li>
<li>4444</li>
</ul>
`
const reg = /<li>(.*)<\/li>/g
let match = null
while (match = reg.exec(str)) {
  console.log(match[0])
  console.log(match[1])
}
```

```javascript
const str = `
<ul>
<li>1111</li>
<li>2222</li>
<li>3333</li>
<li>4444</li>
</ul>
`
const reg = /<li>(.*)<\/li>/g

for (const i of str.matchAll(reg)) {
  console.log(i)
}
```

### 4. BigInt

> JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值，这使得 JavaScript 不适合进行科学和金融方面的精确计算。

```javascript
9007199254740992 // 9007199254740992
9007199254740993 // 9007199254740992

2 ** 53 === 2 ** 53 + 1
```

为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。

```javascript
1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n
```

### 5. globalThis

> globalThis 提供了一个标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身）。不像 window 或者 self这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 globalThis，不必担心它的运行环境。为便于记忆，你只需要记住，全局作用域中的 this 就是 globalThis。
>

```javascript
//es6-shim

var getGlobal = function () {

// the only reliable means to get the global object is

    // Function('return this')()

    // However, this causes CSP violations in Chrome apps.

     if (typeof self !== 'undefined') { return self; }

        if (typeof window !== 'undefined') { return window; }

        if (typeof global !== 'undefined') { return global; }

        throw new Error('unable to locate global object');

};

var globals = getGlobal();

if (!globals.Reflect) {

defineProperty(globals, ‘Reflect’, {}, true);

}

```

```javascript
// 以前
const getGlobal = function () {
  if (typeof self !== 'undefined') { return self }

  if (typeof window !== 'undefined') { return window }

  if (typeof global !== 'undefined') { return global }

  throw new Error('unable to locate global object')
}

const globals = getGlobal()

if (globals.document) {
  console.log('进行dom操作相关')
}
else {
  console.log('不能进行dom操作')
}

// 现在
if (globalThis.document) {
  console.log('进行dom操作相关')
}
else {
  console.log('不能进行dom操作')
}
```

### 6.空值合并运算符

> **空值合并运算符（*??*）**是一个逻辑运算符。当左侧操作数为 null 或 undefined 时，其返回右侧的操作数。否则返回左侧的操作数。

```javascript
const obj = {
  name: 'kerwin',
  introduction: 0
}

console.log(obj.introduction || '这个人很懒')
console.log(obj.introduction ?? '这个人很懒')
```

**??和 || 的区别是什么呢?**

他们两个最大的区别就是 ’ '和 0，??的左侧 为 ’ '或者为 0 的时候，依然会返回左侧的值；

|| 会对左侧的数据进行boolean类型转换，所以’ '和 0 会被转换成false,返回右侧的值

### 7.可选链操作符

> 可选链前面的值如果是null或undefined，则不再执行后面的，之前返回可选链前面的值

```javascript
const obj = {
  name: 'kerwin',
  introduction: 0,
  // location:{
  //     city:"dalian"
  // }
}

console.log(obj && obj.location && obj.location.city)
console.log(obj?.location?.city)
```

## 六、ES12新特性

### 1. 逻辑赋值操作符

逻辑赋值操作符 ??=、&&=、 ||=

```javascript
let a = true
const b = false
// a &&= b //false
a ||= b // true
console.log(a)

const obj = {
  name: 'kerwin',
}

obj.introduction = obj.introduction ?? '很懒'
obj.introduction ??= '很懒'
```

### 2.数字分隔符

这个新特性是为了方便程序员看代码而出现的，如果数字比较大，那么看起来就不是那么一目了然

```javascript
const num= 123456789；

```

分隔符不仅可以分割十进制，也可以分割二净值或者十六净值的数据，非常好用。

```javascript
const number = 1_000_000_000_000
const binary = 0b1010_0101_1111_1101
const hex = 0xA1_B2_C3
```

### 3. replaceAll

> 所有匹配都会被替代项替换。模式可以是字符串或正则表达式，而替换项可以是字符串或针对每次匹配执行的函数。并返回一个全新的字符串

```javascript
const str
      = 'I wish to wish the wish you wish to wish, but if you wish the wish the witch wishes, I won\'t wish the wish you wish to wish. '
const newStr = str.replaceAll('wish', 'kerwin')
console.log(newStr)
```

### 4.Promise.any

只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

> `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。

### 5. WeakRef

> 在一般情况下，对象的引用是强引用的，这意味着只要持有对象的引用，它就不会被垃圾回收。只有当该对象没有任何的强引用时，垃圾回收才会销毁该对象并且回收该对象所占的内存空间。
>
> 而 `WeakRef` 允许您保留对另一个对象的弱引用，而不会阻止被弱引用对象被垃圾回收。

```javascript
const target = {}
const wr = new WeakRef(target)
```

WeakRef 实例对象有一个`deref()`方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回`undefined`。

```javascript
const target = {}
const wr = new WeakRef(target)

const obj = wr.deref()
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```

```javascript
const like = new WeakRef(document.getElementById('like'))
const mymap = new WeakMap()
mymap.set(like.deref(), {
  click: 0
})
like.deref().onclick = function () {
  const times = mymap.get(like.deref())
  times.click++
}

setTimeout(() => {
  document.body.removeChild(like.deref())
}, 2000)
```

### 6. FinalizationRegistry

> 清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。

首先，新建一个注册表实例。

```javascript
const registry = new FinalizationRegistry((data) => {
  // ....
})
```

```javascript
registry.register(obj, 'some value')
registry.unregister(obj)
```

```javascript
const like = new WeakRef(document.getElementById('like'))
const mymap = new WeakMap()
mymap.set(like.deref(), {
  click: 0
})
like.deref().onclick = function () {
  const times = mymap.get(like.deref())
  times.click++
}

setTimeout(() => {
  // registry.register(document.getElementById("like"), mymap.get(like.deref()));
  registry.register(like.deref(), mymap.get(like.deref()))

  document.body.removeChild(like.deref())
}, 2000)

const registry = new FinalizationRegistry((data) => {
  // ....
  console.log('被销毁了', data)
})
```

## 七、ES13新特性

### 1. 私有属性和方法

```javascript
class Cache {
  #obj = {}

  get(key) {
    return this.#obj[key]
  }

  set(key, value) {
    this.#obj[key] = value
  }
}

const cache = new Cache()
cache.set('name', 'kerwin')
```

### 2.静态成员的私有属性和方法

> 我们还可以给类定义静态成员和静态私有函数。类的静态方法可以使用`this`关键字访问其他的私有或者公有静态成员，

```javascript
class Cache {
  static #count = 0

  static getCount() {
    return this.#count
  }

  #obj = {}

  get(key) {
    return this.#obj[key]
  }

  set(key, value) {
    this.#obj[key] = value
  }
}

const cache = new Cache()
cache.set('name', 'kerwin')

console.log(Cache.getCount())
```

### 3.静态代码块

> ES13允许在类中通过`static`关键字定义一系列静态代码块，这些代码块只会在类被创造的时候**执行一次**。这其实有点像一些其他的如C#和Java等面向对象的编程语言的静态构造函数的用法。

一个类可以定义任意多的静态代码块，这些代码块会和穿插在它们之间的静态成员变量一起按照定义的顺序在类初始化的时候执行一次。我们还可以使用`super`关键字来访问父类的属性。

```javascript
class Cache {
  static obj = new Map()
  static {
    this.obj.set('name', 'kerwin')
    this.obj.set('age', 100)
  }

  static {
    console.log(this.obj)
  }
}

console.log(Cache.obj)
```

### 4. 使用in来判断某个对象是否拥有某个私有属性

```javascript
class Cache {
  #obj = {}

  get(key) {
    return this.#obj[key]
  }

  set(key, value) {
    this.#obj[key] = value
  }

  hasObj() {
    return #obj in this
  }
}

const cache = new Cache()
console.log(cache.hasObj())
```

### 5.支持在最外层写await

> 顶层`await`只能用在 ES6 模块，不能用在 CommonJS 模块。这是因为 CommonJS 模块的`require()`是同步加载，如果有顶层`await`，就没法处理加载了。

```javascript
<script type="module">
    function ajax() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("data-1111");
        }, 1000);
    })
}

let res = await ajax();
console.log(res)

</script>

```

### 6. at函数来索引元素

```javascript
const arr = ['kerwin', 'tiechui', 'gangdan', 'xiaoming']

console.log(arr[1])
console.log(arr[arr.length - 1]) // 变丑了
console.log(arr[arr.length - 2]) // 变丑了

console.log(arr.at(1))
console.log(arr.at(-1))
console.log(arr.at(-2))
```

### 7. 正则匹配的开始和结束索引

```javascript
const str = '今天是2022-11-10'
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/d

// exec
const res = reg.exec(str)
console.log(res)
```

<img src="@/assets/note/javascript/image-20220927105243515.png" />

### 8.findLast()和findLastIndex()函数

```javascript
const arr = [11, 12, 13, 14, 15]

// let res = arr.find(function(value){
//   return value % 2 === 0
// })
// let res = arr.findIndex(function(value){
//   return value % 2 === 0
// })
// let res = arr.findLast(function(value){
//   return value % 2 === 0
// })
const res = arr.findLastIndex((value) => {
  return value % 2 === 0
})
console.log(res)
```

### 9.Error对象的Cause属性

> Error对象多了一个`cause`属性来指明错误出现的原因。这个属性可以帮助我们为错误添加更多的上下文信息，从而帮助使用者们更好地定位错误。

```javascript
function getData() {
  try {
    console.log(kerwin)
  }
  catch (e) {
    throw new Error('New error ...', { cause: '这是因为...' })
  }
}

try {
  getData()
}
catch (e) {
  console.log(e.cause)
}
```
