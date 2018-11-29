# mongo-unwind

A Nodejs library for unwinding an array in an object, just like mongodb's $unwind function

## What's new in version v2.x.x?
* 20x times faster than v1.x.x

## Installation
>   npm install mongo-unwind --save

## Usage

```javascript
var unwind = require('mongo-unwind');
var obj = {
    a : 1,
    b : 'name',
    inObj : {
        arr1 : [1,2,3,4],
        innObj : {
            arr2 : [5,6,7,8]
        },
        name : 'akash'
    }
};
console.log(JSON.stringify(unwind(obj, 'inObj.innObj.arr2')));
// output
// [
//     {
//         "a": 1,
//         "b": "name",
//         "inObj": {
//             "arr1": [
//                 1,
//                 2,
//                 3,
//                 4
//             ],
//             "innObj": {
//                 "arr2": 5
//             },
//             "name": "akash"
//         }
//     },
//     {
//         "a": 1,
//         "b": "name",
//         "inObj": {
//             "arr1": [
//                 1,
//                 2,
//                 3,
//                 4
//             ],
//             "innObj": {
//                 "arr2": 6
//             },
//             "name": "akash"
//         }
//     }
// ]

console.log(JSON.stringify(unwind(obj, 'inObj.arr1')));
// output
// [
//     {
//         "a": 1,
//         "b": "name",
//         "inObj": {
//             "arr1": 1,
//             "innObj": {
//                 "arr2": [
//                     5,
//                     6
//                 ]
//             },
//             "name": "akash"
//         }
//     },
//     {
//         "a": 1,
//         "b": "name",
//         "inObj": {
//             "arr1": 2,
//             "innObj": {
//                 "arr2": [
//                     5,
//                     6
//                 ]
//             },
//             "name": "akash"
//         }
//     }
// ]

```


## Mocha & Chai (Testing)
> npm run test

## Coverage Report
> npm run coverage

## Benchmark
> npm run benchmark


## Contributions
This is open-source, which makes it obvious for any PRs, but I would request you to add necessary test-cases for the same 

## TODOs
- [ ] Use `flat` for better efficiency
