---
title: JS基础知识
---

<route lang="yaml">
meta:
  title: JS基础知识
  tags: [JS, Basic]
  date: 2023-06-18 10:10:28
</route>

## 1. JS的数据类型

### 基本数据类型

JS中有6种基本数据类型，分别为：`String`、`Number`、`Boolean`、`Null`、`Undefined`、`Symbol`。

其中`Null`和`Undefined`是空值类型，`Symbol`是ES6中新增的一种类型，表示独一无二的值。

### 引用数据类型

引用数据类型包括`Object`、`Array`、`Function`、`Date`、`RegExp`等。

## 2. JS的数据类型判断

### typeof

`typeof`可以用来判断一个变量是什么类型的数据，但是它对于引用类型的数据来说，除了`function`类型以外，都会返回`object`。

```javascript
typeof 'hello' // 'string'
typeof 10 // 'number'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof null // 'object'
typeof Symbol('symbol') // 'symbol'
typeof [] // 'object'
typeof {} // 'object'
typeof function () {} // 'function'
```

### instanceof

`instanceof`可以用来判断一个变量是不是某个类的实例，但是它不能用来判断基本数据类型。

```javascript
[] instanceof Array // true
{} instanceof Object // true
function(){} instanceof Function // true
new Date() instanceof Date // true
/\d+/g instanceof RegExp // true
```

### Object.prototype.toString

`Object.prototype.toString`可以用来判断一个变量的具体类型，但是它不能用来判断基本数据类型。

```javascript
Object.prototype.toString.call('hello') // '[object String]'
Object.prototype.toString.call(10) // '[object Number]'
Object.prototype.toString.call(true) // '[object Boolean]'
Object.prototype.toString.call(undefined) // '[object Undefined]'
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call(Symbol('Symbol')) // '[object Symbol]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call(() => {}) // '[object Function]'
Object.prototype.toString.call(new Date()) // '[object Date]'
Object.prototype.toString.call(/\d+/g)
```

## 3. JS的数据类型转换

### 转换为字符串

- `String()`：可以将任意类型的值转换为字符串，但是`null`和`undefined`转换后的结果是`'null'`和`'undefined'`。
- `toString()`：可以将数字、布尔值、对象转换为字符串，但是不能转换`null`和`undefined`。
- `+''`：可以将任意类型的值转换为字符串，但是不能转换`null`和`undefined`。
- `JSON.stringify()`：可以将任意类型的值转换为字符串，但是不能转换`undefined`。

### 转换为数字

- `Number()`：可以将任意类型的值转换为数字，但是`null`转换后的结果是`0`，`undefined`转换后的结果是`NaN`。
- `parseInt()`：可以将字符串转换为数字。
- `parseFloat()`：可以将字符串转换为浮点数。
- `+`：可以将任意类型的值转换为数字，但是不能转换`null`和`undefined`。

### 转换为布尔值

- `Boolean()`：可以将任意类型的值转换为布尔值，但是`null`、`undefined`、`NaN`、`''`、`0`、`false`转换后的结果是`false`，其余的值都是`true`。

## 4. JS的内置对象

### Math

`Math`对象是一个数学工具对象，它提供了很多数学方法和常量，可以直接通过`Math`对象调用。

```javascript
Math.PI // 3.141592653589793
Math.abs(-1) // 1
Math.ceil(1.1) // 2
Math.floor(1.9) // 1
Math.round(1.5) // 2
Math.max(1, 2, 3) // 3
Math.min(1, 2, 3) // 1
2 ** 3 // 8
Math.random() // 0.130075436
Math.sqrt(4) // 2
```

### Date

`Date`对象用来处理日期和时间，它提供了很多方法，可以直接通过`Date`对象调用。

```javascript
let date = new Date() // 2021-05-18T02:38:14.000Z
let date = new Date('2021-05-18') // 2021-05-18T00:00:00.000Z
let date = new Date('2021-05-18 10:00:00') // 2021-05-18T02:00:00.000Z
let date = new Date(2021, 4, 18) // 2021-05-17T16:00:00.000Z
let date = new Date(2021, 4, 18, 10, 0, 0) // 2021-05-18T02:00:00.000Z
let date = new Date().getTime() // 1621315094000
let date = new Date().getFullYear() // 2021
let date = new Date().getMonth() // 4
let date = new Date().getDate() // 18
let date = new Date().getHours() // 10
let date = new Date().getMinutes() // 38
let date = new Date().getSeconds() // 14
let date = new Date().getMilliseconds() // 0
```

