










function getObj(obj, key, last){
	console.assert(obj[key], 'Given param doesnt exist');
	if(!last){
		console.assert(obj[key].constructor == Object, 'Can only unwind an Array inside an Object');
	}else{
		console.assert(obj[key].constructor == Array, 'Specified keyPath is not an Array');
	}
	return obj[key];
}

function getArray(obj, keyPath){
	var keys = keyPath.split('.');
	var tempObj = obj;
	keys.forEach(function(key, i) {
		console.assert(key, 'Wrong keyPath');
		if(i < (keys.length - 1))
			tempObj = getObj(tempObj, key, false);
		else
			tempObj = getObj(tempObj, key, true);
	})
	return tempObj;
}

function getLastObject(obj, keyPath){
	var keys = keyPath.split('.');
	console.assert(keys[keys.length-1], 'Wrong keyPath');
	keys.splice(-1);
	var tempObj = obj;
	keys.forEach(function(key) {
		console.assert(key, 'Wrong keyPath');
		tempObj = getObj(tempObj, key, false);
	})
	return tempObj;
}



function setValue(obj, keyPath, value){
	var keys = keyPath.split('.');
	getLastObject(obj, keyPath)[keys[keys.length - 1]] = value;
}

var unwind = function(inObj, keyPath){
	console.assert(inObj.constructor == Object, 'Only objects are allowed');
	console.assert(keyPath, 'keyPath not specified');

	var arr = getArray(inObj, keyPath);

	var objArr = [];
	var tempObj = {};
	arr.forEach(function(item) {
		tempObj = JSON.parse(JSON.stringify(inObj));
		setValue(tempObj, keyPath, item);
		objArr.push(tempObj);
	})

	return objArr;
}

module.exports = unwind;
