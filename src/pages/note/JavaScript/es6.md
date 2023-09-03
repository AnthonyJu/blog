---
title: ES6新特性
meta:
  - name: description
    content: ES6新特性
  - name: keywords
    content: ES6, New Features
---

<route lang="yaml">
meta:
  title: ES6新特性
  keywords: [ES6, New Features]
  date: 2023-06-18 14:22:19
</route>

# ES6新特性​

## 1、初识ES6

> ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

-  1997年：ECMAScript 1.0

-  1998年：ECMAScript 2.0

-  1999年：ECMAScript 3.0

-  2006年：ECMAScript 4.0 未通过

-  2009年：ECMAScript 5.0

-  2015年：ECMAScript 6.0

-  至今，版本号改用年号的形式。

## 2、let声明变量与const声明常量

1. `let` 不允许重复声明变量

   ```javascript
   // 使用 var 的时候重复声明变量是没问题的，只不过就是后面会把前面覆盖掉
   var num = 100
   var num = 200
   ```

   ```javascript
   // 使用 let 重复声明变量的时候就会报错了
   let num = 100
   let num = 200 // 这里就会报错了
   ```

   ```javascript
   // 使用 const 重复声明变量的时候就会报错
   const num = 100
   const num = 200 // 这里就会报错了
   ```

2. `let` 和 `const` 声明的变量不会在预解析的时候解析（也就是没有变量提升）

   ```javascript
   // 因为预解析（变量提升）的原因，在前面是有这个变量的，只不过没有赋值
   console.log(num) // undefined
   var num = 100
   ```

   ```javascript
   // 因为 let 不会进行预解析（变量提升），所以直接报错了
   console.log(num)
   let num = 100
   ```

   ```javascript
   // 因为 const 不会进行预解析（变量提升），所以直接报错了
   console.log(num)
   const num = 100
   ```

3. `let` 和 `const` 声明的变量会被所有代码块限制作用范围

   ```javascript
   // var 声明的变量只有函数能限制其作用域，其他的不能限制
   if (true) {
     var num = 100
   }
   console.log(num) // 100
   ```

   ```javascript
   // let 声明的变量，除了函数可以限制，所有的代码块都可以限制其作用域（if/while/for/...）
   if (true) {
     const num = 100
     console.log(num) // 100
   }
   console.log(num) // 报错
   ```

   ```javascript
   // const 声明的变量，除了函数可以限制，所有的代码块都可以限制其作用域（if/while/for/...）
   if (true) {
     const num = 100
     console.log(num) // 100
   }
   console.log(num) // 报错
   ```

- `let` 和 `const` 的区别

  1. `let` 声明的变量的值可以改变，`const` 声明的变量的值不可以改变

     ```javascript
     let num = 100
     num = 200
     console.log(num) // 200
     ```

     ```javascript
     const num = 100
     num = 200 // 这里就会报错了，因为 const 声明的变量值不可以改变（我们也叫做常量）
     ```

  2. `let` 声明的时候可以不赋值，`const` 声明的时候必须赋值

     ```javascript
     let num
     num = 100
     console.log(num) // 100
     ```

     ```javascript
     const num // 这里就会报错了，因为 const 声明的时候必须赋值
     ```

## 3、解构赋值

- 解构赋值，就是快速的从对象或者数组中取出成员的一个语法方式

### 3-1 解构对象

- 快速的从对象中获取成员

  ```javascript
  // ES5 的方法向得到对象中的成员
  const obj = {
    name: 'kerwin',
    age: 100,
    gender: '男'
  }

  const name = obj.name
  const age = obj.age
  const gender = obj.gender
  ```

  ```javascript
  // 解构赋值的方式从对象中获取成员
  const obj = {
    name: 'kerwin',
    age: 100,
    gender: '男'
  }

  // 前面的 {} 表示我要从 obj 这个对象中获取成员了
  // name age gender 都得是 obj 中有的成员
  // obj 必须是一个对象
  const { name, age, gender } = obj
  ```



### 3-2 解构数组

