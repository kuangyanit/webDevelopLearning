class Father {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    show(){
        console.log(`我叫${this.name},今年${this.age}岁`);
    }
}

class Son extends Father{
    constructor(name,age,sex) {
        super(name,age);
        this.sex = sex;
        Father.prototype.protoItem = 'protoItem';
        Object.assign(Son.prototype,{
            showGender(){
                console.log(`我的性别是:${this.sex}`);
            }
        })      
    }
}

class Son2 extends Father{

}

let son = new Son('zs',25,'男');
let son2 = new Son2();
son2.age = 25;
son2.name = 'zs';
let father = new Father('ls',26);
let son3 = father;
let clonedSon = Object.assign({},son);   
let clonedSon2 = Object.assign({},son2);
let clonedSon3 = Object.assign({},son3);


function Parent(){
    this.p_flag = true;
}

Parent.prototype.getFlag = function(){
    return this.p_flag;
}

function Child(){
    this.c_flag = false;
}

Child.prototype = new Parent;

Child.prototype.getChildFlag = function(){
    return this.c_flag;
}

var es5Item = new Child;
var p_flag = es5Item.getFlag();
var c_flag = es5Item.getChildFlag();
var originProto = Object.getPrototypeOf(es5Item);
var es6Item = Object.assign(Object.create(originProto), es5Item);

let person = new class{
    constructor(name){
        this.name = name ;
    }

    sayName(){
        console.log(this.name);
    }
};

class Logger{
    constructor() {
        this.printName = (name = 'there') => {
            console.log(`Hello ${name}`);
        }
    }
}

class Logger{
    printName(name = 'there'){
        console.log('this:' + this);
        // this.print(`Hello ${name}`);
        
    }

    print(text){
        console.log(text);
    }
}

const { printName } = new Logger();
printName();


class Foo{
    static showFoo(){
        console.log('this is showFoo - static');
    }
    static testStaticFunc(){
        Foo.showFoo();
        this.showFoo();
    }
    showFoo(){
        console.log('this is showFoo');
        Foo.showFoo();
    }

}
class FooExtends extends Foo{
    constructor() {
        super();
        super.showFoo();
    }
    static testSuperFunc(){
        super.showFoo();
    }
}