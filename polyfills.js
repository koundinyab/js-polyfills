/**
 * Arra.prototype.forEach()
 * Write a function myForEach that emulates the behavior of the forEach method on arrays.
 * The myForEach function should take a callback function as its only argument and execute that callback function
 * once for each element in the array, passing in the current element, its index, and the array itself as arguments.
 * The myForEach function should return undefined.
 */
Array.prototype.myForEach = function (callBack) {
    for (let i = 0; i < this.length; i++) {
        callBack(this[i], i, this);
    }
};
/**
 * Write a function myMap that emulates the behavior of the map method on arrays.
 * The myMap function should take a callback function as its only argument and
 * return a new array containing the results of applying the callback function to each element in the original array.
 * The original array should remain unchanged.
 */
Array.prototype.mymap = function (callBack) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result[i] = callBack(this[i]);
    }
    return result;
};
/**
 * Write a function myFilter that emulates the behavior of the filter method on arrays.
 * The myFilter function should take a callback function as its only argument and
 * return a new array containing all elements of the original array
 * for which the callback function returns a truthy value. The original array should remain unchanged.
 */
Array.prototype.myFilter = function (callBack) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callBack(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
};
/**
 * Write a function myReduce that emulates the behavior of the reduce method on arrays.
 * The myReduce function should take two arguments: a callback function and an optional initial value.
 * It should then apply the callback function against an accumulator and
 * each element of the array (from left to right) to reduce it to a single value.
 * The initial value (if provided) will be used as the initial value of the accumulator,
 * and if not provided, the first element of the array will be used as the initial value.
 */
Array.prototype.myReduce = function (callBack, intital) {
    if (this.length === 0 && intital === undefined) {
        throw new TypeError("provide initial value");
    }
    let result = intital !== undefined ? intital : this[0];
    let startIndex = intital !== undefined ? 0 : 1;
    for (let i = startIndex; i < this.length; i++) {
        result = callBack(result, this[i], i, this);
    }
    return result;
};
/**
 * Write a function myObjectKeys that emulates the behavior of the Object.keys method.
 * The myObjectKeys function should take an object as its only argument and
 * return an array containing the names of all enumerable properties of the object.
 */
function myObjectKeys(obj) {
    let keys = [];
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
}
/**
 * Write a function myObjectCreate that emulates the behavior of the Object.create method.
 * The myObjectCreate function should take an object as its first argument,
 * which will be used as the prototype of the newly created object.
 * Optionally, it can take a second argument representing properties to be added to the newly created object.
 * The function should return a new object with the specified prototype and properties.
 */
function myObjectCreate(proto, properties) {
    let result = {};
    result = { ...proto };
    if (properties !== undefined) {
        for (let key in properties) {
            if (Object.hasOwnProperty.call(properties, key)) {
                result[key] = properties[key];
            }
        }
    }
    return result;
}
/**
 * Write a function myBind that emulates the behavior of the bind method on functions.
 * The myBind function should take a context object as its first argument (the value of this inside the bound function),
 * followed by any number of arguments to be partially applied to the original function.
 * It should return a new function that, when called, will invoke the original function with the specified context (this value)
 * and any partially applied arguments.
 */
Function.prototype.myBind = function myBind(context, ...args) {
    let originalFunction = this;
    let bound = () => {
        return originalFunction.call(context, ...args);
    };
    return bound;
};
