---
title: TS 装饰器
meta:
  - name: description
    content: Decorator是ES7的一个新语法，目前仍处于提案中，nestjs和ArkTS都用到了此语法。
  - name: keywords
    content: TS Decorator, TS 装饰器
---

<route lang="yaml">
meta:
  title: TS 装饰器
  desc: Decorator是ES7的一个新语法，目前仍处于提案中，nestjs和ArkTS都用到了此语法。
  keywords: [TS Decorator, TS 装饰器]
  date: 2023-08-10 20:06:51
</route>

# TS 装饰器

Decorator是ES7的一个新语法，目前仍处于提案中，[nestjs](https://nestjs.com/)和[ArkTS](https://developer.harmonyos.com/)都用到了此语法，在之前学习nestjs的时候，就对此语法有所了解，考虑到ArkTS也用到了此语法，所以就打算复习记录一下。

## 1. 什么是装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，属性，方法或参数上，可以修改类的行为。装饰器以`@`开头，紧接着是一个表达式，这个表达式会在运行时被调用，运行结果会被装饰器使用。

使用装饰器，需要在`tsconfig.json`中开启`experimentalDecorators`配置项：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## 2. 装饰器的分类

装饰器分为：`类装饰器`、`属性装饰器`、`方法装饰器`、`参数装饰器`，它们的声明如下：

```typescript
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => void
```

两种装饰器写法：

> - 普通装饰器（无法传参）
> - 装饰器工厂（可传参），即返回一个函数，该函数会被当作装饰器使用

### 2.1 类装饰器

类装饰器在类声明之前被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。该表达式会在运行时当作函数被调用，类的`构造函数`作为其`唯一`的参数。

主要作用：

#### 2.1.1 类 普通装饰器

```ts
function logClass(target: any) {
  console.log(target)
  // 动态扩展属性
  target.prototype.apiUrl = 'https://www.baidu.com'
  // 动态扩展方法
  target.prototype.logUrl = function () {
    console.log(this.apiUrl)
  }
}

@logClass
class HttpClient {
  constructor() {}
}

const http = new HttpClient()
http.logUrl()
```

输出结果：

```
[Function: HttpClient]
https://www.baidu.com
```

#### 2.1.2 类 装饰器工厂

```ts
function logClass(params: string) {
  return function (target: any) {
    console.log(target)
    // 动态扩展属性
    target.prototype.apiUrl = params
    // 动态扩展方法
    target.prototype.run = function () {
      console.log(this.apiUrl)
    }
  }
}

@logClass('https://www.baidu.com')
class HttpClient {
  constructor() {}
}

const http = new HttpClient()
http.run()
```

输出结果：

```
[Function: HttpClient]
https://www.baidu.com
```


#### 2.1.3 类 装饰器重载构造函数

```ts
function logClass(target: any) {
  console.log(target)
  return class extends target {
    apiUrl: any = '我是修改后的数据'

    getData() {
      console.log(this.apiUrl)
    }
  }
}

@logClass
class HttpClient {
  public apiUrl: string | undefined

  constructor() {
    this.apiUrl = '我是构造函数里面的apiUrl'
  }

  getData() {
    console.log(this.apiUrl)
  }
}

const http = new HttpClient()
http.getData()
```

输出结果：

```
[Function: HttpClient]
我是修改后的数据
```

### 2.2 属性装饰器

属性装饰器声明在一个属性声明之前（紧靠着属性声明）。属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 成员的名字。

#### 2.2.1 属性 普通装饰器

```ts
function logProperty(target: any, attr: any) {
  console.log(target)
  console.log(attr)
  target[attr] = 'https://www.baidu.com'
}

class HttpClient {
  @logProperty
  public url: string | undefined

  constructor() {}
}

const http = new HttpClient()
console.log(http.url)
```

输出结果：

```
[Function: HttpClient]
url
https://www.baidu.com
```

#### 2.2.2 属性 装饰器工厂

```ts
function logProperty(params: string) {
  return function (target: any, attr: any) {
    console.log(target)
    console.log(attr)
    target[attr] = params
  }
}

class HttpClient {
  @logProperty('https://www.baidu.com')
  public url: string | undefined

  constructor() {}
}

const http = new HttpClient()
console.log(http.url)
```

输出结果同上。

### 2.3 方法装饰器

方法装饰器声明在一个方法声明之前（紧靠着方法声明）。它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。方法装饰器表达式会在运行时当作函数被调用，传入下列`3个`参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 成员的名字。
- 成员的属性描述符，可写`writable`，可枚举`enumerable`，可配置`configurable`

#### 2.3.1 方法 普通装饰器

```ts
function logMethod(target: any, methodName: string, desc: PropertyDescriptor) {
  console.log(target)
  console.log(methodName)
  console.log(desc)
  // 修改装饰器方法：把装饰器方法里面传入的所有参数改为string类型
  const oMethod = desc.value
  desc.value = function (...args: any[]) {
    args = args.map(item => String(item))
    console.log(args)
    oMethod.apply(this, args)
  }
}

class HttpClient {
  public url: string | undefined

  constructor() {}

  @logMethod
  public getData(...args: any[]) {
    console.log(args)
    console.log('我是getData里面的方法')
  }
}

const http = new HttpClient()
http.getData(123, 'xxx')
```

输出结果：

```
[Function: HttpClient]
getData
{
  value: [Function: getData],
  writable: true,
  enumerable: false,
  configurable: true
}
[ '123', 'xxx' ]
我是getData里面的方法
```

#### 2.3.2 方法 装饰器工厂

```ts
function logMethod(params: string) {
  return function (target: any, methodName: string, desc: PropertyDescriptor) {
    console.log(target)
    console.log(methodName)
    console.log(desc)

    target.url = params
    const oMethod = desc.value
    // 修改装饰器方法：把装饰器方法里面传入的所有参数改为string类型
    desc.value = function (...args: any[]) {
      args = args.map(item => String(item))
      console.log(args)
      oMethod.apply(this, args)
    }
  }
}

class HttpClient {
  public url: string | undefined

  @logMethod('https://www.baidu.com')
  public getData(...args: any[]) {
    console.log(args)
    console.log('我是getData里面的方法')
  }

  public logUrl() {
    console.log(this.url)
  }
}

const http = new HttpClient()
http.getData(123, 'hello')
http.logUrl()
```

输出结果：

```
[Function: HttpClient]
getData
{
  value: [Function],
  writable: true,
  enumerable: false,
  configurable: true
}
[ '123', 'hello' ]
[ '123', 'hello' ]
我是getData里面的方法
https://www.baidu.com
```

### 2.4 参数装饰器

参数装饰器声明在一个参数声明之前（紧靠着参数声明）。参数装饰器应用于类构造函数或方法声明。参数装饰器表达式会在运行时当作函数被调用，传入下列`3个`参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 成员的名字。
- 参数在函数参数列表中的`索引`。

#### 2.4.1 参数 普通装饰器

```ts
function logParams(target: any, methodName: string, paramsIndex: number) {
  console.log(target)
  console.log(methodName)
  console.log(paramsIndex)
}

class HttpClient {
  constructor() {}

  public getFn(@logParams url: string) {}
}
```

输出结果：

```
[Function: HttpClient]
getFn
0
```

#### 2.4.2 参数 装饰器工厂

```ts
function logParams(params: string) {
  return function (target: any, methodName: string, paramsIndex: number) {
    console.log(target)
    console.log(methodName)
    console.log(paramsIndex)
    target.apiUrl = params
  }
}

class HttpClient {
  public apiUrl: string | undefined
  constructor() {}

  public getFn(@logParams('https://www.baidu.com') url: string) {
    console.log(this.apiUrl)
  }
}

const http = new HttpClient()
http.getFn('')
```

输出结果：

```
[Function: HttpClient]
getFn
0
https://www.baidu.com
```


## 3. 装饰器的执行顺序

```ts
function logClass1(params: any) {
  console.log('logClass1')
}

function logClass2(params: any) {
  console.log('logClass2')
}

function logAttribute1(params: any, params2: any) {
  console.log('logAttribute1')
}

function logAttribute2(params: any, params2: any) {
  console.log('logAttribute2')
}

function logMethod1(params: any, params2: any, params3: any) {
  console.log('logMethod1')
}

function logMethod2(params: any, params2: any, params3: any) {
  console.log('logMethod2')
}

function logParams1(params: any, params2: any, params3: any) {
  console.log('logParams1')
}

function logParams2(params: any, params2: any, params3: any) {
  console.log('logParams2')
}

@logClass1
@logClass2
class HttpClient {
  @logAttribute1
  @logAttribute2
  public url: string | undefined

  constructor() {}

  @logMethod1
  @logMethod2
  public getFn(@logParams1 url: string, @logParams2 params: any) {
    console.log('getFn')
  }
}
```

上面示例中，装饰器的执行顺序是：

```ts
logAttribute2
logAttribute1
logParams2
logParams1
logMethod2
logMethod1
logClass2
logClass1
```

## 4. 装饰器文档

> TS 装饰器：https://www.tslang.cn/docs/handbook/decorators.html
