
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
	for(var i = 0; i < keys.length; i++){
		console.assert(keys[i], 'Wrong keyPath');
		if(i < keys.length)
			tempObj = getObj(tempObj, keys[i], false);
		else
			tempObj = getObj(tempObj, keys[i], true);
	}
	return tempObj;
}

function getLastObject(obj, keyPath){
	var keys = keyPath.split('.');
	console.assert(keys[keys.length-1], 'Wrong keyPath');
	keys.splice(-1);
	var tempObj = obj;
	for(var i = 0; i < keys.length; i++){
		console.assert(keys[i], 'Wrong keyPath');
		tempObj = getObj(tempObj, key, false);
	}
	return tempObj;
}



function setValue(obj, keyPath, value){
	var keys = keyPath.split('.');
	getLastObject(obj, keyPath).keys[keys.length - 1] = value;
}

module.exports = function(inObj, keyPath){
	console.assert(inObj.constructor == Object, 'Only objects are allowed');
	console.assert(keyPath, 'keyPath not specified');

	var obj = JSON.parse(JSON.stringify(inObj));
	var arr = getArray(obj, keyPath);	

	var objArr = [];
	var tempObj = {};
	arr.forEach(item => {	
		Object.assign(tempObj, obj);
		//tempObj[params] = item;
		setValue(tempObj, keyPath, item);
		objArr.push(tempObj);		
		tempObj = {};
	})	
	
	return objArr;
}
