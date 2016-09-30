var unwind = require('../index.js');

var obj = {
	a : 1,
	b : 'name',
	arr1 : [1,2,3,4],
	arr2 : [5,6,7,8],
	inObj : {
		arr3 : [1,2,3,4],
		c : 'asdf'
	}
};

var arr = unwind(obj, 'inObj.arr3');

console.log('arr :', arr);
