var unwind = require('../index.js');
var assert = require('chai').assert;


describe('mongo-unwind lib', function(){
	it.only('should throw "Only objects are allowed" error' , function(){
		 var arr = [1,23,4];
		assert.throws(function(){
			unwind(arr, '1');
		}, 'Only objects are allowed')
		
	});
	it.skip('should throw "Given params doesnt exist"', function(){
		var obj = {
			a : 1
		}
		assert.throws(function(){
			unwind(obj, 'arr');
		}, 'Given params doesnt exist');
	});
	it('should be able to unwind shallow object', function(){
		
		var obj = {
			a : 1,
			b : 'name',
			arr1 : [1,2,3,4],
			arr2 : [5,6,7,8]
		};

		var arr = unwind(obj, 'arr1');

		console.log('arr :', arr);
		assert.equal(arr.length, obj.arr1.length, 'lengths are not equal');

	});
	it.only('should be able to unwind embedded objects', function(){
		
		var obj = {
			a : 1,
			b : 'name',
			inObj : {
				arr1 : [1,2,3,4],
				name : 'akash'
			}
		};

		var arr = unwind(obj, 'inObj.arr1');

		console.log('arr :', arr);
		assert.equal(arr.length, obj.inObj.arr1.length, 'lengths are not equal');

	});
})