### JSON

`JSON`对象是用来处理JSON数据的，它提供了两个方法：`JSON.stringify()`和`JSON.parse()`。

`JSON.stringify()`方法可以将一个对象或者数组转换为JSON字符串。

`JSON.parse()`方法可以将一个JSON字符串转换为对象或者数组。

```javascript
JSON.stringify({ name: '张三', age: 20 }) // '{"name":"张三","age":20}'
JSON.parse('{"name":"张三","age":20}') // {name: '张三', age: 20}
```

### Array

`Array`对象用来处理数组，它提供了很多方法，可以直接通过`Array`对象调用。

```javascript
Array.isArray([]) // true
Array.isArray({}) // false
Array.prototype.push() // 添加元素到数组尾部
Array.prototype.pop() // 删除数组尾部的元素
Array.prototype.shift() // 删除数组头部的元素
Array.prototype.unshift() // 添加元素
Array.prototype.concat() // 连接数组
Array.prototype.join() // 将数组转换为字符串
Array.prototype.slice() // 截取数组
Array.prototype.splice() // 删除元素
Array.prototype.reverse() // 反转数组
Array.prototype.sort() // 排序数组
Array.prototype.indexOf() // 查找元素
Array.prototype.lastIndexOf() // 查找元素
Array.prototype.forEach() // 遍历数组
Array.prototype.map() // 映射数组
Array.prototype.filter() // 过滤数组
Array.prototype.every() // 判断数组中的每个元素是否都满足条件
Array.prototype.some() // 判断数组中是否有元素满足条件
Array.prototype.reduce() // 求和
Array.prototype.reduceRight() // 求和
```

### String

`String`对象用来处理字符串，它提供了很多方法，可以直接通过`String`对象调用。

```javascript
String.prototype.charAt() // 获取指定位置的字符
String.prototype.charCodeAt() // 获取指定位置的字符的Unicode编码
String.prototype.concat() // 拼接字符串
String.prototype.indexOf() // 查找子串
String.prototype.lastIndexOf() // 查找子串
String.prototype.slice() // 截取字符串
String.prototype.substring() // 截取字符串
String.prototype.substr() // 截取字符串
String.prototype.split() // 分割字符串
String.prototype.replace() // 替换字符串
String.prototype.toLowerCase() // 转换为小写
String.prototype.toUpperCase() // 转换为大写
String.prototype.trim() // 去除字符串两边的空格
String.prototype.match() // 匹配
String.prototype.search() // 查找
String.prototype.repeat() // 重复
String.prototype.startsWith() // 判断是否以指定字符串开头
String.prototype.endsWith() // 判断是否以指定字符串结尾
String.prototype.includes() // 判断是否包含指定字符串
```

### RegExp

`RegExp`对象用来处理正则表达式，它提供了很多方法，可以直接通过`RegExp`对象调用。

```javascript
RegExp.prototype.test() // 判断字符串是否符合正则表达式
RegExp.prototype.exec() // 匹配正则表达式
```

## 5. JS的函数

### 函数的定义

函数是一段可以重复执行的代码块，可以通过函数名来调用函数。

```javascript
function fn() {
  console.log('fn函数被调用了')
}

fn() // fn函数被调用了
```

### 函数的参数

函数可以接收参数，参数可以是任意类型，一个函数可以接收多个参数。

```javascript
function fn(a, b) {
  console.log(a, b)
}

fn(1, 2) // 1 2
```

### 函数的返回值

函数可以返回一个值，如果函数没有返回值，则返回`undefined`。

```javascript
function fn() {
  return 'hello'
}

console.log(fn()) // hello
```

### 函数的调用

函数可以通过函数名来调用，如果函数没有返回值，则返回`undefined`。

```javascript
function fn() {
  console.log('fn函数被调用了')
}

fn() // fn函数被调用了
```

