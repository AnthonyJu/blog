---
title: TS 基础
meta:
  - name: description
    content: TS基础。
  - name: keywords
    content: TS, TypeScript
---

<route lang="yaml">
meta:
  title: TS 基础
  keywords: [TS, TypeScript]
  date: 2023-10-28 19:04:14
</route>

# TS 基础

## 1. 基础类型

```typescript
let str: string = "hello";
let num: number = 26;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let sym: symbol = Symbol("me");
let big: bigint = 100n;
```

> 注意
> 1. 虽然`number`和`bigint`都表示数字，但是这两个类型不兼容。
> 2. `undefined`和`null`是所有类型的子类型，可以赋值给任意类型，但是在`tsconfig.json`中配置了`strictNullChecks`为true时，不能赋值给其他类型。

## 2. Array

数组类型的定义有两种方式：

```typescript
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
```

定义联合类型数组:

```typescript
let arr3: (number | string)[]; // 这个数组中可以存储数字或者字符串
arr3 = [1, 2, 3, "4"];
```

定义指定对象成员的数组：

```typescript
// 定义一个对象类型，后面介绍
interface Obj {
  name: string;
  age: number;
}

let arr4: Obj[] = [
  { name: "jack", age: 18 },
  { name: "tom", age: 19 }
];
```

## 3. Tuple 元组

元组是 TypeScript 中特有的类型，其工作方式类似于数组,元组最重要的特性是可以限制数组元素的个数和类型:

```typescript
let x: [string, number];
// 类型必须匹配且个数必须为2

x = ['hello', 10]; // 正确
x = ['hello', 10,10]; // 错误
x = [10, 'hello']; // 错误
```

## 4. Enum 枚举

枚举类型用于定义数值集合，枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
console.log(c); // 1
```

也可以手动赋值：

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
console.log(c); // 2
```

## 5. Any 任意类型

当我们不知道变量的类型时，可以使用`any`类型，它可以赋值给任意类型：

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // 可以, 没问题, boolean类型
```

## 6. Void 空类型

`void`类型像是与`any`类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是`void`：

```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

## 7. Never 永不存在的值类型

`never`类型表示的是那些永不存在的值的类型。例如，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是`never`类型，当它们被永不为真的类型保护所约束时。

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。即使`any`也不可以赋值给`never`。

## 8. 函数

### 8.1 函数声明

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

### 8.2 函数表达式

```typescript
let myAdd = function(x: number, y: number): number { return x + y; };
```

### 8.3 箭头函数

```typescript
let myAdd: (x: number, y: number) => number =
  function(x: number, y: number): number { return x + y; };
```

### 8.4 可选参数和默认参数

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bob"); // 工作正常
let result2 = buildName("Bob", "Adams", "Sr."); // 错误, 参数过多
let result3 = buildName("Bob", "Adams"); // 嗯，也是可以的
```

```typescript
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // 正常工作，返回 "Bob Smith"
let result2 = buildName("Bob", undefined); // 仍然可以，和没加一样
let result3 = buildName("Bob", "Adams", "Sr."); // 错误, 参数过多
let result4 = buildName("Bob", "Adams"); // 正常，返回 "Bob Adams"
```

> 注意
> 1. 可选参数必须跟在必须参数后面。
> 2. 默认参数不需要跟在必须参数后面。

### 8.5 剩余参数

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

### 8.6 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理：

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

## 9. unknown

`unknown`类型表示未知的类型，它和`any`类型相似，但是`unknown`类型更加严格，`unknown`类型只能赋值给`unknown`和`any`类型，而`any`类型可以赋值给任意类型。

如果不缩小类型，就无法对unknown类型执行任何操作，我们可以使用typeof、类型断言等方式来缩小未知范围。

## 10. 类型断言

类型断言有两种形式。 其一是“尖括号”语法：

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

## 11. 类型别名

类型别名用来给一个类型起个新名字。

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
```

## 12. 字面量类型

字面量类型是指，变量的值可以是某个具体的值，而不是某个范围内的值。

```typescript
let a: 10;
a = 10; // 正确
a = 11; // 错误
```

## 13. 类型推断

当我们没有明确指定变量的类型时，TypeScript 会根据变量的值推断出变量的类型。

```typescript
let a = 10; // a的类型为number
let b = "hello"; // b的类型为string
let c = true; // c的类型为boolean
```

## 14. 类型守卫

类型守卫用来缩小类型范围，常见的类型守卫有：`typeof`类型守卫、`instanceof`类型守卫、自定义类型守卫。

### 14.1 typeof 类型守卫

```typescript
function double(input: string | number | boolean) {
  if (typeof input === "string") {
    return input + input;
  } else if (typeof input === "number") {
    return input * 2;
  } else {
    return !input;
  }
}
```

### 14.2 instanceof 类型守卫

```typescript
class Animal {
  name: string;
}
class Bird extends Animal {
  swing: number;
}
function getName(a: Animal) {
  if (a instanceof Bird) {
    a.swing;
  } else {
    a.name;
  }
}
```

### 14.3 自定义类型守卫

```typescript
function isBird(x: Animal): x is Bird {
  return x instanceof Bird;
}

function getName(a: Animal) {
  if (isBird(a)) {
    a.swing;
  } else {
    a.name;
  }
}
```

## 15. 联合类型

联合类型用来表示一个值可以是几种类型之一，我们用竖线`|`分隔每个类型，例如：

```typescript
let a: string | number;
a = "hello"; // 正确
a = 10; // 正确
a = true; // 错误
```

## 16. 交叉类型

交叉类型用来表示一个对象可以同时拥有多种类型的成员，我们用`&`符号分隔每个类型，例如：

```typescript
interface Bird {
  name: string;
  fly(): void;
}

interface Person {
  name: string;
  talk(): void;
}

type BirdPerson = Bird & Person;

let p: BirdPerson = {
  name: "jack",
  fly() {},
  talk() {}
};
```

## 17. 接口 interface

接口是一种规范的定义，它定义了行为和动作的规范，接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 TypeScript 中的接口类似于 Java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

### 17.1 属性接口

```typescript
interface FullName {
  readonly id: number; // 只读属性
  age?: number; // 可选属性
  firstName: string; // 必填属性
  lastName: string;
}

function printName(name: FullName) {
  console.log(name.firstName + "--" + name.lastName);
}

let obj = {
  age: 20,
  firstName: "jack",
  lastName: "tom"
};

printName(obj);
```

### 17.2 函数类型接口

```typescript
interface encrypt {
  (key: string, value: string): string;
}
```

### 17.3 可索引接口

```typescript
interface UserArr {
  [index: number]: string;
}
```

### 17.4 类类型接口

```typescript
interface Animal {
  name: string;
  eat(str: string): void;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name + "吃粮食");
  }
}
```

### 17.5 接口扩展

```typescript
interface Animal {
  eat(): void;
}

interface Person extends Animal {
  work(): void;
}
```

## 18. 泛型

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 18.1 泛型函数

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, "x"); // ['x', 'x', 'x']
```

### 18.2 泛型接口

```typescript
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;

createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray(3, "x"); // ['x', 'x', 'x']
```

### 18.3 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

### 18.4 泛型约束

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```