- 快速的从数组中获取成员

  ```javascript
  // ES5 的方式从数组中获取成员
  const arr = ['kerwin', 'tiechui', 'gangdan']
  const a = arr[0]
  const b = arr[1]
  const c = arr[2]
  ```

  ```javascript
  // 使用解构赋值的方式从数组中获取成员
  const arr = ['kerwin', 'tiechui', 'gangdan']

  // 前面的 [] 表示要从 arr 这个数组中获取成员了
  // a b c 分别对应这数组中的索引 0 1 2
  // arr 必须是一个数组
  const [a, b, c] = arr
  ```



## 4、模版字符串

- ES5 中我们表示字符串的时候使用 `''` 或者 `""`

- 在 ES6 中，我们还有一个东西可以表示字符串，就是 **``**（反引号）

  ```javascript
  const str = 'hello world'
  console.log(typeof str) // string
  ```

- 和单引号好友双引号的区别

  1. 反引号可以换行书写

     ```javascript
     // 这个单引号或者双引号不能换行，换行就会报错了
     let str = 'hello world'

     // 下面这个就报错了
     let str2 = 'hello
     world'
     ```

     ```javascript
     const str = `
     	hello
     	world
     `

     console.log(str) // 是可以使用的
     ```

  2. 反引号可以直接在字符串里面拼接变量

     ```javascript
     // ES5 需要字符串拼接变量的时候
     const num = 100
     const str = `hello${num}world${num}`
     console.log(str) // hello100world100

     // 直接写在字符串里面不好使
     const str2 = 'hellonumworldnum'
     console.log(str2) // hellonumworldnum
     ```

     ```javascript
     // 模版字符串拼接变量
     const num = 100
     const str = `hello${num}world${num}`
     console.log(str) // hello100world100
     ```

     - 在 **``** 里面的 `${}` 就是用来书写变量的位置

## 5.字符串扩展

### 5-1 includes函数

判断字符串中是否存在指定字符

```javascript
const myName = 'kerwin'

console.log(myName.includes('e')) // true
console.log(myName.startsWith('j')) // true
console.log(myName.endsWith('g')) // true
```

### 5-2 repeat函数

repeat()方法返回一个新字符串,表示将原字符串重复n次。

```javascript
const myName = 'kerwin'

console.log(myName.repeat(3)) // kerwinkerwinkerwin

console.log(myName.repeat(0)) // ""
console.log(myName.repeat(3.5)) // kerwinkerwinkerwin

console.log(myName.repeat('3'))// kerwinkerwinkerwin
```

## 6.数值扩展

### 6-1 二进制和八进制表示法

```javascript
const count1 = 100
const count2 = 0x100
const count3 = 0o100
const count4 = 0b100
```

### 6-2 isFinite与isNaN方法

减少全局性方法，使得语言逐步模块化

```javascript
const num1 = Number.isFinite(100) // true
const num2 = Number.isFinite(100 / 0) // false
const num3 = Number.isFinite(Infinity) // false
const num4 = Number.isFinite('100') // false
```

```javascript
const num1 = Number.isNaN(100) // false
const num2 = Number.isNaN(NaN) // true
const num3 = Number.isNaN('kerwin') // false
const num4 = Number.isNaN('100') // false
```

它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

### 6-3 isInteger方法

用来判断一个数值是否为整数。

```javascript
const num1 = Number.isInteger(100) // true
const num2 = Number.isInteger(100.0) // true
const num3 = Number.isInteger('kerwin') // false
const num4 = Number.isInteger('100') // false
```

### 6-4 极小常量Number.EPSILON

它表示 1 与大于 1 的最小浮点数之间的差。2.220446049250313e-16

```javascript
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}

console.log(isEqual(0.1 + 0.2, 0.3)) // true
console.log(0.1 + 0.2 === 0.3) // false
```

### 6-5 Math.trunc

将小数部分抹掉,返回一个整数。

```javascript
console.log(Math.trunc(1.2)) // 1
console.log(Math.trunc(1.8))// 1
console.log(Math.trunc(-1.8)) // -1
console.log(Math.trunc(-1.2))// -1
```

### 6-6 Math.sign

`Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

```javascript
Math.sign(-100) // -1
Math.sign(100) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign('kerwin') // NaN
```

## 7.数组扩展

### 7-1 扩展运算符

```javascript
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

console.log([...arr1, ...arr2])
```

### 7-2 Array.from

将类数组对象转换为真正数组

```javascript
function test() {
  console.log(Array.from(arguments))
}

