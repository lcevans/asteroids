function sum() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

// console.log(sum(1, 2, 3, 4));

Function.prototype.myBind = function () {
	var myObj = arguments[0];
	var args = [];
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	var that = this;
	return function () {
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		return that.apply(myObj, args);
	}
}
// var sum2 = .myBind(this, 1,2,3);
// console.log(sum2(4,5));
//
// var cat = {name: "Jeff"}
//
// var namePrint = function (numTimes) {
// 	for (var i = 0; i < numTimes; i++) {
// 	console.log("Hi" + this.name) }
// }
//
// var catName = namePrint.myBind(cat);
// catName(3);

function curriedSum(numArgs) {
	var numbers = [];

	return function _curriedSum (num) {
		numbers.push(num);
		var sum = 0
		if (numbers.length == numArgs) {
			for (var i = 0; i < numbers.length; i++) {
				sum += numbers[i];
			}
			return sum;
		}
		else {
			return _curriedSum;
		}
	}
}

var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));

