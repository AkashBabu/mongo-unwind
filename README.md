









# mongo-unwind

A Nodejs library for unwinding an array in an object, just like mongodb's $unwind function

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
```

console.log(JSON.stringify(unwind(obj, 'inObj.innObj.arr2')));
```javascript
[
    {
        "a": 1,
        "b": "name",
        "inObj": {
            "arr1": [
                1,
                2,
                3,
                4
            ],
            "innObj": {
                "arr2": 5
            },
            "name": "akash"
        }
    },
    {
        "a": 1,
        "b": "name",
        "inObj": {
            "arr1": [
                1,
                2,
                3,
                4
            ],
            "innObj": {
                "arr2": 6
            },
            "name": "akash"
        }
    }
]

```

console.log(JSON.stringify(unwind(obj, 'inObj.arr1')));
```javascript
[
    {
        "a": 1,
        "b": "name",
        "inObj": {
            "arr1": 1,
            "innObj": {
                "arr2": [
                    5,
                    6
                ]
            },
            "name": "akash"
        }
    },
    {
        "a": 1,
        "b": "name",
        "inObj": {
            "arr1": 2,
            "innObj": {
                "arr2": [
                    5,
                    6
                ]
            },
            "name": "akash"
        }
    }
]

```

