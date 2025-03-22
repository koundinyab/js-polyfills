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
/**
 * Write a function myTrim that emulates the behavior of the trim method on strings.
 * The myTrim function should remove whitespace from both ends of the string and return the trimmed string.
 */
String.prototype.myTrim = function () {
    let start = 0;
    let end = this.length - 1;
    while (
        (start < this.length && this[start] === " ") ||
        this[start] === "\t" ||
        this[start] === "\n"
    ) {
        start = start + 1;
    }
    while (
        (end > 0 && this[end] === " ") ||
        this[end] === "\t" ||
        this[end] === "\n"
    ) {
        end = end - 1;
    }

    let result = "";
    for (let i = start; i <= end; i++) {
        result = result + this[i];
    }
    return result;
};
/**
 * Write a function myIncludes that emulates the behavior of the includes method on arrays.
 * The myIncludes function should take a value to search for as its first argument and an optional index from which to search as its second argument.
 * It should return true if the value is found in the array, false otherwise.
 * If an index is provided, the search will start at that index; otherwise, the search will start at index 0.
 */
Array.prototype.myIncludes = function (ele, index) {
    if (index === undefined) index = 0;
    for (let i = index; i < this.length; i++) {
        if (this[i] === ele) {
            return true;
        }
    }
    return false;
};
/**
 * Array.isArray()
 * Your polyfill should return true if the value is an array and false otherwise.
 */
function isArray(value) {
    if (
        typeof value === "object" &&
        value !== null &&
        typeof value.length === "number" &&
        typeof value.push === "function"
    ) {
        return true;
    } else return false;
}
/**
 * Write a polyfill for the Array.from method, which creates a new Array instance from an array-like or iterable object.
 * Your polyfill should accept an array-like or iterable object as the first argument
 * and an optional mapping function as the second argument, and it should return a new Array instance based on the input.
 */
function makeArray(val, mapFunc, thisArg) {
    if (val === null) throw new TypeError("value cannot be null or undefined");
    let result = [];
    let IteratorMethod = val[Symbol.iterator];
    if (typeof IteratorMethod !== "function") {
        throw new TypeError("value must be iterable");
    }
    for (let v of val) {
        result.push(mapFunc ? mapFunc.call(thisArg, v) : v);
    }
    return result;
}
/**
 * Promise po;yfil
 * Implement a polyfill for the Promise object, which represents a value that may not be available yet but will be resolved at some point in the future.
 * Your polyfill should mimic the behavior of native promises, supporting the then, catch, and finally methods.
 */
function mypromise(callBack) {
    let resolvedValue;
    let rejectedValue;
    let isResolved = false;
    let isRejected = false;
    let thenCallBack;
    let finallyCallBack;
    let catchCallBack;
    function myThen(thenCallBack) {
        if (isResolved) {
            thenCallBack(resolvedValue);
        } else {
            thenCallBack = thenCallBack;
        }
        return this;
    }
    function myCatch(catchCallBack) {
        if (isRejected) {
            catchCallBack(rejectedValue);
        } else {
            catchCallBack = catchCallBack;
        }
        return this;
    }
    function myFinally(finallyCallBack) {
        finallyCallBack = finallyCallBack;
        return this;
    }
    function resolve(value) {
        if (!isResolved && !isRejected) {
            resolvedValue = value;
            isResolved = true;
            if (thenCallBack) {
                thenCallBack(resolvedValue);
            }
            if (finallyCallBack) {
                finallyCallBack();
            }
        }
    }
    function reject(reason) {
        if (!isResolved && !isRejected) {
            rejectedValue = reason;
            isRejected = true;
            if (catchCallBack) {
                catchCallBack(reason);
            }
            if (finallyCallBack) {
                finallyCallBack(reason);
            }
        }
    }
    callBack(resolve, reject);
    return {
        myThen,
        myCatch,
        myFinally,
    };
}

/**
 * Implement a polyfill for the Promise.all method, which takes an iterable of promises as an input and returns a single Promise
 * that resolves when all of the input promises have resolved, or rejects with the reason of the first promise that rejects.
 * Your polyfill should return a new Promise that behaves according to the above description.
 */
function myPromiseAll(promiseArr) {
    let returnPromise = new Promise((res, rej) => {
        let result = [];
        let completedCount = 0;
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i]
                .then((val) => {
                    result.push(val);
                    completedCount = completedCount + 1;
                    if (completedCount === promiseArr.length) {
                        res(result);
                    }
                })
                .catch((err) => {
                    result.push(err);
                    rej(result);
                });
        }
    });

    return returnPromise;
}

/**
 * Implement a polyfill for the flat() method on arrays.
 * The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * Your polyfill should mimic this behavior, handling arrays of any depth and flattening them into a single array.
 */
function myFlat(arr, depth) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && depth > 0) {
            result = result.concat(myFlat(arr[i], depth - 1));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

const curryOperation = (operation) => (...args) => {
    let result = args.reduce((acc, num) => acc + num, 0); // Default operation is addition
  
    function curried(...newArgs) {
      // If no arguments are passed, return the result
      if (newArgs.length === 0) {
        return result;
      }
  
      // Apply the operation on the new arguments
      result = newArgs.reduce((acc, num) => operation(acc, num), result);
  
      // Return the curried function for further chaining
      return curried;
    }
  
    return curried;
  };
  
  // Example operations
  const add = (a, b) => a + b;
  const multiply = (a, b) => a * b;
  const subtract = (a, b) => a - b;
  
  // Example usage:
  console.log(curryOperation(add)(2)(2, 3)());       // 7 (Addition)
  console.log(curryOperation(multiply)(2)(2, 3)());  // 12 (Multiplication)
  console.log(curryOperation(subtract)(10)(2, 3)()); // 5 (Subtraction)

  
  const addCurried = (...args) => {
    let sum = 0;
  
    // A closure function to handle the currying and accumulation
    function adder(...newArgs) {
      // If no arguments are passed, return the accumulated sum
      if (newArgs.length === 0) {
        return sum;
      }
  
      // Add new arguments to the sum
      sum += newArgs.reduce((acc, num) => acc + num, 0);
  
      // Return the function to continue currying
      return adder;
    }
  
    // Start the accumulation with the initial arguments
    sum += args.reduce((acc, num) => acc + num, 0);
  
    return adder;
  };
  
  // Example usage:
  console.log(addCurried(2)(2, 3)());      // 7
  console.log(addCurried()(0, 1, 3)());    // 4
  console.log(addCurried(1)(2)(3)(4)());   // 10

  function once(fn) {
    let called = false;
    let result;
  
    return function (...args) {
      if (!called) {
        called = true;
        result = fn.apply(this, args);
      }
      return result;
    };
  }

function debounce(func, wait) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      return func.apply(context, args);
    }, wait);
  };
}

Function.prototype.myCall = function (context, ...args) {
    if (context === null || context === undefined) {
        context = globalThis; // Handles both null and undefined, works in browsers & Node.js
    }

    const tempFn = Symbol(); // Use Symbol to avoid key collision
    context[tempFn] = this;  // Assign 'this' (the function) to the context

    const result = context[tempFn](...args); // Invoke function with provided arguments
    delete context[tempFn]; // Clean up after execution

    return result; // Return the result of function execution
};
  
  