### 函数的内部变量

函数内部可以定义变量，这些变量只能在函数内部使用，函数外部无法使用。

```javascript
function fn() {
  const a = 1
}

console.log(a) // a is not defined
```

### 函数的内部函数

函数内部可以定义函数，这些函数只能在函数内部使用，函数外部无法使用。

```javascript
function fn() {
  function fn2() {
    console.log('fn2函数被调用了')
  }
  fn2()
}

fn() // fn2函数被调用了
console.log(fn2) // fn2 is not defined
```

### 函数的参数作用域

函数的参数也是函数内部的变量，只能在函数内部使用，函数外部无法使用。

```javascript
function fn(a, b) {
  console.log(a, b)
}

fn(1, 2) // 1 2
console.log(a, b) // a is not defined
```

### 函数的参数默认值

函数的参数可以设置默认值，如果调用函数时没有传递参数，则会使用默认值。

```javascript
function fn(a = 1, b = 2) {
  console.log(a, b)
}

fn() // 1 2
fn(3) // 3 2
fn(3, 4) // 3 4
```

### 函数的参数解构赋值

函数的参数可以使用解构赋值，可以直接获取对象中的属性值。

```javascript
function fn({ a, b }) {
  console.log(a, b)
}

fn({ a: 1, b: 2 }) // 1 2
```

### 函数的参数不定长

函数的参数可以使用`...`来表示，表示参数的个数不定长。

```javascript
function fn(...args) {
  console.log(args)
}

fn(1, 2, 3) // [1, 2, 3]
```

### 函数的立即执行

函数可以立即执行，可以通过`()`来调用函数。

```javascript
(function () {
  console.log('立即执行')
})() // 立即执行
```

### 函数的重载

函数可以定义多个，函数名相同，参数个数不同，这样就实现了函数的重载。

```javascript
function fn(a) {
  console.log(a)
}

function fn(a, b) {
  console.log(a, b)
}

fn(1) // 1
fn(1, 2) // 1 2
```

### 函数的递归

函数可以调用自身，这样就实现了函数的递归。

```javascript
function fn(a) {
  if (a === 0) {
    return 0
  }
  return a + fn(a - 1)
}

console.log(fn(100)) // 5050
```

### 函数的闭包

函数可以返回一个函数，这样就实现了函数的闭包。

```javascript
function fn() {
  const a = 1
  return function () {
    console.log(a)
  }
}

const f = fn()
f() // 1
```

### 函数的箭头函数

函数可以使用箭头函数的形式来定义函数，这样就实现了函数的箭头函数。

```javascript
const fn = () => {
  console.log('箭头函数')
}

fn() // 箭头函数
```

## 6. JS的运算符

### 算术运算符

算术运算符用来进行算术运算，返回的结果是一个数值。

```javascript
console.log(1 + 2) // 3
console.log(1 - 2) // -1
console.log(1 * 2) // 2
console.log(1 / 2) // 0.5
console.log(1 % 2) // 1
console.log(1 ** 2) // 1
```

### 赋值运算符

赋值运算符用来给变量赋值，返回的结果是一个数值。

```javascript
const a = 1
console.log(a) // 1
```

### 比较运算符

比较运算符用来比较两个值的大小，返回的结果是一个布尔值。

```javascript
console.log(1 > 2) // false
console.log(1 >= 2) // false
console.log(1 < 2) // true
console.log(1 <= 2) // true
console.log(1 == 2) // false
console.log(1 != 2) // true
console.log(1 === 2) // false
console.log(1 !== 2) // true
```

### 逻辑运算符

逻辑运算符用来进行逻辑运算，返回的结果是一个布尔值。

```javascript
console.log(true && false) // false
console.log(true || false) // true
console.log(!true) // false
```

### 位运算符

位运算符用来进行位运算，返回的结果是一个数值。

```javascript
console.log(1 & 2) // 0
console.log(1 | 2) // 3
console.log(1 ^ 2) // 3
console.log(~1) // -2
console.log(1 << 2) // 4
console.log(1 >> 2) // 0
console.log(1 >>> 2) // 0
```

### 三元运算符

三元运算符用来进行条件运算，返回的结果是一个值。

