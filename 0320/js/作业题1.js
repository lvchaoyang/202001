/*
 * EC(G)变量提升
 *   var a;  
 *      =>声明全局变量，存放到VO(G)
 *      =>声明的全局变量，会给全局对象GO(window)也设置一个相同的属性 window.a，后期不论是全局对象还是全局变量，一个改变，另外一个也会跟着改变（映射机制）
 */
// console.log(a); //=>undefined
// var a = 12;
// a = 13;
// console.log(a); //=>13

/*
 * EC(G)变量提升
 *   --
 */
// console.log(a); //=>在全局中，输出一个变量，首先看其是否为全局变量[VO(G)]，如果不是，则继续观察其是否为全局对象对象[GO->window]中的一个属性，如果也不是则报：变量未定义错误 Uncaught ReferenceError: a is not defined
// a = 13;
// console.log(a);

// window.a = 13; //=>在全局对象GO中设置一个属性
// console.log(a); //=>13   a是GO中的一个属性  => window.a
// a = 14; //=>window.a=14
// console.log(a); //=>14

/*
 * LET 和 VAR 的区别：
 *    1.基于LET/CONST/CLASS/IMPORT等ES6中的方式创建变量，不存在变量提升（也就是只有VAR和FUNCTION有变量提升机制）
 * 
 * EC(G)变量提升
 *    --
 */
// console.log(a); //=>Uncaught ReferenceError: Cannot access 'a' before initialization
// let a = 12;
// a = 13;
// console.log(a);

//==============================================

/* console.log(a, b, c);
var a = 12,
	b = 13,
	c = 14;

function fn(a) {
	console.log(a, b, c);
	a = 100;
	c = 200;
	console.log(a, b, c);
}
b = fn(10);
console.log(a, b, c); */

//==================================================
/* var ary = [12, 23];

function fn(ary) {
	//=> ary是私有的，此时私有ary存储的值(地址)和全局的一致
	console.log(ary);
	ary[0] = 100;
	ary = [100]; //=>让私有的ary指向一个新堆，和全局不是一个堆
	ary[0] = 0;
	console.log(ary);
}
fn(ary);
console.log(ary); */

//===================================================
var i = 0;
function A() {
	/* EC(A1) */
	var i = 10;
	function x() { //=>作用域链只和函数在哪创建有关系  x[[scope]]=EC(A1)
		console.log(i);
	}
	return x;
}
var y = A();  //=>y占用了EC(A1)中的x，EC(A1)则不会出栈释放
y();

function B() {
	var i = 20;
	y();
}
B();