test(1, 2, 3)

const oli = document.querySelectorAll('li')
console.log(Array.from(oli))
```

### 7-3 Array.of

将一组值转化为数组,即新建数组

```javascript
const arr1 = Array(3)
console.log(arr1)// [,,]

const arr2 = Array.of(3)
console.log(arr2)// [3]
```

### 7-4. find方法

1. 该方法主要应用于查找第一个符合条件的数组元素

2. 它的参数是一个回调函数。在回调函数中可以写你要查找元素的条件,当条件成立为true时,返回该元素。如果没有符合条件的元素,返回值为undefined

```javascript
const arr = [11, 12, 13, 14, 15]
const res1 = arr.find((item) => {
  return item > 13
})
const res2 = arr.findIndex((item) => {
  return item > 13
})
console.log(res1) // 14
console.log(res2) // 3
```

### 7-5. fill方法

使用自己想要的参数替换原数组内容,但是会改变原来的数组

```javascript
const arr1 = new Array(3).fill('kerwin')
const arr2 = ['a', 'b', 'c'].fill('kerwin', 1, 2)

console.log(arr1) // ['kerwin', 'kerwin', 'kerwin']
console.log(arr2) // ['a', 'kerwin', 'c']
```

### 7-6 flat与flatMap方法

按照一个可指定的深度递归遍历数组,并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```javascript
const obj = [{
  name: 'A',
  list: ['鞍山', '安庆', '安阳']
},
{
  name: 'B',
  list: ['北京', '保定', '包头']
}
]
console.log(obj.flatMap(item => item.list))
```



## 8.对象扩展

### 8-1 对象简写

```javascript
const name = 'moduleA'
const obj = {
  name,
  test1() {

  },
  test2() {

  }
}
```

### 8-2 属性名表达式

```javascript
const name = 'moduleA'
const obj = {
  name,
  [`${name}test1`]() {

  },
  [`${name}test2`]() {

  }
}
```

### 8-3 Object.assign

Object.assign(target, object1，object2)的第一个参数是目标对象，后面可以跟一个或多个源对象作为参数。

target：参数合并后存放的对象

object1：参数1

object2：参数2

```javascript
const obj1 = {
  name: 'kerwin'
}

const obj2 = {
  name: 'tiechui'
}
const obj3 = {
  age: 100
}

Object.assign(obj1, obj2, obj3)
// obj1 {name: 'tiechui', age: 100}
```
### 8-4 Object.is

方法判断两个值是否是相同的值

```javascript
console.log(NaN === NaN) // false
console.log(+0 === -0) // true

