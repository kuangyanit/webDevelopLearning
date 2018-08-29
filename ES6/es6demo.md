

# 0. 参考文章

http://es6.ruanyifeng.com/#docs/destructuring
http://www.cnblogs.com/liuhe688/p/5845561.html
https://www.cnblogs.com/libin-1/p/6716470.html

# 1. let & const & var

## 1.1 理解

- var可以理解成全局变量，const、let是局部变量
- let可被修改指向(即引用)，const不可被修改指向
        
### 1.2 例子

    let a = { a: 3 };
    let b = { b: 4 };
    a = b ;  //不报错

    const c = { c:5 };
    const d = { d: 6 };
    c = d; //报错

    for(var e = 0; e<2; e ++) {}
    console.log(e);  //2

# 2. 变量的解构赋值

## 2.1 理解
    
    - 模式匹配

    - 默认值(惰性求值)

    - （数组解构）只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
        

## 2.2 例子

### 2.2.1 数组解构

    let [a0,b0,c0] = [1,2,3];
    let [a1,,c1] = [1,2,3];  //缺省值不会影响解构
    let [a2,...b2] = [1,2,3]; // b = [2,3]; ...为可变长参数
    let [a3,b3,c3,d3] = [1,2,3]; //不完全解构
    let [a4,b4,c4] = [1,2,3,4,5]; //不完全解构

    let [x, y, z] = new Set(['a', 'b', 'c']);
    x // "a"；set支持数组解构

    function* fibs() {
        let a = 0;
        let b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
    let [first, second, third, fourth, fifth, sixth] = fibs();
    sixth // 5

### 2.2.2 默认值

    let [g1=true,...g2] = [,1,2,3];
    let [f1=true] = [undefined]; //true
    let [f2=true] = [null]; //null

    //惰性求值，x可取到值，函数f不会执行
    function f() {
        console.log('aaa');
        return 3;
    }
    let [x = f()] = [1];

    //默认值可以引用解构赋值的其他变量，但该变量必须已经声明
    let [x = 1, y = x] = [];     // x=1; y=1
    let [x = 1, y = x] = [2];    // x=2; y=2
    let [x = 1, y = x] = [1, 2]; // x=1; y=2
    let [x = y, y = 1] = [];     // ReferenceError: y is not defined

### 2.2.3 字符串的解构赋值

    const [a,b,c,d,e] = 'hello';
    a // "h"
    c // "l"

    let { length ： len } = 'hello';
    len // 5

## 2.3 用途

### 2.3.1 交换变量

    let x = 1;
    let y = 2;

    [x,y] = [y,x];

    x // 2
    y // 1

### 2.3.2 从函数返回多个值

    // 返回一个数组
    function example(){
        return [1,2,3];
    }
    let [a,b,c] = example();

    // 返回一个对象
    function example(){
        return {
            foo: 1,
            bar: 2
        };
    }
    let { foo, bar } = example();

### 2.3.3 函数参数的定义

        function f([x, y, z]) { ... }
        f([1,2,3])

        function f({x, y, z}) { .. }
        f({z: 3, y: 2, x: 1})

### 2.3.4 提取json

    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;

    console.log(id, status, number);
    // 42, "OK", [867, 5309]

### 2.3.5 函数默认值

function test(url='defaulturl'){}

### 2.3.6 遍历map结构

    const map = new Map();
    map.set('firstKey','firstValue');
    map.set('secondKey','secondValue');

    for(let [key, value] of map) { ... }
    for(let [key] of map) { .. }
    for(let [,value] of map){ .. }

## 2.4 字符串扩展方法

    includes()：返回布尔值，表示是否找到了参数字符串。
    startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

    let s = 'Hello world!';

    s.startsWith('Hello') // true
    s.endsWith('!') // true
    s.includes('o') // true

    let s = 'Hello world!';

    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false

# 3. 数组扩展

## 3.1 运算符 ...


- 复制数组

    ```` js
    const a1 = [1,2];
    const a2 = a1;
    a2[0] = 2;
    a1 // 2
    ````        

- 合并数组

    ````js
    const arr1 = ['a','b'];  
    const arr2 = ['c','d'];
    let arr = [ ...arr1, 'e', 'f', ...arr2 ];
    ````

- 与解构赋值结合

    ```` js
    const [first,...last] =  [1,2,3];
    first // 1
    last  // [2,3]
    ````

- 字符串
    ````js
    [...'hello']  // ["h","e","l","l","o"]
    `````

## 3.2 Array.from

````js
let arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

// ['1end','2end','3end']
let array = Array.from(arrayLike, x => x + 'end');
````

## 3.3 Array.of()

````js
Array.of(1,2,3);  // [ 1, 2, 3 ]
````

## 3.4 copyWithin()

````js
Array.prototype.copyWithin(target, start = 0, end = this.length)  //定义

[1,2,3,4,5].copyWithin(0,3); // [4,5,3,4,5]
[1,2,3,4,5,].copyWithin(0,3,4); // [4,2,3,4,5]
[1,2,3,4,5].copyWithin(0,-2,-1); // [4,2,3,4,5]
````

## 3.5 find() / findIndex()

````js

[1,2,3,4,5].find(function(value, index, array){
    return value >= 1;
}) //1

[1,2,3,4,5].find((v,i,a) => a && i >= 2 && v >= 3);
// 3


[1,2,3,4,5].findIndex(function(value, index, array){
    return value >= 1;
}) //0

[1,2,3,4,5].findIndex((v,i,a) => a && i >= 2 && v >= 3);
// 2

````
## 3.6 fill()

````js
//参数含义：填充值,填充起始位置,填充结束位置
[1,2,3].fill(1,1,2); // [1,1,3]
````

## 3.7 entries() / keys() / values()

````js
for(let index of ['a','b'].keys()) { ... }
for(let index of ['a','b'].values()) { ... }
for(let [index,elem] of ['a','b'].entries()) { ...}
````

## 3.8 includes()
````js
[1,2,3].includes(2); //true
````

# 4.对象扩展

## 4.1 属性简洁表示法

````js
let birth = '2000/01/01';
const Person = {
  name: '张三',  
  //等同于birth: birth
  birth, 
  //等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
````

## 4.2 属性名表达式
````js
let item = { a: 3, b: 4 };
item['a'] // 3
item.a //3
````

## 4.3 方法的name属性
````js
(function sayName(){console.log('hello')}).name //sayName
````

## 4.4 Object方法

### 4.4.1 is

    ````js
    let item1 = { a: 3 };
    let item2 = { a: 3 };
    let item3 = item1 ;
    Object.is(item1,item3);   
    Object.is(item1,item2);  
    ````
### 4.4.2 assign

- 基本使用
    ````js
    const target = { a: 1, b: 1 };
    const source1 = { b: 2, c: 2 };
    const source2 = { c: 3 };
    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
    ````
- 注意点：
    - Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
        ````js
        Object.assign({b: 'c'},
            Object.defineProperty({}, 'invisible', {
                enumerable: false,
                value: 'hello'
            })
        ) // { b: 'c' }
        ````

    - 浅拷贝 
        > 如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。即这个对象的任何变化，都会反映到目标对象上面

    - 同名属性替换

        ```js
        const target = { a: { b: 'c', d: 'e' } }
        const source = { a: { b: 'hello' } }
        Object.assign(target, source)
        // { a: { b: 'hello' } }
        ````

    - 数组的处理

        ````js
        Object.assign([1, 2, 3], [4, 5])
        // [4, 5, 3]

        Object.assign([1, 2, 3], [,,,4, 5])
        // [1,2,3,4,5]

        ````

    - 取值函数的处理

        ````js
        const source = {
            get foo() { return 1 }
        };
        const target = {};
        
        Object.assign(target, source);  //assign复制函数时会先计算出值在进行复制，此时结果为{ foo: 1 }  
        ````
- 常见用途

    - 为对象添加属性
        ````js
        class Point {
            constructor(x, y) {
                Object.assign(this, {x, y});
            }
        }

        let p = new Point(3,4);
        p.x // 3
        p.y //4
        ````
    - 为对象添加方法
        ````js
        Object.assign(Point.prototype, {
            someMethod(arg1, arg2) { 
                
            },
            anotherMethod() {
                
            }
        });
        ````
    - 克隆对象

        ````js
        //此种方法克隆，只能克隆自身对象的值，不能克隆它继承的值
        function clone(origin) {
            return Object.assign({}, origin);
        }

        //如下方法克隆，可以克隆继承的值
        function clone(origin) {
            let originProto = Object.getPrototypeOf(origin);
            return Object.assign(Object.create(originProto), origin);
        }
        ````
    - 合并多个对象

        ````js
        const merge = (target, ...sources) => Object.assign(target,...sources);
        const merge2 = (...sources) => Object.assign({{},...sources);
        ````
    
    - 为属性指定默认值

        ````js
        const DEFAULTS = {
            logLevel: 0,
            outputFormat: 'html'
        };

        function processContent(options){
            options = Object.assign({}, DEFAULTS, options);
            console.log(options);
        }

        let config = processContent({
            logFileName: 'log.html'
        });

        let config2 = processContent({
            logFileName: 'log.txt',
            outputFormat: 'txt'
        });
        ````

        ````js
        //需要注意嵌套对象时的属性名覆盖
        const DEFAULTS2 = {
            url: {
                host: 'example.com',
                port: 7070
            },
        };
        function processContent2(options){
            options = Object.assign({}, DEFAULTS, options);
            console.log(options);
        }
        processContent2({ url: {port: 8000} });
        ````
### 4.4.3 属性的可枚举性

- 基本用法

    ````js
    //enumerable属性被称为“可枚举性”
    let obj = { foo: 123 };
    Object.getOwnPropertyDescriptor(obj, 'foo')
    //  {
    //    value: 123,
    //    writable: true,
    //    enumerable: true,
    //    configurable: true
    //  }
    ````
- 特殊说明
    - 如下四个操作会忽略enumerable为false的属性：
        - for...in循环：只遍历对象自身的和继承的可枚举的属性。       
        - Object.keys()：返回对象自身的所有可枚举的属性的键名。
        - JSON.stringify()：只串行化对象自身的可枚举的属性。
        - Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
    
    - 对象原型的toString方法及数组的length属性不可枚举

        ````js
        // false
        Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
        // false
        Object.getOwnPropertyDescriptor([], 'length').enumerable
        ````
    
    - es6所有Class原型的方法不可枚举
        ````js
        // false
        Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
        ````

### 4.4.4 属性的遍历

- for..in
- Object.keys(obj)
- Object.getOwnPropertyNames(obj)
- Object.getOwnPropertySymbols(obj)
- Reflect.ownKeys(obj)

### 4.4.5 getOwnPropertyDescriptors

- 引入缘由：Object.assign()无法正确拷贝get属性和set属性

    ````js
    const source = {
    set foo(value) {
        console.log(value);
    }
    };

    const target1 = {};
    Object.assign(target1, source);

    Object.getOwnPropertyDescriptor(target1, 'foo')
    // { value: undefined,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true }

    `````
- 用途1：Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝
    ````js
    const shallowMerge = (target, source) => Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
    );
    const target2 = {};
    shallowMerge(target2,source);
    ````
- 用途2：配合Object.create方法，将对象属性克隆到一个新对象
    ````js
    const shallowClone = obj => Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
    let obj = shallowClone(source);
    ````
### 4.4.6 setPrototypeOf() / getPrototypeOf()
    
````js
// setPrototypeOf
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

// getPrototypeOf
Object.getPrototypeOf(obj);
````

### 4.4.7 super关键字
````js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
````

### 4.4.8 keys / values / entries

````js
let { keys, values, entries } = Object;

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

for (let [, value] of entries(obj)) {
  console.log([, value]); // ['a', 1], ['b', 2], ['c', 3]
}

````

### 4.4.9 扩展运算符 ...

- 基本用法
    ````js
    const [a, ...b] = [1, 2, 3];
    a // 1
    b // [2, 3]
    ````
- 解构赋值
    ````js
    let obj = {
        x: 1,
        y: 2,
        z: 3,
        a: 4
    };
    let { x, y, ...z } = obj;
    z // { z:3, a:4} 
    ````
- 扩展运算符的解构赋值，不能复制继承自原型对象的属性
    ````js
    let o1 = { a: 1 };
    let o2 = { b: 2 };
    o2.__proto__ = o1;
    let { ...o3 } = o2;
    o3 // { b: 2 }
    o3.a // undefined
    ````
# 5. Class的基本用法

## 5.1 this指向

## 5.2 静态方法

### 5.2.1 定义
### 5.2.2 注意点

- 静态方法内this指向类
- 静态方法可被继承
- 静态方法可与实例方法同名
- 静态方法中无法调用实例方法，实例方法中可以调用静态方法
- 可在静态方法中使用super关键字调用静态方法

    ````js
    class Foo{
        static showFoo(){
            console.log('this is showFoo - static');
        }
        static testStaticFunc(){
            Foo.showFoo();
            //this指向类
            this.showFoo();
        }
        showFoo(){
            console.log('this is showFoo');
            Foo.showFoo();
        }

    }
    class FooExtends extends Foo{
        constructor() {
            //super指向类实例
            super();
            super.showFoo();
        }
        static testSuperFunc(){
            //super指向类
            super.showFoo();
        }
    }

    const f = new Foo();

    // this is showFoo
    // this is showFoo - static
    const f1 = new FooExtends();

    // this is showFoo - static
    Foo.showFoo();  

    // this is showFoo - static
    // this is showFoo - static
    Foo.testStaticFunc();  

    // this is showFoo
    // this is showFoo - static
    f.showFoo();

    // this is showFoo - static
    FooExtends.testSuperFunc();
    ````