```javascript
console.log(1 > 2 ? 1 : 2) // 2
```

### 逗号运算符

逗号运算符用来进行逗号运算，返回的结果是最后一个运算的值。

```javascript
console.log((1, 2)) // 2
```

## 7. JS的语句

### 条件语句

条件语句用来进行条件判断，根据不同的条件执行不同的代码。

```javascript
if (true) {
  console.log('条件成立')
}
else {
  console.log('条件不成立')
}

switch (1) {
  case 1:
    console.log(1)
    break
  case 2:
    console.log(2)
    break
  default:
    console.log('default')
}
```

### 循环语句

循环语句用来进行循环操作，根据不同的条件重复执行相同的代码。

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i)
}

let i = 0
while (i < 10) {
  console.log(i)
  i++
}

let i = 0
do {
  console.log(i)
  i++
} while (i < 10)
```

### 跳转语句

跳转语句用来进行跳转操作，根据不同的条件跳转到不同的位置。

```javascript
break
continue
return
throw
```

## 8. JS的对象

### 对象的定义

对象是由多个键值对组成的，键值对之间使用`,`分隔，键和值之间使用`:`分隔，键必须是字符串，值可以是任意类型。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}
```

### 对象的读取

对象的键值对可以使用`.`来进行读取，如果键名是一个变量，则需要使用`[]`来进行读取。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}

console.log(obj.a) // 1
console.log(obj.a) // 1

const key = 'a'
console.log(obj[key]) // 1
```

### 对象的修改

对象的键值对可以使用`.`来进行修改，如果键名是一个变量，则需要使用`[]`来进行修改。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}

obj.a = 4
console.log(obj.a) // 4

obj.a = 5
console.log(obj.a) // 5

const key = 'a'
obj[key] = 6
console.log(obj[key]) // 6
```

### 对象的添加

对象的键值对可以使用`.`来进行添加，如果键名是一个变量，则需要使用`[]`来进行添加。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}

obj.d = 4
console.log(obj.d) // 4

obj.e = 5
console.log(obj.e) // 5

const key = 'f'
obj[key] = 6
console.log(obj[key]) // 6
```

### 对象的删除

对象的键值对可以使用`.`来进行删除，如果键名是一个变量，则需要使用`[]`来进行删除。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}

delete obj.a
console.log(obj.a) // undefined

delete obj.b
console.log(obj.b) // undefined

const key = 'c'
delete obj[key]
console.log(obj[key]) // undefined
```

### 对象的遍历

对象的键值对可以使用`for...in`来进行遍历。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}

for (const key in obj) {
  console.log(key, obj[key])
}
```

## 9. JS的数组

### 数组的定义

数组是由多个元素组成的，元素之间使用`,`分隔，元素可以是任意类型。

```javascript
const arr = [1, 2, 3]
```

### 数组的读取

数组的元素可以使用索引来进行读取，索引从`0`开始。

```javascript
const arr = [1, 2, 3]

console.log(arr[0]) // 1
console.log(arr[1]) // 2
console.log(arr[2]) // 3
```

### 数组的修改

数组的元素可以使用索引来进行修改，索引从`0`开始。

```javascript
const arr = [1, 2, 3]

arr[0] = 4
console.log(arr[0]) // 4

arr[1] = 5
console.log(arr[1]) // 5

arr[2] = 6
console.log(arr[2]) // 6
```

### 数组的添加

数组的元素可以使用索引来进行添加，索引从`0`开始。

```javascript
const arr = [1, 2, 3]

arr[3] = 4
console.log(arr[3]) // 4

arr[4] = 5
console.log(arr[4]) // 5

arr[5] = 6
console.log(arr[5]) // 6
```

### 数组的删除

数组的元素可以使用索引来进行删除，索引从`0`开始。

```javascript
const arr = [1, 2, 3]

arr.splice(0, 1)
console.log(arr[0]) // 2

arr.splice(0, 1)
console.log(arr[0]) // 3

arr.splice(0, 1)
console.log(arr[0]) // undefined
```

### 数组的遍历

数组的元素可以使用`for`来进行遍历。

```javascript
const arr = [1, 2, 3]

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```