console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(+0, -0)) // false
```



## 9.函数扩展

### 9-1 箭头函数

- 箭头函数是 ES6 里面一个简写函数的语法方式

- 重点： **箭头函数只能简写函数表达式，不能简写声明式函数**

  ```javascript
  function fn() {} // 不能简写
  const fun = function () {} // 可以简写
  const obj = {
    fn() {} // 可以简写
  }
  ```

- 语法： `(函数的行参) => { 函数体内要执行的代码 }`

  ```javascript
  const fn = function (a, b) {
    console.log(a)
    console.log(b)
  }
  // 可以使用箭头函数写成
  function fun(a, b) {
    console.log(a)
    console.log(b)
  }
  ```

  ```javascript
  const obj = {
    fn(a, b) {
      console.log(a)
      console.log(b)
    }
  }
  // 可以使用箭头函数写成
  const obj2 = {
    fn: (a, b) => {
      console.log(a)
      console.log(b)
    }
  }
  ```

### 9-2 箭头函数的特殊性

- 箭头函数内部没有 this，箭头函数的 this 是上下文的 this

  ```javascript
  // 在箭头函数定义的位置往上数，这一行是可以打印出 this 的
  // 因为这里的 this 是 window
  // 所以箭头函数内部的 this 就是 window
  const obj = {
    fn() {
      console.log(this)
    },
    // 这个位置是箭头函数的上一行，但是不能打印出 this
    fun: () => {
      // 箭头函数内部的 this 是书写箭头函数的上一行一个可以打印出 this 的位置
      console.log(this)
    }
  }

  obj.fn()
  obj.fun()
  ```

  - 按照我们之前的 this 指向来判断，两个都应该指向 obj
  - 但是 fun 因为是箭头函数，所以 this 不指向 obj，而是指向 fun 的外层，就是 window

- 箭头函数内部没有 `arguments` 这个参数集合

  ```javascript
  const obj = {
    fn() {
      console.log(arguments)
    },
    fun: () => {
      console.log(arguments)
    }
  }
  obj.fn(1, 2, 3) // 会打印一个伪数组 [1, 2, 3]
  obj.fun(1, 2, 3) // 会直接报错
  ```

- 函数的行参只有一个的时候可以不写 `()` 其余情况必须写

  ```javascript
  const obj = {
    fn: () => {
      console.log('没有参数，必须写小括号')
    },
    fn2: (a) => {
      console.log('一个行参，可以不写小括号')
    },
    fn3: (a, b) => {
      console.log('两个或两个以上参数，必须写小括号')
    }
  }
  ```

- 函数体只有一行代码的时候，可以不写 `{}` ，并且会自动 return

  ```javascript
  const obj = {
    fn: (a) => {
      return a + 10
    },
    fun: a => a + 10
  }

  console.log(fn(10)) // 20
  console.log(fun(10)) // 20
  ```

### 9-3 函数传递参数的时候的默认值

- 我们在定义函数的时候，有的时候需要一个默认值出现

- 就是当我不传递参数的时候，使用默认值，传递参数了就使用传递的参数

  ```javascript
  function fn(a) {
    a = a || 10
    console.log(a)
  }
  fn() // 不传递参数的时候，函数内部的 a 就是 10
  fn(20) // 传递了参数 20 的时候，函数内部的 a 就是 20
  ```

  - 在 ES6 中我们可以直接把默认值写在函数的行参位置

  ```javascript
  function fn(a = 10) {
    console.log(a)
  }
  fn() // 不传递参数的时候，函数内部的 a 就是 10
  fn(20) // 传递了参数 20 的时候，函数内部的 a 就是 20
  ```

  - 这个默认值的方式箭头函数也可以使用

  ```javascript
  function fn(a = 10) {
    console.log(a)
  }
  fn() // 不传递参数的时候，函数内部的 a 就是 10
  fn(20) // 传递了参数 20 的时候，函数内部的 a 就是 20
  ```

  - 注意： **箭头函数如果你需要使用默认值的话，那么一个参数的时候也需要写 （）**

## 10.Symbol

> ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它属于 JavaScript 语言的原生数据类型之一，其他数据类型是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

1. 使用Symbol作为对象属性名

```javascript
const name = Symbol()
const age = Symbol()
const obj = {
  [name]: 'kerwin',
  [age]: 100
}
```

2. Symbol()函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。这主要是为了在控制台显示，比较容易区分。

```javascript
const name = Symbol('name')
const age = Symbol('age')
const obj = {
  [name]: 'kerwin',
  [age]: 100
}
console.log(obj)
```

3. 遍历问题

```javascript
const keys = {
  name: Symbol('name'),
  age: Symbol('age')
}
const obj = {
  [keys.name]: 'kerwin',
  [keys.age]: 100,
  a: 1,
  b: 2,
  c: 3
}

Reflect.ownKeys(obj).forEach((item) => {
  console.log(item, obj[item])
})
```

4. Symbol.for()可以重新使用同一个 Symbol 值

```javascript
const obj = {
  [Symbol.for('name')]: 'kerwin',
  [Symbol.for('age')]: 100
}

console.log(obj[Symbol.for('name')])
```

## 11.Iterator迭代器

> Iterator 的作用有三个：
>
> 一是为各种数据结构，提供一个统一的、简便的访问接口；
>
> 二是使得数据结构的成员能够按某种次序排列；
>
> 三是 ES6 创造了一种新的遍历命令**for...of**循环，Iterator 接口主要供**for...of**循环

```javascript
const arr = ['kerwin', 'tiechui', 'gangdaner']

for (const i of arr) {
  console.log(i)
}
```

```javascript
// Iterator 的遍历过程是这样的。

// （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

// （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

// （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

// （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

