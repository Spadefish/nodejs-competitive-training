// function asyncFunction(callback) {
//     setTimeout(callback, 200)
// }
//
// let color = 'blue'
// asyncFunction(()=> {
//     console.log(`this color is ${color}`)
// })
// color = 'green'

/*
this color is green
 */


/*
用 JavaScript 闭包可以“冻结”color 的值。对 asyncFunction 的调用被封装到了一个以 color 为参数的匿名函数里。这样你就可以马上执行这个匿名函数，把当前的color的值传给它。而 color 变成了匿名函数的参数，也就是这个匿名函数内部的本地变量，当匿名函数外面的 color 值发生变化时，本地版的 color 不会受影响。
 */

function asyncFunction(callback) {
    setTimeout(callback, 200)
}

let color = 'blue'; // 这里要有分号，不然语法会有问题

(color => {
    asyncFunction(() => {
        console.log('The color is', color);
    })
})(color)

color = 'green'
