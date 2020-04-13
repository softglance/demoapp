


// Simple Addition Function in Javascript 
function add(a, b) { 
    return a+b 
    } 
    console.log(add(4, 6)) 

console.log(' arr ')

var arr = [ 1, 2, 2, 3, 4]

// var sortedArr =  arr.filter((val, i ) => arr.indexOf(val) === i )

var sortedArr =  arr.filter((val, i ) => i === 0 ? true : val !== arr[i - 1] )

console.log(' arr ', sortedArr)