const i = arr[Symbol.iterator]()
console.log(i.next())
console.log(i.next())
console.log(i.next())
console.log(i.next())
```

> ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。



原生默认具备 Iterator 接口的数据结构如下。

- Array
- Set
- Map
- String
- arguments 对象
- NodeList 对象



**如何对于对象进行for fo遍历？**

```javascript
const obj = {
  0: 'kerwin',
  1: 'tiechui',
  2: 'gangdaner',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}

for (const i of obj) {
  console.log(i)
}

const obj2 = {
  data: ['kerwin', 'tiechui', 'gangdaner'],
  [Symbol.iterator]() {
    // let _this = this
    let index = 0
    return {
      next: () => {
        if (index < this.data.length) {

          return {
            value: this.data[index++],
            done: false
          }
        }
        else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

for (const i of obj2) {
  console.log(i)
}
```

## 12.Set结构

> 它类似于数组，但成员的值都是唯一的，没有重复的值。

### 12-1 初识Set

```javascript
const s1 = new Set([1, 2, 3, 2, 3])
console.log(s1)

const s2 = new Set()
s2.add(1)
s2.add(2)
s2.add(3)
console.log(s2)
```



### 12-2 实例的属性和方法

- size：返回Set实例的成员总数。

- `Set.prototype.add(value)`：添加某个value。
- `Set.prototype.delete(value)`：删除某个value，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

### 12-3 遍历

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：遍历每个成员

### 12-4 复杂数据结构去重

```javascript
function uni(arr) {
  const res = new Set()
  return arr.filter((item) => {
    const id = JSON.stringify(item)
    if (res.has(id)) {
      return false
    }
    else {
      res.add(id)
      return true
    }
  })
}

const arr = [1, 2, 3, 'data', {
  name: 'kerwin'
}, {
  name: 'kerwin'
},
[1, 2],
[3, 4],
[3, 4]
]
console.log(uni(arr))
```

## 13.Map结构

> 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

### 13-1 初识Map

```javascript
const m1 = new Map()
m1.set('name', 'kerwin')
m1.set({ a: 1 }, '大连')

console.log(m1)

const m2 = new Map([
  ['name', 'kerwin'],
  [{ a: 1 }, '大连']
])
console.log(m2)
```

### 13-2 实例的属性和方法

- size：返回 Map 结构的成员总数。

- `Map.prototype.set(key,value)`：添加key对应得value，返回 Map 结构本身。
- `Map.prototype.get(key)`：获取key对应的value
- `Map.prototype.delete(key)`：删除某个键（键名+键值）
- `Map.prototype.has(key)`：某个键是否在当前 Map 对象之中。
- `Map.prototype.clear()`：清除所有成员，没有返回值。

### 13-3 遍历

- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。

## 14.Proxy代理

> Proxy如其名， 它的作用是在对象和和对象的属性值之间设置一个代理，获取该对象的值或者设置该对象的值， 以及实例化等等多种操作， 都会被拦截住， 经过这一层我们可以统一处理，我们可以认为它就是“代理器”

### 14-1.get方法

```javascript
const target = {}
const proxy = new Proxy(target, {
  get(target, prop) {
    return target[prop]
  }
})
```

### 14-2.set方法

```javascript
const target = {}
const proxy = new Proxy(target, {
  get(target, prop) {
    return target[prop]
  },
  set(target, prop, value) {
    if (prop === 'data') {
      box.innerHTML = value
    }
    target[prop] = value
  }
})
```

### 14-3.has方法

```javascript
const target = {
  _prop: '内部数据'
}
const proxy = new Proxy(target, {
  get(target, prop) {
    return target[prop]
  },
  set(target, prop, value) {
    if (prop === 'data') {
      box.innerHTML = value
    }
    target[prop] = value
  },
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
})
```

### 14-4.this问题

```javascript
const target = new Set()
const proxy = new Proxy(target, {
  get(target, key) {
    const value = target[key]
    // 遇到 Function 都手动绑定一下 this
    if (value instanceof Function) {
      console.log(`访问${value}方法了`)
      return value.bind(target)
      // 不能 是 call apply
    }
    return value
  }
})
proxy.add(1)
```

> Proxy本质上属于元编程非破坏性数据劫持，在原对象的基础上进行了功能的衍生而又不影响原对象，符合松耦合高内聚的设计理念。

## 15.Reflect对象

> Reflect 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。

### 15-1 代替Object的某些方法

```javascript
const obj = {
}
Reflect.defineProperty(obj, 'name', {
  value: 'kerwin',
  writable: false,
  configurable: false
})
```

### 15-2 修改某些Object方法返回结果

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes)
  // success
}
catch (e) {
  // fail
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
}
else {
  // fail
}
```

### 15-3 命令式变为函数行为

```javascript
const obj = {
  name: 'kerwin'
}
// 老写法
console.log('name' in obj) // true
// 新写法
console.log(Reflect.has(obj, 'name')) // true

// 老写法
delete obj.name
// 新写法
Reflect.deleteProperty(obj, 'name')
```

### 15-4 配合Proxy

```javascript
const target = new Set()
const proxy = new Proxy(target, {
  get(target, key) {
    const value = Reflect.get(target, key)
    // 遇到 Function 都手动绑定一下 this
    if (value instanceof Function) {
      console.log(`访问${value}方法了`)
      return value.bind(target)
      // 不能 是 call apply
    }
    return value
  },
  set() {
    return Reflect.set(...arguments)
  }
})
proxy.add(1)
```

```javascript
const arr = [1, 2, 3]
const proxy = new Proxy(arr, {
  get(target, key) {
    console.log('get', key)
    return Reflect.get(...arguments)
  },
  set(target, key, value) {
    console.log('set', key, value)
    return Reflect.set(...arguments)
  }
})
proxy.push(4)
// 能够打印出很多内容
// get push     (寻找 proxy.push 方法)
// get length   (获取当前的 length)
// set 3 4      (设置 proxy[3] = 4)
// set length 4 (设置 proxy.length = 4)
```

## 16.Promise

> Promise 是异步编程的一种解决方案，比传统的解决方案回调函数,  更合理和更强大。ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象 。

- 指定回调函数方式更灵活易懂。

- 解决异步 **回调地狱** 的问题。

### 16-1 回调地狱

- 当一个回调函数嵌套一个回调函数的时候

- 就会出现一个嵌套结构

- 当嵌套的多了就会出现回调地狱的情况

- 比如我们发送三个 ajax 请求

  - 第一个正常发送
  - 第二个请求需要第一个请求的结果中的某一个值作为参数
  - 第三个请求需要第二个请求的结果中的某一个值作为参数

  ```javascript
  ajax({
    url: '我是第一个请求',
    success (res) {
      // 现在发送第二个请求
      ajax({
        url: '我是第二个请求'，
        data: { a: res.a, b: res.b },
        success (res2) {
          // 进行第三个请求
          ajax({
            url: '我是第三个请求',
            data: { a: res2.a, b: res2.b },
    				success (res3) {
              console.log(res3)
            }
          })
        }
      })
    }
  })
  ```

- **回调地狱，其实就是回调函数嵌套过多导致的**

![回调地狱](@/assets/note/javascript/callback-hell.png)

- 当代码成为这个结构以后，已经没有维护的可能了


### 16-2 Promise使用

- 语法：

  ```javascript
  new Promise((resolve, reject) => {
    // resolve 表示成功的回调
    // reject 表示失败的回调
  }).then((res) => {
    // 成功的函数
  }).catch((err) => {
    // 失败的函数
  })
  ```

### 16-3 Promise 对象的状态

Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。

 ```
异步操作未完成（pending）
异步操作成功（fulfilled）
异步操作失败（rejected）
 ```

这三种的状态的变化途径只有两种。

 ```
从“未完成”到“成功”
从“未完成”到“失败”
 ```

一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 Promise 这个名字的由来，它的英语意思是“承诺”，一旦承诺成效，就不得再改变了。这也意味着，Promise 实例的状态变化只可能发生一次。

因此，Promise 的最终结果只有两种。

 ```
异步操作成功，Promise 实例传回一个值（value），状态变为fulfilled。
异步操作失败，Promise 实例抛出一个错误（error），状态变为rejected。
 ```

![image-20220902141409899](@/assets/note/javascript/image-20220902141409899.png)

### 16-4 Promise.all

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3])
```

p的状态由p1,p2,p3 决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

### 16-5 Promise.race

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3])
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## 17.Generator 函数

> Generator 函数是 ES6 提供的一种异步编程解决方案
>
> Generator 函数是一个状态机，封装了多个内部状态。
>
> 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。



### 17-1 基本语法

```javascript
function *gen() {
  console.log(1)
  yield
  console.log(2)
  yield
  console.log(3)
}

const g = gen()
g.next()
g.next()
g.next()
```

![image-20220917070351858](@/assets/note/javascript/image-20220917070351858.png)

> yield(产出)表达式是暂停执行的标记，而next方法可以恢复执行。

```javascript
function *gen() {
  yield 1
  yield 2
}

const g = gen()
const res1 = g.next()
console.log(res1)
const res2 = g.next()
console.log(res2)
const res3 = g.next()
console.log(res3)
```

![image-20220917070836171](@/assets/note/javascript/image-20220917070836171.png)

```javascript
function *gen() {
  const res1 = yield
  console.log(res1)
  const res2 = yield
  console.log(res2)
}

const g = gen()
g.next('data-1')
g.next('data-2')
g.next('data-3')
```

![image-20220917071219520](@/assets/note/javascript/image-20220917071219520.png)

### 17-2 异步流程

**手动版本**

```javascript
function *gen() {
  const res1 = yield ajax('1.json')
  console.log(res1)
  const res2 = yield ajax('2.json')
  console.log(res2)
}

const g = gen()

g.next().value.then((data) => {
  g.next(data).value.then((data) => {
    g.next(data)
  })
})
```

**自动版本**

```javascript
function* gen() {
  const res1 = yield ajax('1.json')
  console.log(res1)
  const res2 = yield ajax('2.json')
  console.log(res2)
}

function AutoRun(gen) {
  const g = gen()

  function next(data) {
    const res = g.next(data)
    if (res.done) return
    res.value.then((data) => {
      next(data)
    })
  }

  next()
}

AutoRun(gen)
```

## 18. Class语法

### 18-1 类的写法

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say() {
    console.log(this.name, this.age)
  }
}
const obj = new Person('kerwin', 100)
console.log(obj)
```

### 18-2 getter与setter

```javascript
class List {
  constructor(ele) {
    this.element = ele
  }

  get html() {
    return this.element.innerHTML
  }

  set html(arr) {
    this.element.innerHTML = arr.map(item => `<li>${item}</li>`).join('')
  }
}
const obj = new List(document.querySelector('#list'))

obj.html = ['aaa', 'bbb', 'cccc']
```

### 18-3 静态属性和静态方法

```javascript
class Person {
  static name = 'Person这个类'
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say() {
    console.log(this.name, this.age)
  }

  static eat() {
    console.log('eat')
  }
}
const obj = new Person('kerwin', 100)

console.log(Person.name)
Person.eat()
```

### 18-4 继承

> ES6 规定，子类必须在`constructor()`方法中调用`super()`，否则就会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用`super()`方法，子类就得不到自己的`this`对象。

```javascript
class Person {
  static name = 'Person这个类'
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say() {
    console.log(this.name, this.age)
  }

  static eat() {
    console.log('eat')
  }
}
class Student extends Person {
  constructor(name, age, score) {
    super(name, age)
    this.score = score
  }

  say() {
    super.say()
    console.log(this.score)
  }

  static eat() {
    super.eat()
    console.log('student eat')
  }
}
const obj = new Student('kerwin', 100, 200)
console.log(obj)
obj.say()
Student.eat()
```

## 19.模块化

> JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。
>
> CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。语法上面，两者最明显的差异是，CommonJS 模块使用`require()`和`module.exports`，ES6 模块使用`import`和`export`。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

**写法1：**

```javascript
import a1 from './1.js'

export default A1
```

**写法2：**

```javascript
import { A1, A2, A1 as a1, A2 as a2 } from './1.js'

import * as obj from './1.js'

export { A1, A2 }
```

```javascript
import { A1, A2, A1 as a1, A2 as a2 } from './1.js'

import * as obj from './1.js'

export function A1() {
  console.log('A1')
}
export function A2() {
  console.log('A2')
}
```

**混合写法：**

```javascript
import A2, { A1 } from './1.js'

export { A1 }
export default A2
```

## 参考资料

> [千锋教育最新版Web前端ES6-ES13教程，JavaScript高级进阶视频教程](https://www.bilibili.com/video/BV1w8411s7g3)
