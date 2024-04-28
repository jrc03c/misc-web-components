(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@jrc03c/js-math-tools/src/math-error.js
  var require_math_error = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/math-error.js"(exports, module) {
      var isBrowser = new Function(`
  try {
    return this === window
  } catch(e) {}

  try {
    return typeof importScripts !== "undefined"
  } catch(e) {}

  return false
`);
      var MathError = class extends Error {
        constructor(message) {
          if (isBrowser()) {
            super(message);
          } else {
            super("\n\n\x1B[31m" + message + "\n\x1B[0m");
          }
        }
      };
      module.exports = MathError;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/assert.js
  var require_assert = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/assert.js"(exports, module) {
      var MathError = require_math_error();
      module.exports = function(isTrue, message) {
        if (!isTrue)
          throw new MathError(message);
      };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-undefined.js
  var require_is_undefined = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-undefined.js"(exports, module) {
      function isUndefined(x) {
        return x === null || typeof x === "undefined";
      }
      module.exports = isUndefined;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/array-types.js
  var require_array_types = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/array-types.js"(exports, module) {
      module.exports = [
        Array,
        ArrayBuffer,
        BigInt64Array,
        BigUint64Array,
        Float32Array,
        Float64Array,
        Int16Array,
        Int32Array,
        Int8Array,
        Uint16Array,
        Uint32Array,
        Uint8Array,
        Uint8ClampedArray
      ];
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-array.js
  var require_is_array = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-array.js"(exports, module) {
      var isUndefined = require_is_undefined();
      var types = require_array_types();
      var typeStrings = types.map((s) => s.name);
      function isArray(obj) {
        try {
          if (obj instanceof Array) {
            return true;
          }
          if (!isUndefined(obj.constructor)) {
            return types.indexOf(obj.constructor) > -1 || typeStrings.indexOf(obj.constructor.name) > -1;
          }
          return false;
        } catch (e) {
          return false;
        }
      }
      module.exports = isArray;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-dataframe.js
  var require_is_dataframe = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-dataframe.js"(exports, module) {
      function isDataFrame(x) {
        try {
          return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/dataframe");
        } catch (e) {
          return false;
        }
      }
      module.exports = isDataFrame;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-function.js
  var require_is_function = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-function.js"(exports, module) {
      function isFunction(fn) {
        return typeof fn === "function";
      }
      module.exports = isFunction;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-number.js
  var require_is_number = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-number.js"(exports, module) {
      function isNumber(x) {
        return typeof x === "number" && !isNaN(x);
      }
      module.exports = isNumber;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-object.js
  var require_is_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-object.js"(exports, module) {
      var isArray = require_is_array();
      var isUndefined = require_is_undefined();
      function isObject(x) {
        return typeof x === "object" && !isUndefined(x) && !isArray(x);
      }
      module.exports = isObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-series.js
  var require_is_series = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-series.js"(exports, module) {
      function isSeries(x) {
        try {
          return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/series");
        } catch (e) {
          return false;
        }
      }
      module.exports = isSeries;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/index-of.js
  var require_index_of = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/index-of.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isNumber = require_is_number();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      function indexOf(x, fn) {
        if (isDataFrame(x)) {
          const index = indexOf(x.values, fn);
          if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
            index[0] = x.index[index[0]];
          }
          if (index.length > 1 && isNumber(index[1]) && index[1] >= 0 && index[1] < x.columns.length) {
            index[1] = x.columns[index[1]];
          }
          return index;
        }
        if (isSeries(x)) {
          const index = indexOf(x.values, fn);
          if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
            index[0] = x.index[index[0]];
          }
          return index;
        }
        assert(
          isObject(x) || isArray(x),
          "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `indexOf` function!"
        );
        if (!isFunction(fn)) {
          const value = fn;
          fn = (v) => v === value;
        }
        function helper(x2, fn2, checked) {
          checked = checked || [];
          if (checked.indexOf(x2) > -1) {
            return null;
          }
          if (isObject(x2)) {
            checked.push(x2);
            const keys = Object.keys(x2).concat(Object.getOwnPropertySymbols(x2));
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              const value = x2[key];
              if (fn2(value)) {
                return [key];
              }
              const results = helper(value, fn2, checked);
              if (results && results.length > 0) {
                return [key].concat(results);
              }
            }
          } else if (isArray(x2)) {
            checked.push(x2);
            for (let i = 0; i < x2.length; i++) {
              const value = x2[i];
              if (fn2(value)) {
                return [i];
              }
              const results = helper(value, fn2, checked);
              if (results && results.length > 0) {
                return [i].concat(results);
              }
            }
          } else {
            if (fn2(x2)) {
              return [];
            }
          }
          return null;
        }
        function safeFn(v) {
          try {
            return fn(v);
          } catch (e) {
            return false;
          }
        }
        const paths = helper(x, safeFn);
        if (paths && paths.length > 0) {
          return paths;
        } else {
          return null;
        }
      }
      module.exports = indexOf;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/copy.js
  var require_copy = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/copy.js"(exports, module) {
      var indexOf = require_index_of();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function copy(x) {
        function helper(x2) {
          if (typeof x2 === "object") {
            if (x2 === null) {
              return null;
            }
            if (isArray(x2)) {
              if (!(x2 instanceof Array)) {
                return x2.slice();
              }
              return x2.map((v) => copy(v));
            }
            if (isSeries(x2)) {
              const out2 = x2.copy();
              out2.values = copy(out2.values);
              return out2;
            }
            if (isDataFrame(x2)) {
              const out2 = x2.copy();
              out2.values = copy(x2.values);
              return out2;
            }
            if (x2 instanceof Date) {
              return new Date(x2.getTime());
            }
            x2 = decycle(x2);
            const out = {};
            Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
              out[key] = copy(x2[key]);
            });
            return out;
          } else {
            return x2;
          }
        }
        return helper(decycle(x));
      }
      function decycle(x) {
        function helper(x2, checked, currentPath) {
          checked = checked || [];
          currentPath = currentPath || "";
          if (checked.indexOf(x2) > -1) {
            const parts = currentPath.split("/").slice(currentPath.startsWith("/") ? 1 : 0);
            const isANestedCopy = parts.some((v, i) => {
              const subParts = parts.slice(0, parts.length - i - 1);
              let temp = orig;
              subParts.forEach((part) => {
                temp = temp[part];
              });
              return temp === x2;
            });
            if (isANestedCopy) {
              const pathToCopy = orig === x2 ? "/" : "/" + indexOf(orig, x2).join("/");
              return `<reference to "${pathToCopy}">`;
            }
          }
          if (typeof x2 === "object") {
            if (x2 === null)
              return null;
            checked.push(x2);
            if (isArray(x2)) {
              if (typeof x2.constructor !== "undefined" && x2.constructor.name !== "Array") {
                return x2.slice();
              }
              return x2.map((v, i) => helper(v, checked, currentPath + "/" + i));
            } else {
              Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
                x2[key] = helper(x2[key], checked, currentPath + "/" + key.toString());
              });
              return x2;
            }
          } else {
            return x2;
          }
        }
        const orig = x;
        let out = helper(orig);
        if (isDataFrame(x)) {
          const temp = x.copy();
          temp._values = out.values;
          temp._columns = out.columns;
          temp._index = out.index;
          out = temp;
        }
        if (isSeries(x)) {
          const temp = x.copy();
          temp.name = out.name;
          temp._values = out.values;
          temp._index = out.index;
          out = temp;
        }
        return out;
      }
      module.exports = { copy, decycle };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/flatten.js
  var require_flatten = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/flatten.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function flatten(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return flatten(arr.values);
        }
        assert(
          isArray(arr),
          "The `flatten` function only works on arrays, Series, and DataFrames!"
        );
        function helper(arr2) {
          let out = [];
          arr2.forEach((child) => {
            if (isArray(child)) {
              out = out.concat(helper(child));
            } else {
              out.push(child);
            }
          });
          return out;
        }
        return helper(arr);
      }
      module.exports = flatten;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-date.js
  var require_is_date = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-date.js"(exports, module) {
      function isDate(x) {
        return x instanceof Date && x.toString() !== "Invalid Date";
      }
      module.exports = isDate;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-equal.js
  var require_is_equal = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-equal.js"(exports, module) {
      var { decycle } = require_copy();
      var isArray = require_is_array();
      var isDate = require_is_date();
      function isEqual(a, b) {
        function helper(a2, b2) {
          const aType = typeof a2;
          const bType = typeof b2;
          if (aType !== bType)
            return false;
          if (aType === "undefined")
            return true;
          if (aType === "boolean")
            return a2 === b2;
          if (aType === "symbol")
            return a2 === b2;
          if (aType === "number" || aType === "bigint") {
            if (a2.toString() === "NaN" && b2.toString() === "NaN") {
              return true;
            }
            return a2 === b2;
          }
          if (aType === "string")
            return a2 === b2;
          if (aType === "function")
            return a2 === b2;
          if (aType === "object") {
            if (a2 === null || b2 === null) {
              return a2 === null && b2 === null;
            } else {
              if (isDate(a2)) {
                if (isDate(b2)) {
                  return a2.getTime() === b2.getTime();
                } else {
                  return false;
                }
              } else if (isDate(b2)) {
                return false;
              }
              if (isArray(a2) !== isArray(b2)) {
                return false;
              }
              const aKeys = Object.keys(a2).concat(Object.getOwnPropertySymbols(a2));
              const bKeys = Object.keys(b2).concat(Object.getOwnPropertySymbols(b2));
              if (aKeys.length !== bKeys.length)
                return false;
              for (let i = 0; i < aKeys.length; i++) {
                const key = aKeys[i];
                if (!helper(a2[key], b2[key]))
                  return false;
              }
              return true;
            }
          }
        }
        try {
          return helper(a, b);
        } catch (e) {
          return helper(decycle(a), decycle(b));
        }
      }
      module.exports = isEqual;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/set.js
  var require_set = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/set.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function makeKey(n) {
        const alpha = "abcdefg1234567890";
        let out = "";
        while (out.length < n)
          out += alpha[parseInt(Math.random() * alpha.length)];
        return out;
      }
      var NULL_KEY = makeKey(256);
      var UNDEFINED_KEY = makeKey(256);
      var INFINITY_KEY = makeKey(256);
      var MINUS_INFINITY_KEY = makeKey(256);
      var SYMBOL_KEY = makeKey(256);
      function set(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return set(arr.values);
        }
        assert(
          isArray(arr),
          "The `set` function only works on arrays, Series, and DataFrames!"
        );
        const out = [];
        const temp = {};
        flatten(arr).forEach((item) => {
          const key = typeof item === "object" && item === null ? NULL_KEY : isUndefined(item) ? UNDEFINED_KEY : isFunction(item) ? item.toString() : typeof item === "symbol" ? item.toString() + " - " + SYMBOL_KEY : item === Infinity ? INFINITY_KEY : item === -Infinity ? MINUS_INFINITY_KEY : isDataFrame(item) ? item.toJSONString() : isSeries(item) ? JSON.stringify(item.toObject()) : JSON.stringify(item);
          if (!temp[key])
            out.push(item);
          temp[key] = true;
        });
        return out;
      }
      module.exports = set;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/count.js
  var require_count = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/count.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var set = require_set();
      function count(arr, matcher) {
        if (isDataFrame(arr) || isSeries(arr)) {
          if (arguments.length > 1) {
            return count(arr.values, matcher);
          } else {
            return count(arr.values, arr.values);
          }
        }
        assert(
          isArray(arr),
          "The first argument to the `count` function must be an array, Series, or DataFrame!"
        );
        if (isFunction(matcher)) {
          return flatten(arr).filter((value) => matcher(value)).length;
        } else if (isArray(matcher)) {
          const temp = flatten(arr);
          return set(matcher).map((value) => {
            return {
              value,
              count: temp.filter((v) => isEqual(v, value)).length
            };
          });
        } else if (arguments.length > 1) {
          return flatten(arr).filter((other) => isEqual(other, matcher)).length;
        } else {
          return count(arr, arr);
        }
      }
      module.exports = count;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-jagged.js
  var require_is_jagged = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-jagged.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function isJagged(x) {
        if (isDataFrame(x) || isSeries(x)) {
          return isJagged(x.values);
        }
        assert(
          isArray(x),
          "The `isJagged` function only works on arrays, Series, and DataFrames!"
        );
        let childArrayCount = 0;
        let firstChildArrayLength = null;
        for (let i = 0; i < x.length; i++) {
          if (isArray(x[i])) {
            childArrayCount++;
            if (isJagged(x[i])) {
              return true;
            }
            if (firstChildArrayLength === null) {
              firstChildArrayLength = x[i].length;
            } else if (x[i].length !== firstChildArrayLength) {
              return true;
            }
          }
        }
        if (childArrayCount > 0 && childArrayCount < x.length) {
          return true;
        }
        return false;
      }
      module.exports = isJagged;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-nested.js
  var require_is_nested = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-nested.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function isNested(x) {
        if (isDataFrame(x) || isSeries(x)) {
          return isNested(x.values);
        }
        assert(
          isArray(x),
          "The `isNested` function only works on arrays, Series, and DataFrames!"
        );
        for (let i = 0; i < x.length; i++) {
          if (isArray(x[i])) {
            return true;
          }
        }
        return false;
      }
      module.exports = isNested;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/ndarray.js
  var require_ndarray = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/ndarray.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNested = require_is_nested();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var error = "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!";
      function ndarray(shape) {
        assert(!isUndefined(shape), error);
        if (!isArray(shape))
          shape = [shape];
        assert(!isNested(shape), error);
        assert(shape.length > 0, error);
        const s = shape[0];
        assert(isNumber(s), error);
        assert(parseInt(s) === s, error);
        assert(s >= 0, error);
        assert(
          s !== Infinity,
          "We can't create an array containing an infinite number of values!"
        );
        if (shape.length === 1) {
          const out = [];
          for (let i = 0; i < s; i++)
            out.push(void 0);
          return out;
        } else {
          const out = [];
          for (let i = 0; i < s; i++) {
            out.push(ndarray(shape.slice(1)));
          }
          return out;
        }
      }
      module.exports = ndarray;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/reverse.js
  var require_reverse = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/reverse.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function reverse(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          const out2 = arr.copy();
          out2.values = reverse(out2.values);
          out2.index = reverse(out2.index);
          return out2;
        }
        assert(
          isArray(arr),
          "The `reverse` function only works on arrays, Series, and DataFrames!"
        );
        const out = [];
        for (let i = arr.length - 1; i >= 0; i--)
          out.push(arr[i]);
        return out;
      }
      module.exports = reverse;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/range.js
  var require_range = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/range.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var reverse = require_reverse();
      function range(a, b, step = 1) {
        assert(
          !isUndefined(a) && !isUndefined(b) && !isUndefined(step),
          "You must pass two numbers and optionally a step value to the `range` function!"
        );
        assert(
          isNumber(a) && isNumber(b) && isNumber(step),
          "You must pass two numbers and optionally a step value to the `range` function!"
        );
        assert(
          step > 0,
          "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)"
        );
        let shouldReverse = false;
        if (a > b) {
          shouldReverse = true;
          const buffer = a;
          a = b + step;
          b = buffer + step;
        }
        let out = [];
        for (let i = a; i < b; i += step)
          out.push(i);
        if (shouldReverse)
          out = reverse(out);
        return out;
      }
      module.exports = range;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/shape.js
  var require_shape = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/shape.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function helper(x) {
        if (!isArray(x)) {
          return void 0;
        }
        const out = [x.length];
        let childArrayCount = 0;
        const childShapes = x.map((v) => {
          const s = helper(v);
          if (!isUndefined(s)) {
            childArrayCount++;
            if (s.length === 1) {
              return s[0];
            } else {
              return s;
            }
          } else {
            return s;
          }
        });
        if (childArrayCount > 0) {
          if (childArrayCount === x.length) {
            const childShapesAreIdentical = childShapes.slice(0, -1).every((s, i) => {
              return isEqual(s, childShapes[i + 1]);
            });
            if (childShapesAreIdentical) {
              return out.concat(childShapes[0]);
            } else {
              out.push(childShapes);
              return out;
            }
          } else {
            out.push(childShapes);
            return out;
          }
        } else {
          return out;
        }
      }
      function shape(x) {
        if (isDataFrame(x) || isSeries(x)) {
          return shape(x.values);
        }
        assert(
          isArray(x),
          "The `shape` function only works on arrays, Series, and DataFrames!"
        );
        return helper(x);
      }
      module.exports = shape;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-append.js
  var require_df_append = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-append.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isJagged = require_is_jagged();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var MathError = require_math_error();
      var ndarray = require_ndarray();
      var range = require_range();
      var set = require_set();
      var shape = require_shape();
      function dfAppend(df, x, axis) {
        if (isUndefined(axis)) {
          axis = 0;
        }
        assert(
          axis === 0 || axis === 1 || axis === "vertical" || axis === "horizontal",
          'The only valid axis values for use when appending data to a DataFrame are 0, 1, "vertical", and "horizontal". Note that 0 == "horizontal" and 1 == "vertical".'
        );
        if (isArray(x)) {
          assert(
            !isJagged(x),
            "The array of data you're trying to append to this DataFrame is jagged!"
          );
          const xShape = shape(x);
          if (xShape.length === 1) {
            if (axis === 0) {
              const out = df.copy();
              out._values.push(x);
              const maxRowLength = Math.max(df.shape[1], xShape[0]);
              out._values.forEach((row) => {
                while (row.length < maxRowLength) {
                  row.push(void 0);
                }
              });
              while (out._index.length < out._values.length) {
                out._index.push("row" + out._index.length);
              }
              while (out._columns.length < maxRowLength) {
                out._columns.push("col" + out._columns.length);
              }
              return out;
            } else {
              const maxColLength = Math.max(df.shape[0], xShape[0]);
              const out = df.copy();
              range(0, maxColLength).forEach((i) => {
                if (i >= out._values.length) {
                  out._values.push(ndarray(df.shape[1]));
                }
                out._values[i].push(x[i]);
              });
              while (out._index.length < out._values.length) {
                out._index.push("row" + out._index.length);
              }
              while (out._columns.length < out._values[0].length) {
                out._columns.push("col" + out._columns.length);
              }
              return out;
            }
          } else if (xShape.length === 2) {
            if (axis === 0) {
              const maxRowLength = Math.max(
                ...x.map((row) => row.length).concat([df.shape[1]])
              );
              const out = df.copy();
              out._values = out._values.concat(x).map((row) => {
                while (row.length < maxRowLength) {
                  row.push(void 0);
                }
                return row;
              });
              while (out._index.length < out._values.length) {
                out._index.push("row" + out._index.length);
              }
              while (out._columns.length < maxRowLength) {
                out._columns.push("col" + out._columns.length);
              }
              return out;
            } else {
              const maxRowLength = Math.max(...x.map((row) => row.length)) + df.shape[1];
              const maxColLength = Math.max(df.shape[0], xShape[0]);
              const out = df.copy();
              range(0, maxColLength).forEach((i) => {
                if (i >= out._values.length) {
                  out._values.push(ndarray(df.shape[1]));
                }
                out._values[i] = out._values[i].concat(x[i]);
                while (out._values[i].length < maxRowLength) {
                  out._values[i].push(void 0);
                }
              });
              while (out._index.length < out._values.length) {
                out._index.push("row" + out._index.length);
              }
              while (out._columns.length < maxRowLength) {
                out._columns.push("col" + out._columns.length);
              }
              return out;
            }
          } else {
            throw new MathError(
              "Only 1- and 2-dimensional arrays can be appended to a DataFrame!"
            );
          }
        } else if (isSeries(x)) {
          const out = dfAppend(df, x.values, axis);
          if (axis === 0) {
            out.index[out.index.length - 1] = out.index.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
          } else {
            out.columns[out.columns.length - 1] = out.columns.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
          }
          return out;
        } else if (isDataFrame(x)) {
          if (axis === 0) {
            const out = df.copy();
            const maxRowLength = set(out._columns.concat(x._columns)).length;
            out._values.forEach((row) => {
              while (row.length < maxRowLength) {
                row.push(void 0);
              }
            });
            x.apply((row) => {
              const rowCopy = row.copy();
              const temp = [];
              out._columns.forEach((col) => {
                const index = rowCopy._index.indexOf(col);
                if (index > -1) {
                  temp.push(rowCopy._values[index]);
                  rowCopy._values.splice(index, 1);
                  rowCopy._index.splice(index, 1);
                } else {
                  temp.push(void 0);
                }
              });
              out._values.push(temp.concat(rowCopy._values));
            }, 1);
            out._columns = out._columns.concat(
              x._columns.filter((c) => out._columns.indexOf(c) < 0)
            );
            while (out._index.length < out._values.length) {
              const newRowName = "row" + out._index.length;
              out._index.push(
                newRowName + (df._index.indexOf(newRowName) > -1 ? " (2)" : "")
              );
            }
            return out;
          } else {
            const out = df.copy();
            out._index.forEach((rowName, i) => {
              const xIndex = x._index.indexOf(rowName);
              if (xIndex > -1) {
                out._values[i] = out._values[i].concat(x._values[xIndex]);
              } else {
                out._values[i] = out._values[i].concat(ndarray(x.shape[1]));
              }
            });
            x._index.forEach((rowName, i) => {
              const outIndex = out._index.indexOf(rowName);
              if (outIndex < 0) {
                out._index.push(rowName);
                out._values.push(ndarray(out._columns.length).concat(x._values[i]));
              }
            });
            out._columns = out._columns.concat(
              x._columns.map((c) => c + (out._columns.indexOf(c) > -1 ? " (2)" : ""))
            );
            return out;
          }
        } else {
          throw new MathError(
            "Only 1- or 2-dimensional arrays, Series, and DataFrames can be appended to a DataFrame!"
          );
        }
      }
      module.exports = dfAppend;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-apply.js
  var require_df_apply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-apply.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
      function dfApply(DataFrame, Series, df, fn, axis) {
        axis = axis || 0;
        assert(
          isFunction(fn),
          "The first parameter to the `apply` method must be a function."
        );
        assert(
          axis === 0 || axis === 1,
          "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
        );
        if (axis === 0) {
          const temp = {};
          let shouldReturnADataFrame;
          df.columns.forEach((colName, i) => {
            const series = new Series(df.values.map((row) => row[i]));
            series.name = colName;
            series.index = df.index;
            const value = fn(series, i, df);
            if (value instanceof Series) {
              temp[colName] = value.values;
            } else {
              temp[colName] = value;
            }
            if (isUndefined(shouldReturnADataFrame)) {
              shouldReturnADataFrame = value instanceof Series || isArray(value);
            }
          });
          if (shouldReturnADataFrame) {
            const out = new DataFrame(temp);
            out.index = df.index;
            return out;
          } else {
            const out = new Series(df.columns.map((colName) => temp[colName]));
            out.index = df.columns;
            return out;
          }
        } else if (axis === 1) {
          let shouldReturnADataFrame;
          const temp = df.values.map((row, i) => {
            const series = new Series(row);
            series.name = df.index[i];
            series.index = df.columns;
            const value = fn(series, i, df);
            if (isUndefined(shouldReturnADataFrame)) {
              shouldReturnADataFrame = value instanceof Series || isArray(value);
            }
            if (value instanceof Series) {
              return value.values;
            } else {
              return value;
            }
          });
          if (shouldReturnADataFrame) {
            const out = new DataFrame(temp);
            out.index = df.index;
            out.columns = df.columns;
            return out;
          } else {
            const out = new Series(temp);
            out.index = df.index;
            return out;
          }
        }
      }
      module.exports = dfApply;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-string.js
  var require_is_string = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-string.js"(exports, module) {
      function isString(s) {
        return typeof s === "string";
      }
      module.exports = isString;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-assign.js
  var require_df_assign = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-assign.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isJagged = require_is_jagged();
      var isObject = require_is_object();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var MathError = require_math_error();
      var shape = require_shape();
      function dfAssign(DataFrame, Series, df, p1, p2) {
        const isDataFrame = (x) => x instanceof DataFrame;
        const isSeries = (x) => x instanceof Series;
        if (!isUndefined(p2)) {
          assert(
            isString(p1),
            "If passing two arguments into the `assign` method, then the first argument must be a string name!"
          );
          assert(
            isArray(p2) && !isJagged(p2) && shape(p2).length === 1,
            "If passing two arguments into the `assign` method, then the second argument must be a 1-dimensional array!"
          );
          const out = df.append(p2, 1);
          out.columns[out.columns.length - 1] = p1;
          return out;
        } else {
          if (isDataFrame(p1)) {
            return df.append(p1, 1);
          } else if (isSeries(p1)) {
            return df.append(p1, 1);
          } else if (isObject(p1)) {
            const maxColumnLength = Math.max(
              ...Object.keys(p1).concat(Object.getOwnPropertySymbols(p1)).map((key) => p1[key].length)
            );
            Object.keys(p1).concat(Object.getOwnPropertySymbols(p1)).forEach((key) => {
              while (p1[key].length < maxColumnLength) {
                p1[key].push(void 0);
              }
            });
            return df.append(new DataFrame(p1), 1);
          } else {
            throw new MathError(
              "You must pass a DataFrame, Series, or object into the `assign` method!"
            );
          }
        }
      }
      module.exports = dfAssign;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-copy.js
  var require_df_copy = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-copy.js"(exports, module) {
      var { copy } = require_copy();
      function dfCopy(DataFrame, df) {
        if (df.isEmpty)
          return new DataFrame();
        const out = new DataFrame(copy(df.values));
        out.columns = df.columns.slice();
        out.index = df.index.slice();
        return out;
      }
      module.exports = dfCopy;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop.js
  var require_df_drop = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function dfDrop(DataFrame, Series, df, rows, cols) {
        if (isUndefined(rows))
          rows = [];
        if (isUndefined(cols))
          cols = [];
        if (isString(rows) || isNumber(rows))
          rows = [rows];
        if (isString(cols) || isNumber(cols))
          cols = [cols];
        assert(
          isArray(rows),
          "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
        );
        assert(
          isArray(cols),
          "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
        );
        assert(
          shape(rows).length === 1,
          "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
        );
        assert(
          shape(cols).length === 1,
          "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
        );
        let outIndex, outColumns;
        df.index.forEach((row, i) => {
          if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
            if (!outIndex)
              outIndex = [];
            outIndex.push(row);
          }
        });
        df.columns.forEach((col, i) => {
          if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
            if (!outColumns)
              outColumns = [];
            outColumns.push(col);
          }
        });
        let out = df.get(outIndex, outColumns);
        if (out instanceof Series) {
          let temp = new DataFrame();
          temp = temp.assign(out);
          if (df.index.indexOf(out.name) > -1)
            temp = temp.transpose();
          out = temp;
        }
        return out;
      }
      module.exports = dfDrop;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-whole-number.js
  var require_is_whole_number = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/is-whole-number.js"(exports, module) {
      var isNumber = require_is_number();
      function isInteger(x) {
        return isNumber(x) && parseInt(x) === x;
      }
      function isWholeNumber(x) {
        return isInteger(x) && x >= 0;
      }
      module.exports = isWholeNumber;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-missing.js
  var require_df_drop_missing = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-missing.js"(exports, module) {
      var assert = require_assert();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var shape = require_shape();
      function dfDropMissing(DataFrame, Series, df, axis, condition, threshold) {
        axis = axis || 0;
        assert(
          axis === 0 || axis === 1,
          "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."
        );
        threshold = threshold || 0;
        assert(
          isWholeNumber(threshold),
          "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."
        );
        condition = threshold > 0 ? "none" : condition || "any";
        assert(
          condition === "any" || condition === "all" || condition === "none",
          "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped)."
        );
        function helper(values) {
          if (threshold > 0) {
            let count = 0;
            for (let i = 0; i < values.length; i++) {
              const value = values[i];
              if (isUndefined(value))
                count++;
              if (count >= threshold)
                return [];
            }
          } else if (condition === "any") {
            for (let i = 0; i < values.length; i++) {
              const value = values[i];
              if (isUndefined(value))
                return [];
            }
          } else if (condition === "all") {
            for (let i = 0; i < values.length; i++) {
              const value = values[i];
              if (!isUndefined(value))
                return values;
            }
            return [];
          }
          return values;
        }
        let out = df.copy();
        const tempID = Math.random().toString();
        if (axis === 0) {
          out = out.assign(tempID, out.index);
          const newValues = out.values.map(helper).filter((row) => row.length > 0);
          if (shape(newValues).length < 2)
            return new DataFrame();
          out.values = newValues;
          let newIndex = out.get(null, tempID);
          if (isUndefined(newIndex))
            return new DataFrame();
          if (isString(newIndex))
            newIndex = [newIndex];
          if (newIndex instanceof Series)
            newIndex = newIndex.values;
          out.index = newIndex;
          out = out.drop(null, tempID);
        } else if (axis === 1) {
          const temp = {};
          out.columns.forEach((colName, i) => {
            const values = out.values.map((row) => row[i]);
            const newValues = helper(values);
            if (newValues.length > 0) {
              temp[colName] = newValues;
            }
          });
          if (Object.keys(temp).length + Object.getOwnPropertySymbols(temp).length === 0) {
            return new DataFrame();
          }
          const newOut = new DataFrame(temp);
          newOut.index = out.index;
          return newOut;
        }
        return out;
      }
      module.exports = dfDropMissing;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-nan.js
  var require_drop_nan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-nan.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      function dropNaN(x) {
        if (isDataFrame(x) || isSeries(x)) {
          return x.dropNaN(...Object.values(arguments).slice(1));
        }
        assert(
          isArray(x),
          "The `dropNaN` function only works on arrays, Series, and DataFrames!"
        );
        const out = [];
        x.forEach((v) => {
          try {
            return out.push(dropNaN(v));
          } catch (e) {
            if (isNumber(v)) {
              return out.push(v);
            }
          }
        });
        return out;
      }
      module.exports = dropNaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-nan.js
  var require_df_drop_nan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-nan.js"(exports, module) {
      var assert = require_assert();
      var dropNaN = require_drop_nan();
      var isWholeNumber = require_is_whole_number();
      function dfDropNaN(DataFrame, df, axis, condition, threshold) {
        axis = axis || 0;
        assert(
          axis === 0 || axis === 1,
          "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1."
        );
        threshold = threshold || 0;
        assert(
          isWholeNumber(threshold),
          "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values)."
        );
        condition = threshold > 0 ? "none" : condition || "any";
        assert(
          condition === "any" || condition === "all" || condition === "none",
          "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped)."
        );
        function helper(values) {
          const numericalValues = dropNaN(values);
          if (threshold > 0)
            return values.length - numericalValues.length < threshold;
          if (condition === "any")
            return numericalValues.length === values.length;
          if (condition === "all")
            return numericalValues.length > 0;
          return true;
        }
        const out = df.copy();
        if (axis === 0) {
          const rowsToKeep = out.index.filter((row) => {
            const values = out.get(row, null).values;
            return helper(values);
          });
          if (rowsToKeep.length > 0)
            return out.get(rowsToKeep, null);
          else
            return new DataFrame();
        } else if (axis === 1) {
          const colsToKeep = out.columns.filter((col) => {
            const values = out.get(null, col).values;
            return helper(values);
          });
          if (colsToKeep.length > 0)
            return out.get(null, colsToKeep);
          else
            return new DataFrame();
        }
        return out;
      }
      module.exports = dfDropNaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.js
  var require_df_filter = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
      function arrayToObject(x) {
        const out = {};
        flatten(x).forEach((value, i) => {
          out[value] = i;
        });
        return out;
      }
      function undoArrayToObject(obj) {
        return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)).sort((a, b) => obj[a] - obj[b]);
      }
      function dfFilter(DataFrame, Series, df, fn, axis) {
        assert(
          isFunction(fn),
          "The `filter` method takes a single parameter: a function that is used to filter the values."
        );
        if (isUndefined(axis))
          axis = 0;
        assert(
          axis === 0 || axis === 1,
          "The `axis` parameter to the `filter` method must be 0 or 1."
        );
        let out = df.copy();
        if (out.isEmpty)
          return out;
        const index = arrayToObject(out.index);
        const columns = arrayToObject(out.columns);
        if (axis === 0) {
          const newValues = out.values.filter((row, i) => {
            const series = new Series(row);
            series.name = df.index[i];
            series.index = df.columns;
            const shouldKeep = fn(series, i, df);
            if (!shouldKeep)
              delete index[out.index[i]];
            return shouldKeep;
          });
          if (flatten(newValues).length === 0) {
            return new DataFrame();
          }
          if (newValues.length === 1) {
            const temp = new Series(flatten(newValues));
            temp.name = undoArrayToObject(index)[0];
            temp.index = undoArrayToObject(columns);
            return temp;
          }
          out.values = newValues;
          out.index = undoArrayToObject(index);
        } else if (axis === 1) {
          out = out.transpose();
          const newValues = out.values.filter((row, i) => {
            const series = new Series(row);
            series.name = df.columns[i];
            series.index = df.index;
            const shouldKeep = fn(series, i, df);
            if (!shouldKeep)
              delete columns[out.index[i]];
            return shouldKeep;
          });
          if (flatten(newValues).length === 0) {
            return new DataFrame();
          }
          if (newValues.length === 1) {
            const temp = new Series(flatten(newValues));
            temp.name = undoArrayToObject(columns)[0];
            temp.index = undoArrayToObject(index);
            return temp;
          }
          out.values = newValues;
          out.index = undoArrayToObject(columns);
          out = out.transpose();
        }
        return out;
      }
      module.exports = dfFilter;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get.js
  var require_df_get = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var set = require_set();
      function dfGet(df, rows, cols) {
        if (isString(rows) || isNumber(rows))
          rows = [rows];
        if (isString(cols) || isNumber(cols))
          cols = [cols];
        const types = set((rows || []).concat(cols || []).map((v) => typeof v));
        assert(
          types.length <= 2,
          "Only whole numbers and/or strings are allowed in `get` arrays!"
        );
        if (types.length === 1) {
          assert(
            types[0] === "string" || types[0] === "number",
            "Only whole numbers and/or strings are allowed in `get` arrays!"
          );
        }
        if (types.length === 2) {
          assert(
            types.indexOf("string") > -1,
            "Only whole numbers and/or strings are allowed in `get` arrays!"
          );
          assert(
            types.indexOf("number") > -1,
            "Only whole numbers and/or strings are allowed in `get` arrays!"
          );
        }
        if (!isUndefined(rows)) {
          rows = rows.map((r) => {
            if (isString(r)) {
              assert(df.index.indexOf(r) > -1, `Row "${r}" does not exist!`);
              return r;
            }
            if (isNumber(r)) {
              assert(r >= 0, `Index ${r} is out of bounds!`);
              assert(parseInt(r) === r, `Row numbers must be integers!`);
              assert(r < df.index.length, `Index ${r} is out of bounds!`);
              return df.index[r];
            }
          });
        }
        if (!isUndefined(cols)) {
          cols = cols.map((c) => {
            if (isString(c)) {
              assert(df.columns.indexOf(c) > -1, `Column "${c}" does not exist!`);
              return c;
            }
            if (isNumber(c)) {
              assert(c >= 0, `Column ${c} is out of bounds!`);
              assert(parseInt(c) === c, `Column numbers must be integers!`);
              assert(c < df.columns.length, `Column ${c} is out of bounds!`);
              return df.columns[c];
            }
          });
        }
        return df.getSubsetByNames(rows, cols);
      }
      module.exports = dfGet;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sort.js
  var require_sort = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sort.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function alphaSort(a, b) {
        try {
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        } catch (e) {
          a = typeof a === "object" && a !== null ? JSON.stringify(a) : a.toString();
          b = typeof b === "object" && b !== null ? JSON.stringify(b) : b.toString();
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        }
      }
      function sort(arr, fn) {
        if (isUndefined(fn))
          fn = alphaSort;
        if (isDataFrame(arr) || isSeries(arr)) {
          return arr.sort(...Object.values(arguments).slice(1));
        }
        assert(
          isArray(arr),
          "The `sort` function only works on arrays, Series, and DataFrames!"
        );
        assert(
          isFunction(fn),
          "The second parameter of the `sort` function must be a comparison function!"
        );
        const out = arr.slice();
        out.sort(fn);
        return out;
      }
      module.exports = sort;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-dummies.js
  var require_df_get_dummies = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-dummies.js"(exports, module) {
      var assert = require_assert();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var set = require_set();
      var sort = require_sort();
      function camelify(text) {
        const temp = text.toLowerCase();
        let out = "";
        for (let i = 0; i < temp.length; i++) {
          const char = temp[i];
          if (char.match(/[a-z0-9]/g)) {
            out += char;
          } else {
            out += " ";
          }
        }
        const words = out.split(" ").filter((word) => word.length > 0);
        return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.substring(1)).join("");
      }
      function dfGetDummies(DataFrame, df, columns) {
        if (isUndefined(columns)) {
          columns = df.columns;
        } else if (isString(columns)) {
          columns = [columns];
        }
        const temp = {};
        columns.forEach((col) => {
          assert(
            isString(col),
            "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!"
          );
          const colIndex = df.columns.indexOf(col);
          assert(
            colIndex > -1,
            `The given DataFrame does not have a column called "${col}"!`
          );
          const values = df.values.map((row) => row[colIndex]);
          const valuesSet = sort(set(values));
          values.forEach((value) => {
            valuesSet.forEach((orig) => {
              const colName = col + "_" + camelify(orig.toString());
              if (!temp[colName]) {
                temp[colName] = [];
              }
              if (value === orig) {
                temp[colName].push(1);
              } else {
                temp[colName].push(0);
              }
            });
          });
        });
        const out = new DataFrame(temp);
        out.index = df.index;
        return out;
      }
      module.exports = dfGetDummies;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-indices.js
  var require_df_get_subset_by_indices = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-indices.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var range = require_range();
      var shape = require_shape();
      function dfGetSubsetByIndices(df, rowIndices, colIndices) {
        const dataShape = df.shape;
        if (isUndefined(rowIndices))
          rowIndices = range(0, dataShape[0]);
        if (isUndefined(colIndices))
          colIndices = range(0, dataShape[1]);
        if (isNumber(rowIndices))
          rowIndices = [rowIndices];
        if (isNumber(colIndices))
          colIndices = [colIndices];
        assert(
          isArray(rowIndices) && isArray(colIndices),
          "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
        );
        assert(
          shape(rowIndices).length === 1 && shape(colIndices).length === 1,
          "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
        );
        assert(
          rowIndices.length > 0,
          "The `rowIndices` array must contain at least one index."
        );
        assert(
          colIndices.length > 0,
          "The `colIndices` array must contain at least one index."
        );
        rowIndices.forEach((rowIndex) => {
          assert(
            isWholeNumber(rowIndex),
            "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
          );
          assert(
            rowIndex < df.index.length,
            `The row index ${rowIndex} is out of bounds.`
          );
        });
        colIndices.forEach((colIndex) => {
          assert(
            isWholeNumber(colIndex),
            "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
          );
          assert(
            colIndex < df.columns.length,
            `The column index ${colIndex} is out of bounds.`
          );
        });
        const rows = rowIndices.map((i) => df.index[i]);
        const cols = colIndices.map((i) => df.columns[i]);
        return df.getSubsetByNames(rows, cols);
      }
      module.exports = dfGetSubsetByIndices;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-names.js
  var require_df_get_subset_by_names = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-names.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function dfGetSubsetByNames(DataFrame, Series, df, rows, cols) {
        if (isUndefined(rows))
          rows = df.index;
        if (isUndefined(cols))
          cols = df.columns;
        if (isString(rows))
          rows = [rows];
        if (isString(cols))
          cols = [cols];
        assert(
          isArray(rows) && isArray(cols),
          "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
        );
        assert(
          shape(rows).length === 1 && shape(cols).length === 1,
          "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
        );
        assert(
          rows.length > 0,
          "The `rows` array must contain at least one row name."
        );
        assert(
          cols.length > 0,
          "The `cols` array must contain at least one column name."
        );
        rows.forEach((row) => {
          assert(
            isString(row),
            "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
          );
          assert(
            df.index.indexOf(row) > -1,
            `The row name "${row}" does not exist in the list of rows.`
          );
        });
        cols.forEach((col) => {
          assert(
            isString(col),
            "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
          );
          assert(
            df.columns.indexOf(col) > -1,
            `The column name "${col}" does not exist in the list of columns.`
          );
        });
        const values = rows.map((row) => {
          return cols.map((col) => {
            return df.values[df.index.indexOf(row)][df.columns.indexOf(col)];
          });
        });
        if (rows.length === 1 && cols.length === 1) {
          return flatten(values)[0];
        }
        if (rows.length === 1) {
          const out2 = new Series(flatten(values));
          out2.name = rows[0];
          out2.index = cols;
          return out2;
        }
        if (cols.length === 1) {
          const out2 = new Series(flatten(values));
          out2.name = cols[0];
          out2.index = rows;
          return out2;
        }
        const out = new DataFrame(values);
        out.columns = cols;
        out.index = rows;
        return out;
      }
      module.exports = dfGetSubsetByNames;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-print.js
  var require_df_print = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-print.js"(exports, module) {
      var isString = require_is_string();
      var range = require_range();
      function dfPrint(DataFrame, Series, df) {
        function truncate(s, maxLength2) {
          if (isString(s)) {
            if (s.length > maxLength2) {
              return s.substring(0, maxLength2 - 3) + "...";
            } else {
              return s;
            }
          } else {
            return s;
          }
        }
        if (df.isEmpty) {
          console.table({});
          console.log("Shape:", [0, 0], "\n");
          return df;
        }
        const maxRows = typeof window === "undefined" ? 20 : 10;
        const halfMaxRows = parseInt(maxRows / 2);
        const maxColumns = typeof process === "undefined" ? 10 : Math.floor(process.stdout.columns / 24) - 1;
        const halfMaxColumns = parseInt(maxColumns / 2);
        const tempRows = maxRows > df.index.length ? null : range(0, halfMaxRows).concat(
          range(df.index.length - halfMaxRows, df.index.length)
        );
        const tempColumns = maxColumns > df.columns.length ? null : range(0, halfMaxColumns).concat(
          range(df.columns.length - halfMaxColumns, df.columns.length)
        );
        let temp = df.get(tempRows, tempColumns);
        if (temp instanceof Series) {
          if (df.shape[0] === 1) {
            temp = new DataFrame([temp.values]);
            temp.index = df.index;
            temp.columns = new Series(df.columns).get(tempColumns).values;
          } else if (df.shape[1] === 1) {
            temp = new DataFrame([temp.values]).transpose();
            temp.index = new Series(df.index).get(tempRows).values;
            temp.columns = df.columns;
          }
        }
        if (maxRows <= df.index.length) {
          temp._index.splice(halfMaxRows, 0, "...");
          temp._values.splice(
            halfMaxRows,
            0,
            range(0, temp.columns.length).map(() => "...")
          );
        }
        if (maxColumns <= df.columns.length) {
          temp._columns.splice(halfMaxColumns, 0, "...");
          temp._values = temp._values.map((row) => {
            row.splice(halfMaxColumns, 0, "...");
            return row;
          });
        }
        const maxLength = 28;
        if (temp instanceof Series) {
          temp.values = temp.values.map((value) => truncate(value, maxLength));
          temp.name = truncate(temp.name, maxLength);
          temp.index = temp.index.map((row) => truncate(row, maxLength));
        } else {
          temp.values = temp.values.map((row) => {
            return row.map((value) => truncate(value, maxLength));
          });
          temp.columns = temp.columns.map((col) => truncate(col, maxLength));
          temp.index = temp.index.map((row) => truncate(row, maxLength));
        }
        console.table(temp.toObject());
        console.log("Shape:", df.shape, "\n");
        return df;
      }
      module.exports = dfPrint;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/left-pad.js
  var require_left_pad = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/left-pad.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      function leftPad(x, maxLength) {
        assert(isNumber(x), "The `leftPad` function only works on numbers!");
        let out = x.toString();
        while (out.length < maxLength)
          out = "0" + out;
        return out;
      }
      module.exports = leftPad;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-reset-index.js
  var require_df_reset_index = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-reset-index.js"(exports, module) {
      var leftPad = require_left_pad();
      var range = require_range();
      function dfResetIndex(df, shouldSkipCopying) {
        const out = shouldSkipCopying ? df : df.copy();
        out.index = range(0, df.shape[0]).map((i) => {
          return "row" + leftPad(i, (out.index.length - 1).toString().length);
        });
        return out;
      }
      module.exports = dfResetIndex;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/product.js
  var require_product = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/product.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function product(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return product(arr.values);
        }
        assert(
          isArray(arr),
          "The `product` function only works on arrays, Series, and DataFrames!"
        );
        try {
          if (arr.length === 0)
            return NaN;
          return flatten(arr).reduce((a, b) => a * b, 1);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = product;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/reshape.js
  var require_reshape = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/reshape.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var product = require_product();
      var shape = require_shape();
      function reshape(x, newShape) {
        if (isDataFrame(x) || isSeries(x)) {
          return reshape(x.values, newShape);
        }
        assert(
          isArray(x),
          "The first argument passed into the `reshape` function must be an array!"
        );
        if (isNumber(newShape))
          newShape = [newShape];
        assert(
          isArray(newShape),
          "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
        );
        assert(
          shape(newShape).length === 1,
          "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
        );
        newShape.forEach((v) => {
          assert(
            isNumber(v) && parseInt(v) === v && v > 0,
            "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
          );
        });
        if (newShape.length === 0) {
          return flatten(x);
        }
        const temp = flatten(x);
        if (newShape.length === 1 && newShape[0] === temp.length) {
          return temp;
        }
        assert(
          product(newShape) === temp.length,
          "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!"
        );
        const out = [];
        const step = parseInt(temp.length / newShape[0]);
        for (let i = 0; i < newShape[0]; i++) {
          const row = temp.slice(i * step, (i + 1) * step);
          out.push(reshape(row, newShape.slice(1)));
        }
        return out;
      }
      module.exports = reshape;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/random.js
  var require_random = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/random.js"(exports, module) {
      var { copy } = require_copy();
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var ndarray = require_ndarray();
      var product = require_product();
      var reshape = require_reshape();
      var MAX = Math.pow(2, 64);
      var s = [];
      seed(parseInt(Math.random() * MAX));
      function splitmix64(state, n) {
        state = uint(state);
        function helper() {
          state += uint("0x9e3779b97f4a7c15");
          let z = copy(state);
          z = (z ^ z >> BigInt(30)) * uint("0xbf58476d1ce4e5b9");
          z = (z ^ z >> BigInt(27)) * uint("0x94d049bb133111eb");
          return z ^ z >> BigInt(31);
        }
        const out = [];
        for (let i = 0; i < n; i++)
          out.push(helper());
        return out;
      }
      function uint(x) {
        return BigInt.asUintN(64, BigInt(x));
      }
      function rotl(x, k) {
        x = uint(x);
        k = BigInt(k);
        return uint(uint(x << k) | uint(x >> uint(BigInt(64) - k)));
      }
      function seed(val) {
        if (!isUndefined(val)) {
          assert(
            isNumber(val),
            "If passing a value into the `seed` function, then that value must be an integer!"
          );
          const temp = splitmix64(parseInt(val), 4);
          s[0] = temp[0];
          s[1] = temp[1];
          s[2] = temp[2];
          s[3] = temp[3];
        } else {
          return copy(s);
        }
      }
      function next() {
        const result = uint(rotl(s[0] + s[3], 23) + s[0]);
        const t = uint(s[1] << BigInt(17));
        s[2] = uint(s[2] ^ s[0]);
        s[3] = uint(s[3] ^ s[1]);
        s[1] = uint(s[1] ^ s[2]);
        s[0] = uint(s[0] ^ s[3]);
        s[2] = uint(s[2] ^ t);
        s[3] = rotl(s[3], 45);
        return parseInt(result) / MAX;
      }
      function random(shape) {
        if (isUndefined(shape))
          return next();
        if (!isArray(shape))
          shape = [shape];
        return reshape(ndarray(product(shape)).map(next), shape);
      }
      module.exports = { random, seed };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/shuffle.js
  var require_shuffle = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/shuffle.js"(exports, module) {
      var { random } = require_random();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function shuffle(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return arr.shuffle(...Object.values(arguments).slice(1));
        }
        assert(
          isArray(arr),
          "The `shuffle` function only works on arrays, Series, and DataFrames!"
        );
        const out = [];
        const temp = arr.slice();
        for (let i = 0; i < arr.length; i++) {
          const index = parseInt(random() * temp.length);
          out.push(temp.splice(index, 1)[0]);
        }
        return out;
      }
      module.exports = shuffle;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-shuffle.js
  var require_df_shuffle = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-shuffle.js"(exports, module) {
      var assert = require_assert();
      var isUndefined = require_is_undefined();
      var shuffle = require_shuffle();
      function dfShuffle(df, axis) {
        if (isUndefined(axis))
          axis = 0;
        assert(
          axis === 0 || axis === 1,
          "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
        );
        return df.get(
          axis === 0 ? shuffle(df.index) : null,
          axis === 1 ? shuffle(df.columns) : null
        );
      }
      module.exports = dfShuffle;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-boolean.js
  var require_is_boolean = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-boolean.js"(exports, module) {
      function isBoolean(x) {
        return typeof x === "boolean";
      }
      module.exports = isBoolean;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-sort.js
  var require_df_sort = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-sort.js"(exports, module) {
      var { random } = require_random();
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isBoolean = require_is_boolean();
      var isFunction = require_is_function();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var range = require_range();
      var shape = require_shape();
      var sort = require_sort();
      function dfSort(df, a, b) {
        if (isFunction(a)) {
          return dfSortByFunction(df, a, b);
        } else {
          return dfSortByColumns(df, a, b);
        }
      }
      function dfSortByFunction(df, fn, axis) {
        axis = isUndefined(axis) ? 0 : axis;
        assert(
          isFunction(fn),
          "When sorting a DataFrame using a function, the first argument to the `sort` method must be a function!"
        );
        assert(
          isNumber(axis),
          "When sorting a DataFrame using a function, the second argument to the `sort` method must be null, undefined, 0, or 1 to indicate the axis along which the data should be sorted! An axis of 0 means that the rows will be sorted relative to each other, whereas an axis of 1 means that the columns will be sorted relative to each other."
        );
        if (axis === 0) {
          const index = sort(df.index, (a, b) => {
            return fn(df.get(a, null), df.get(b, null));
          });
          return df.get(index, null);
        } else {
          const columns = sort(df.columns, (a, b) => {
            return fn(df.get(null, a), df.get(null, b));
          });
          return df.get(null, columns);
        }
      }
      function dfSortByColumns(df, cols, directions) {
        let out = df.copy();
        const indexID = random().toString();
        out = out.assign(indexID, out.index);
        if (isUndefined(cols)) {
          cols = [indexID];
          directions = [true];
        }
        if (isNumber(cols) || isString(cols)) {
          cols = [cols];
          if (isBoolean(directions) || isString(directions))
            directions = [directions];
        }
        assert(
          isArray(cols),
          "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
        );
        assert(
          shape(cols).length === 1,
          "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
        );
        if (isUndefined(directions))
          directions = range(0, cols.length).map(() => true);
        assert(
          isArray(directions),
          "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
        );
        assert(
          shape(directions).length === 1,
          "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
        );
        assert(
          cols.length === directions.length,
          "The arrays passed into the `sort` method must be equal in length."
        );
        cols = cols.map((col) => {
          assert(
            isString(col) || isNumber(col),
            "Column references can either be column names (as strings) or column indices (as whole numbers)."
          );
          if (isString(col)) {
            const index = out.columns.indexOf(col);
            assert(index > -1, `The column "${col}" does not exist!`);
            return index;
          }
          if (isNumber(col)) {
            assert(parseInt(col) === col, "Column indices must be whole numbers!");
            assert(col >= 0, `The column index ${col} is out of bounds!`);
            assert(col < out.columns.length, `The index ${col} is out of bounds!`);
            return col;
          }
        });
        directions = directions.map((dir) => {
          assert(
            isString(dir) || isBoolean(dir),
            "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
          );
          if (isString(dir)) {
            const value = dir.trim().toLowerCase();
            assert(
              value === "ascending" || value === "descending",
              "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
            );
            return value === "ascending";
          }
          if (isBoolean(dir)) {
            return dir;
          }
        });
        out.values = sort(out.values, (a, b) => {
          let counter = 0;
          while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
            counter++;
          }
          const isAscending = directions[counter];
          if (a[cols[counter]] === b[cols[counter]])
            return 0;
          if (a[cols[counter]] < b[cols[counter]])
            return isAscending ? -1 : 1;
          if (a[cols[counter]] > b[cols[counter]])
            return isAscending ? 1 : -1;
        });
        out.index = flatten(out.get(null, indexID).values);
        out = out.dropColumns(indexID);
        return out;
      }
      module.exports = dfSort;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json-string.js
  var require_df_to_json_string = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json-string.js"(exports, module) {
      function dfToJSONString(df, axis) {
        return JSON.stringify(df.toObject(axis));
      }
      module.exports = dfToJSONString;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json.js
  var require_df_to_json = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json.js"(exports, module) {
      var MathError = require_math_error();
      var dfToJSONString = require_df_to_json_string();
      function toJSON(df, filename, axis) {
        const out = dfToJSONString(df, axis);
        let downloadedInBrowser = false;
        let wroteToDiskInNode = false;
        let browserError, nodeError;
        try {
          let newFilename = filename;
          if (filename.includes("/")) {
            const parts = filename.split("/");
            newFilename = parts[parts.length - 1];
          }
          const a = document.createElement("a");
          a.href = `data:application/json;charset=utf-8,${encodeURIComponent(out)}`;
          a.download = newFilename;
          a.dispatchEvent(new MouseEvent("click"));
          downloadedInBrowser = true;
        } catch (e) {
          browserError = e;
        }
        try {
          const fs = __require("fs");
          const path = __require("path");
          fs.writeFileSync(path.resolve(filename), out, "utf8");
          wroteToDiskInNode = true;
        } catch (e) {
          nodeError = e;
        }
        if (!downloadedInBrowser && !wroteToDiskInNode) {
          if (typeof window !== "undefined") {
            throw new MathError(browserError);
          } else if (typeof module !== "undefined") {
            throw new MathError(nodeError);
          } else {
            throw new MathError(
              "I don't know what's going wrong, but it doesn't seem like you're in Node or the browser, and we couldn't download and/or write the file to disk!"
            );
          }
        }
        return df;
      }
      module.exports = toJSON;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-object.js
  var require_df_to_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-object.js"(exports, module) {
      var assert = require_assert();
      var isUndefined = require_is_undefined();
      function dfToObject(df, axis) {
        if (isUndefined(axis)) {
          axis = 0;
        } else {
          assert(
            axis === 0 || axis === 1,
            "The axis parameter of the `toObject` method must be undefined, 0, or 1. An axis of 0 indicates that the returned object should be organized first by rows and then by columns. An axis of 1 indicates that the returned object should be organized first by columns and then by rows."
          );
        }
        const out = {};
        if (axis === 0) {
          df.index.forEach((rowName, i) => {
            const temp = {};
            df.columns.forEach((colName, j) => {
              temp[colName] = df.values[i][j];
            });
            out[rowName] = temp;
          });
        } else {
          df.columns.forEach((colName, j) => {
            const temp = {};
            df.index.forEach((rowName, i) => {
              temp[rowName] = df.values[i][j];
            });
            out[colName] = temp;
          });
        }
        return out;
      }
      module.exports = dfToObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/transpose.js
  var require_transpose = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/transpose.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var ndarray = require_ndarray();
      var reverse = require_reverse();
      var shape = require_shape();
      function transpose(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return arr.transpose();
        }
        assert(
          isArray(arr),
          "The `transpose` function only works on arrays, Series, and DataFrames!"
        );
        const theShape = shape(arr);
        assert(
          theShape.length <= 2,
          "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"
        );
        if (theShape.length === 1) {
          return reverse(arr);
        } else if (theShape.length === 2) {
          const out = ndarray(reverse(theShape));
          for (let row = 0; row < theShape[0]; row++) {
            for (let col = 0; col < theShape[1]; col++) {
              out[col][row] = arr[row][col];
            }
          }
          return out;
        }
      }
      module.exports = transpose;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-append.js
  var require_series_append = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-append.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNested = require_is_nested();
      var isSeries = require_is_series();
      var shape = require_shape();
      function seriesAppend(Series, series, x) {
        if (isSeries(x)) {
          return new Series(series.values.concat(x.values));
        }
        if (isArray(x)) {
          const xShape = shape(x);
          assert(
            xShape.length === 1 && !isNested(xShape),
            "Only vectors can be appended to Series!"
          );
          const out = series.copy();
          x.forEach((v, i) => {
            out._values.push(v);
            out._index.push("item" + (series.values.length + i));
          });
          return out;
        }
        assert(!isDataFrame(x), "DataFrames cannot be appended to Series!");
        return seriesAppend(series, [x]);
      }
      module.exports = seriesAppend;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-apply.js
  var require_series_apply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-apply.js"(exports, module) {
      var assert = require_assert();
      var isFunction = require_is_function();
      function seriesApply(series, fn) {
        assert(
          isFunction(fn),
          "The parameter to the `apply` method must be a function."
        );
        const out = series.copy();
        out._values = out._values.map((v, i) => fn(v, i));
        return out;
      }
      module.exports = seriesApply;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.js
  var require_series_drop_missing = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.js"(exports, module) {
      var isUndefined = require_is_undefined();
      function seriesDropMissing(series) {
        const out = series.copy();
        const outIndex = [];
        out._values = out.values.filter((v, i) => {
          if (isUndefined(v)) {
            return false;
          } else {
            outIndex.push(out.index[i]);
            return true;
          }
        });
        out._index = outIndex;
        return out;
      }
      module.exports = seriesDropMissing;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-nan.js
  var require_series_drop_nan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-drop-nan.js"(exports, module) {
      var isNumber = require_is_number();
      function seriesDropNaN(Series, series) {
        const index = [];
        const values = [];
        series.values.forEach((value, i) => {
          if (isNumber(value)) {
            values.push(value);
            index.push(series.index[i]);
          }
        });
        const out = new Series(values);
        out.name = series.name;
        out.index = index;
        return out;
      }
      module.exports = seriesDropNaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-filter.js
  var require_series_filter = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-filter.js"(exports, module) {
      var { copy } = require_copy();
      function seriesFilter(Series, series, fn) {
        let out = series.copy();
        const index = copy(out.index);
        const indicesToRemove = [];
        const newValues = out.values.filter((value, i) => {
          const shouldKeep = fn(value, i, out.values);
          if (!shouldKeep)
            indicesToRemove.push(out.index[i]);
          return shouldKeep;
        });
        indicesToRemove.forEach((i) => {
          index.splice(index.indexOf(i), 1);
        });
        if (newValues.length === 0) {
          out = new Series();
          out.name = series.name;
          return out;
        }
        out.values = newValues;
        out.index = index;
        return out;
      }
      module.exports = seriesFilter;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-get.js
  var require_series_get = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-get.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var set = require_set();
      function seriesGet(series, indices) {
        if (isString(indices) || isNumber(indices))
          indices = [indices];
        const types = set((indices || []).map((v) => typeof v));
        assert(
          types.length <= 2,
          "Only whole numbers and/or strings are allowed in `get` arrays!"
        );
        if (types.length === 1) {
          assert(
            types[0] === "string" || types[0] === "number",
            "Only whole numbers and/or strings are allowed in `get` arrays!"
          );
        }
        if (types.length === 2) {
          assert(
            types.indexOf("string") > -1,
            "Only whole numbers and/or strings are allowed in `get` arrays!"
          );
          assert(
            types.indexOf("number") > -1,
            "Only whole numbers and/or strings are allowed in `get` arrays!"
          );
        }
        if (!isUndefined(indices)) {
          indices = indices.map((i) => {
            if (typeof i === "string") {
              assert(series.index.indexOf(i) > -1, `Index "${i}" does not exist!`);
              return i;
            }
            if (typeof i === "number") {
              assert(i >= 0, `Index ${i} is out of bounds!`);
              assert(parseInt(i) === i, `Indices must be integers!`);
              assert(i < series.index.length, `Index ${i} is out of bounds!`);
              return series.index[i];
            }
          });
        }
        return series.getSubsetByNames(indices);
      }
      module.exports = seriesGet;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-indices.js
  var require_series_get_subset_by_indices = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-indices.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var range = require_range();
      var shape = require_shape();
      function seriesGetSubsetByIndices(series, indices) {
        const dataShape = series.shape;
        if (isUndefined(indices))
          indices = range(0, dataShape[0]);
        assert(
          isArray(indices),
          "The `indices` array must be 1-dimensional array of whole numbers."
        );
        assert(
          shape(indices).length === 1,
          "The `indices` array must be a 1-dimensional array of whole numbers."
        );
        assert(
          indices.length > 0,
          "The `indices` array must contain at least one index."
        );
        indices.forEach((index) => {
          assert(
            isWholeNumber(index),
            "The `indices` array must be a 1-dimensional array of whole numbers."
          );
          assert(
            index < series.index.length,
            `The row index ${index} is out of bounds.`
          );
        });
        const rows = indices.map((i) => series.index[i]);
        return series.getSubsetByNames(rows);
      }
      module.exports = seriesGetSubsetByIndices;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-names.js
  var require_series_get_subset_by_names = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-names.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function seriesGetSubsetByNames(Series, series, indices) {
        if (isUndefined(indices))
          indices = series.index;
        assert(
          isArray(indices),
          "The `indices` array must be a 1-dimensional array of strings."
        );
        assert(
          shape(indices).length === 1,
          "The `indices` array must be a 1-dimensional array of strings."
        );
        assert(
          indices.length > 0,
          "The `indices` array must contain at least one index name."
        );
        indices.forEach((name) => {
          assert(isString(name), "The `indices` array must contain only strings.");
          assert(
            series.index.indexOf(name) > -1,
            `The name "${name}" does not exist in the index.`
          );
        });
        const values = indices.map((name) => {
          return series.values[series.index.indexOf(name)];
        });
        if (values.length === 1)
          return values[0];
        const out = new Series(values);
        out.index = indices;
        out.name = series.name;
        return out;
      }
      module.exports = seriesGetSubsetByNames;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-print.js
  var require_series_print = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-print.js"(exports, module) {
      var { copy } = require_copy();
      var range = require_range();
      function seriesPrint(series) {
        let temp = series.copy();
        const maxRows = typeof window === "undefined" ? 20 : 10;
        if (temp.index.length > maxRows) {
          temp = temp.get(
            range(0, maxRows / 2).concat(
              range(temp.index.length - maxRows / 2, temp.index.length)
            )
          );
          const tempIndex = copy(temp.index);
          tempIndex.splice(parseInt(tempIndex.length / 2), 0, "...");
          temp.values.push("...");
          temp.index.push("...");
          temp = temp.get(tempIndex);
        }
        const out = {};
        temp.values.forEach((value, i) => {
          const obj = {};
          obj[temp.name] = value;
          out[temp.index[i]] = obj;
        });
        console.table(out);
        console.log("Shape:", series.shape, "\n");
        return series;
      }
      module.exports = seriesPrint;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-shuffle.js
  var require_series_shuffle = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-shuffle.js"(exports, module) {
      var shuffle = require_shuffle();
      function seriesShuffle(series) {
        const out = series.copy();
        return out.get(shuffle(out.index));
      }
      module.exports = seriesShuffle;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort.js
  var require_series_sort = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-sort.js"(exports, module) {
      var assert = require_assert();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
      var sort = require_sort();
      var transpose = require_transpose();
      function seriesSort(Series, series, fn) {
        fn = fn || ((a, b) => a < b ? -1 : 1);
        assert(
          isUndefined(fn) || isFunction(fn),
          "You must pass undefined, null, or a comparison function as the second argument to the `sort` method!"
        );
        const pairs = transpose([series.values, series.index]);
        const temp = sort(pairs, (aPair, bPair) => {
          return fn(aPair[0], bPair[0]);
        });
        const newValues = [];
        const newIndex = [];
        temp.forEach((pair) => {
          newValues.push(pair[0]);
          newIndex.push(pair[1]);
        });
        const out = new Series();
        out._values = newValues;
        out._index = newIndex;
        out.name = series.name;
        return out;
      }
      module.exports = seriesSort;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort-by-index.js
  var require_series_sort_by_index = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-sort-by-index.js"(exports, module) {
      var sort = require_sort();
      var transpose = require_transpose();
      function seriesSortByIndex(Series, series) {
        let temp = transpose([series.values, series.index]);
        temp = transpose(
          sort(temp, (a, b) => {
            if (a[1] === b[1])
              return 0;
            if (a[1] < b[1])
              return -1;
            if (a[1] > b[1])
              return 1;
          })
        );
        const out = new Series(temp[0]);
        out.index = temp[1];
        out.name = series.name;
        return out;
      }
      module.exports = seriesSortByIndex;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-to-object.js
  var require_series_to_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-to-object.js"(exports, module) {
      function seriesToObject(series) {
        const out = {};
        out[series.name] = {};
        series.index.forEach((index, i) => {
          out[series.name][index] = series.values[i];
        });
        return out;
      }
      module.exports = seriesToObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/index.js
  var require_series = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/index.js"(exports, module) {
      var { copy } = require_copy();
      var assert = require_assert();
      var isArray = require_is_array();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var leftPad = require_left_pad();
      var range = require_range();
      var reverse = require_reverse();
      var seriesAppend = require_series_append();
      var seriesApply = require_series_apply();
      var seriesDropMissing = require_series_drop_missing();
      var seriesDropNaN = require_series_drop_nan();
      var seriesFilter = require_series_filter();
      var seriesGet = require_series_get();
      var seriesGetSubsetByIndices = require_series_get_subset_by_indices();
      var seriesGetSubsetByNames = require_series_get_subset_by_names();
      var seriesPrint = require_series_print();
      var seriesShuffle = require_series_shuffle();
      var seriesSort = require_series_sort();
      var seriesSortByIndex = require_series_sort_by_index();
      var seriesToObject = require_series_to_object();
      var shape = require_shape();
      var transpose = require_transpose();
      var SERIES_SYMBOL = Symbol.for("@jrc03c/js-math-tools/series");
      module.exports = function(DataFrame) {
        class Series {
          static [Symbol.hasInstance](x) {
            try {
              return !!x._symbol && x._symbol === SERIES_SYMBOL;
            } catch (e) {
              return false;
            }
          }
          constructor(data) {
            const self2 = this;
            self2.name = "data";
            Object.defineProperty(self2, "_symbol", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: SERIES_SYMBOL
            });
            Object.defineProperty(self2, "_values", {
              value: [],
              configurable: true,
              enumerable: false,
              writable: true
            });
            Object.defineProperty(self2, "values", {
              configurable: true,
              enumerable: true,
              get() {
                return self2._values;
              },
              set(x) {
                assert(isArray(x), "The new values must be a 1-dimensional array!");
                const dataShape = shape(x);
                assert(
                  dataShape.length === 1,
                  "The new array of values must be 1-dimensional!"
                );
                if (dataShape[0] < self2._index.length) {
                  self2._index = self2._index.slice(0, dataShape[0]);
                } else if (dataShape[0] > self2._index.length) {
                  self2._index = self2._index.concat(
                    range(self2._index.length, dataShape[0]).map((i) => {
                      return "item" + leftPad(i, (x.length - 1).toString().length);
                    })
                  );
                }
                self2._values = x;
              }
            });
            Object.defineProperty(self2, "_index", {
              value: [],
              configurable: true,
              enumerable: false,
              writable: true
            });
            Object.defineProperty(self2, "index", {
              configurable: true,
              enumerable: true,
              get() {
                return self2._index;
              },
              set(x) {
                assert(
                  isArray(x),
                  "The new index must be a 1-dimensional array of strings!"
                );
                assert(
                  x.length === self2.shape[0],
                  "The new index must be the same length as the old index!"
                );
                assert(
                  shape(x).length === 1,
                  "The new index must be a 1-dimensional array of strings!"
                );
                x.forEach((value) => {
                  assert(isString(value), "All of the row names must be strings!");
                });
                self2._index = x;
              }
            });
            if (data) {
              if (data instanceof Series) {
                self2.name = data.name;
                self2.values = copy(data.values);
                self2.index = copy(data.index);
              } else if (isArray(data)) {
                const dataShape = shape(data);
                assert(
                  dataShape.length === 1,
                  "When passing an array into the constructor of a Series, the array must be 1-dimensional!"
                );
                self2.values = data;
              } else if (data instanceof Object) {
                const keys = Object.keys(data).concat(Object.getOwnPropertySymbols(data)).map((v) => v.toString());
                assert(
                  keys.length === 1,
                  "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
                );
                const name = keys[0];
                const values = data[name];
                assert(
                  shape(values).length === 1,
                  "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
                );
                self2.name = name;
                self2.values = values.slice();
              }
            }
          }
          get shape() {
            const self2 = this;
            return shape(self2.values);
          }
          get length() {
            const self2 = this;
            return self2.shape[0];
          }
          get isEmpty() {
            const self2 = this;
            return self2.values.filter((v) => !isUndefined(v)).length === 0;
          }
          clear() {
            const self2 = this;
            const out = self2.copy();
            out.values.forEach((v, i) => {
              out.values[i] = void 0;
            });
            return out;
          }
          get(indices) {
            const self2 = this;
            return seriesGet(self2, indices);
          }
          getSubsetByNames(indices) {
            const self2 = this;
            return seriesGetSubsetByNames(Series, self2, indices);
          }
          getSubsetByIndices(indices) {
            const self2 = this;
            return seriesGetSubsetByIndices(self2, indices);
          }
          loc(indices) {
            const self2 = this;
            return self2.getSubsetByNames(indices);
          }
          iloc(indices) {
            const self2 = this;
            return self2.getSubsetByIndices(indices);
          }
          reverse() {
            const self2 = this;
            const out = new Series(reverse(self2.values));
            out.index = reverse(self2.index);
            out.name = self2.name;
            return out;
          }
          resetIndex() {
            const self2 = this;
            const out = self2.copy();
            out.index = range(0, self2.shape[0]).map((i) => {
              return "item" + leftPad(i, (out.index.length - 1).toString().length);
            });
            return out;
          }
          copy() {
            const self2 = this;
            const out = new Series();
            out._values = copy(self2.values);
            out._index = copy(self2.index);
            out.name = self2.name;
            return out;
          }
          append(x) {
            const self2 = this;
            return seriesAppend(Series, self2, x);
          }
          apply(fn) {
            const self2 = this;
            return seriesApply(self2, fn);
          }
          concat(x) {
            const self2 = this;
            return self2.append(x);
          }
          dropMissing(condition, threshold) {
            const self2 = this;
            return seriesDropMissing(self2, condition, threshold);
          }
          dropNaN() {
            const self2 = this;
            return seriesDropNaN(Series, self2);
          }
          toObject() {
            const self2 = this;
            return seriesToObject(self2);
          }
          print() {
            const self2 = this;
            return seriesPrint(self2);
          }
          shuffle() {
            const self2 = this;
            return seriesShuffle(self2);
          }
          sort(direction) {
            const self2 = this;
            return seriesSort(Series, self2, direction);
          }
          sortByIndex() {
            const self2 = this;
            return seriesSortByIndex(Series, self2);
          }
          filter(fn) {
            const self2 = this;
            return seriesFilter(Series, self2, fn);
          }
          toDataFrame() {
            const self2 = this;
            const out = new DataFrame(transpose([self2.values]));
            out.columns = [self2.name];
            out.index = self2.index;
            return out;
          }
          transpose() {
            const self2 = this;
            const out = self2.copy();
            out.values = reverse(out.values);
            out.index = reverse(out.index);
            return out;
          }
          getDummies() {
            const self2 = this;
            return self2.toDataFrame().getDummies();
          }
          oneHotEncode() {
            const self2 = this;
            return self2.getDummies();
          }
        }
        return Series;
      };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/index.js
  var require_dataframe = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/index.js"(exports, module) {
      var { copy } = require_copy();
      var assert = require_assert();
      var count = require_count();
      var dfAppend = require_df_append();
      var dfApply = require_df_apply();
      var dfAssign = require_df_assign();
      var dfCopy = require_df_copy();
      var dfDrop = require_df_drop();
      var dfDropMissing = require_df_drop_missing();
      var dfDropNaN = require_df_drop_nan();
      var dfFilter = require_df_filter();
      var dfGet = require_df_get();
      var dfGetDummies = require_df_get_dummies();
      var dfGetSubsetByIndices = require_df_get_subset_by_indices();
      var dfGetSubsetByNames = require_df_get_subset_by_names();
      var dfPrint = require_df_print();
      var dfResetIndex = require_df_reset_index();
      var dfShuffle = require_df_shuffle();
      var dfSort = require_df_sort();
      var dfToJSON = require_df_to_json();
      var dfToJSONString = require_df_to_json_string();
      var dfToObject = require_df_to_object();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isObject = require_is_object();
      var isUndefined = require_is_undefined();
      var leftPad = require_left_pad();
      var ndarray = require_ndarray();
      var range = require_range();
      var shape = require_shape();
      var transpose = require_transpose();
      var DATAFRAME_SYMBOL = Symbol.for("@jrc03c/js-math-tools/dataframe");
      function makeKey(n) {
        const alpha = "abcdefghijklmnopqrstuvwxyz1234567890";
        let out = "";
        for (let i = 0; i < n; i++)
          out += alpha[parseInt(Math.random() * alpha.length)];
        return out;
      }
      var DataFrame = class _DataFrame {
        static [Symbol.hasInstance](x) {
          try {
            return !!x._symbol && x._symbol === DATAFRAME_SYMBOL;
          } catch (e) {
            return false;
          }
        }
        constructor(data) {
          const self2 = this;
          Object.defineProperty(self2, "_symbol", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: DATAFRAME_SYMBOL
          });
          Object.defineProperty(self2, "_values", {
            value: [],
            configurable: true,
            enumerable: false,
            writable: true
          });
          Object.defineProperty(self2, "values", {
            configurable: true,
            enumerable: true,
            get() {
              if (self2._values.length === 0 || !isUndefined(self2._values[0]) && self2._values[0].length === 0) {
                return [[]];
              }
              return self2._values;
            },
            set(x) {
              assert(isArray(x), "The new values must be a 2-dimensional array!");
              const dataShape = shape(x);
              assert(
                dataShape.length === 2,
                "The new array of values must be 2-dimensional!"
              );
              if (dataShape[0] < self2._index.length) {
                self2._index = self2._index.slice(0, dataShape[0]);
              } else if (dataShape[0] > self2._index.length) {
                self2._index = self2._index.concat(
                  range(self2._index.length, dataShape[0]).map((i) => {
                    return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
                  })
                );
              }
              if (dataShape[1] < self2._columns.length) {
                self2._columns = self2._columns.slice(0, dataShape[1]);
              } else if (dataShape[1] > self2._columns.length) {
                self2._columns = self2._columns.concat(
                  range(self2._columns.length, dataShape[1]).map((i) => {
                    return "col" + leftPad(i, (dataShape[1] - 1).toString().length);
                  })
                );
              }
              self2._values = x;
            }
          });
          Object.defineProperty(self2, "_columns", {
            value: [],
            configurable: true,
            enumerable: false,
            writable: true
          });
          Object.defineProperty(self2, "columns", {
            configurable: true,
            enumerable: true,
            get() {
              return self2._columns;
            },
            set(x) {
              assert(
                isArray(x),
                "The new columns list must be a 1-dimensional array of strings!"
              );
              assert(
                self2.isEmpty || x.length === self2.shape[1],
                "The new columns list must be the same length as the old columns list!"
              );
              assert(
                shape(x).length === 1,
                "The new columns list must be a 1-dimensional array of strings!"
              );
              x = x.map((v) => {
                if (typeof v !== "string") {
                  v = JSON.stringify(v) || v.toString();
                }
                if (v.trim().length === 0) {
                  return "untitled_" + makeKey(8);
                }
                return v.trim();
              });
              const counts = (() => {
                const temp = count(x);
                const out = {};
                temp.forEach((obj) => {
                  out[obj.value] = obj.count;
                });
                return out;
              })();
              x = x.map((v) => {
                if (counts[v] > 1) {
                  return v + "_" + makeKey(8);
                }
                return v;
              });
              self2._columns = x;
            }
          });
          Object.defineProperty(self2, "_index", {
            value: [],
            configurable: true,
            enumerable: false,
            writable: true
          });
          Object.defineProperty(self2, "index", {
            configurable: true,
            enumerable: true,
            get() {
              return self2._index;
            },
            set(x) {
              assert(
                isArray(x),
                "The new index must be a 1-dimensional array of strings!"
              );
              assert(
                self2.isEmpty || x.length === self2.shape[0],
                "The new index must be the same length as the old index!"
              );
              assert(
                shape(x).length === 1,
                "The new index must be a 1-dimensional array of strings!"
              );
              x = x.map((v) => {
                if (typeof v !== "string") {
                  v = JSON.stringify(v) || v.toString();
                }
                if (v.trim().length === 0) {
                  return "untitled_" + makeKey(8);
                }
                return v.trim();
              });
              const counts = (() => {
                const temp = count(x);
                const out = {};
                temp.forEach((obj) => {
                  out[obj.value] = obj.count;
                });
                return out;
              })();
              x = x.map((v) => {
                if (counts[v] > 1) {
                  return v + "_" + makeKey(8);
                }
                return v;
              });
              self2._index = x;
            }
          });
          assert(
            isUndefined(data) || isObject(data) || isArray(data),
            "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
          );
          if (data) {
            if (data instanceof _DataFrame) {
              self2.values = copy(data.values);
              self2.columns = copy(data.columns);
              self2.index = copy(data.index);
            } else if (isArray(data)) {
              const dataShape = shape(data);
              assert(
                dataShape.length === 2,
                "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
              );
              self2.values = data;
            } else {
              self2._columns = Object.keys(data).concat(Object.getOwnPropertySymbols(data)).map((v) => v.toString());
              const temp = [];
              self2._columns.forEach((col) => {
                const values = data[col];
                temp.push(values);
              });
              self2._values = transpose(temp);
              const dataShape = shape(self2.values);
              self2._index = range(0, dataShape[0]).map((i) => {
                return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
              });
            }
          }
        }
        get shape() {
          const self2 = this;
          return shape(self2.values);
        }
        get length() {
          const self2 = this;
          return self2.shape[0];
        }
        get width() {
          const self2 = this;
          return self2.shape[1];
        }
        get rows() {
          const self2 = this;
          return self2.index;
        }
        set rows(rows) {
          const self2 = this;
          self2.index = rows;
        }
        get isEmpty() {
          const self2 = this;
          return flatten(self2.values).length === 0;
        }
        clear() {
          const self2 = this;
          const out = new _DataFrame(ndarray(self2.shape));
          out.columns = self2.columns.slice();
          out.index = self2.index.slice();
          return out;
        }
        get(rows, cols) {
          const self2 = this;
          if (arguments.length === 0) {
            return self2;
          }
          if (arguments.length === 1) {
            try {
              return self2.get(null, rows);
            } catch (e) {
              return self2.get(rows, null);
            }
          }
          return dfGet(self2, rows, cols);
        }
        getSubsetByNames(rows, cols) {
          const self2 = this;
          return dfGetSubsetByNames(_DataFrame, Series, self2, rows, cols);
        }
        getSubsetByIndices(rowIndices, colIndices) {
          const self2 = this;
          return dfGetSubsetByIndices(self2, rowIndices, colIndices);
        }
        getDummies(columns) {
          const self2 = this;
          return dfGetDummies(_DataFrame, self2, columns);
        }
        oneHotEncode(columns) {
          const self2 = this;
          return dfGetDummies(_DataFrame, self2, columns);
        }
        transpose() {
          const self2 = this;
          const out = new _DataFrame(transpose(self2.values));
          out.columns = self2.index.slice();
          out.index = self2.columns.slice();
          return out;
        }
        get T() {
          const self2 = this;
          return self2.transpose();
        }
        resetIndex(shouldSkipCopying) {
          const self2 = this;
          return dfResetIndex(self2, shouldSkipCopying);
        }
        copy() {
          const self2 = this;
          return dfCopy(_DataFrame, self2);
        }
        assign(p1, p2) {
          const self2 = this;
          return dfAssign(_DataFrame, Series, self2, p1, p2);
        }
        apply(fn, axis) {
          const self2 = this;
          return dfApply(_DataFrame, Series, self2, fn, axis);
        }
        dropMissing(axis, condition, threshold) {
          const self2 = this;
          return dfDropMissing(_DataFrame, Series, self2, axis, condition, threshold);
        }
        dropNaN(axis, condition, threshold) {
          const self2 = this;
          return dfDropNaN(_DataFrame, self2, axis, condition, threshold);
        }
        drop(rows, cols) {
          const self2 = this;
          return dfDrop(_DataFrame, Series, self2, rows, cols);
        }
        dropColumns(columns) {
          const self2 = this;
          return self2.drop(null, columns);
        }
        dropRows(rows) {
          const self2 = this;
          return self2.drop(rows, null);
        }
        toObject(axis) {
          const self2 = this;
          return dfToObject(self2, axis);
        }
        toJSONString(axis) {
          const self2 = this;
          return dfToJSONString(self2, axis);
        }
        saveAsJSON(filename, axis) {
          const self2 = this;
          return dfToJSON(self2, filename, axis);
        }
        print() {
          const self2 = this;
          return dfPrint(_DataFrame, Series, self2);
        }
        sort(cols, directions) {
          const self2 = this;
          return dfSort(self2, cols, directions);
        }
        sortByIndex() {
          const self2 = this;
          return self2.sort();
        }
        filter(fn, axis) {
          const self2 = this;
          return dfFilter(_DataFrame, Series, self2, fn, axis);
        }
        shuffle(axis) {
          const self2 = this;
          return dfShuffle(self2, axis);
        }
        append(x, axis) {
          const self2 = this;
          return dfAppend(self2, x, axis);
        }
        concat(x, axis) {
          const self2 = this;
          return self2.append(x, axis);
        }
        join(x, axis) {
          const self2 = this;
          return self2.append(x, axis);
        }
        toString() {
          const self2 = this;
          return JSON.stringify(self2);
        }
      };
      var Series = require_series()(DataFrame);
      module.exports = { DataFrame, Series };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/max.js
  var require_max = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/max.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function max(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return max(arr.values);
        }
        assert(
          isArray(arr),
          "The `max` function only works on arrays, Series, and DataFrames!"
        );
        try {
          return Math.max(...flatten(arr));
        } catch (e) {
          return NaN;
        }
      }
      module.exports = max;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/vectorize.js
  var require_vectorize = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/vectorize.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var max = require_max();
      var range = require_range();
      var shape = require_shape();
      function isArraySeriesOrDataFrame(x) {
        return isArray(x) || isSeries(x) || isDataFrame(x);
      }
      function vectorize(fn) {
        assert(
          isFunction(fn),
          "You must pass a function into the `vectorize` function!"
        );
        return function helper() {
          let hasSeries, hasDataFrames;
          const series = [];
          const dataframes = [];
          const childArrays = Object.keys(arguments).filter((key) => {
            const arg = arguments[key];
            if (isArray(arg)) {
              return true;
            } else if (isSeries(arg)) {
              hasSeries = true;
              series.push(arg);
              return true;
            } else if (isDataFrame(arg)) {
              hasDataFrames = true;
              dataframes.push(arg);
              return true;
            } else {
              return false;
            }
          }).map((key) => arguments[key]);
          childArrays.slice(0, -1).forEach((s, i) => {
            assert(
              isEqual(
                isArray(s) ? shape(s) : s.shape,
                isArray(childArrays[i + 1]) ? shape(childArrays[i + 1]) : childArrays[i + 1].shape
              ),
              `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`
            );
          });
          if (childArrays.length > 0) {
            const maxLength = max(
              childArrays.map((a) => a.length ? a.length : a.values.length)
            );
            const out = range(0, maxLength).map((i) => {
              const args = Object.keys(arguments).map((key) => {
                if (isArraySeriesOrDataFrame(arguments[key])) {
                  if (isArray(arguments[key])) {
                    return arguments[key][i];
                  } else if (isSeries(arguments[key])) {
                    return arguments[key].values[i];
                  } else if (isDataFrame(arguments[key])) {
                    return arguments[key].values[i];
                  }
                } else {
                  return arguments[key];
                }
              });
              return helper(...args);
            });
            if (hasDataFrames) {
              try {
                if (dataframes.length === 1 && isEqual(shape(dataframes[0]), shape(out))) {
                  const temp = new DataFrame(out);
                  temp.index = dataframes[0].index.slice();
                  temp.columns = dataframes[0].columns.slice();
                  return temp;
                } else {
                  return new DataFrame(out);
                }
              } catch (e) {
                return out;
              }
            }
            if (hasSeries) {
              try {
                if (series.length === 1 && series[0].length === out.length) {
                  const temp = new Series(out);
                  temp.name = series[0].name;
                  temp.index = series[0].index.slice();
                  return temp;
                } else {
                  return new Series(out);
                }
              } catch (e) {
                return out;
              }
            }
            return out;
          } else {
            return fn(...arguments);
          }
        };
      }
      module.exports = vectorize;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/abs.js
  var require_abs = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/abs.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function abs(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.abs(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(abs);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/add.js
  var require_add = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/add.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function add() {
        try {
          let out = 0;
          const x = Object.values(arguments);
          for (let i = 0; i < x.length; i++) {
            if (!isNumber(x[i]))
              return NaN;
            out += x[i];
          }
          return out;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(add);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/apply.js
  var require_apply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/apply.js"(exports, module) {
      var vectorize = require_vectorize();
      function apply(x, fn) {
        try {
          return fn(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(apply);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/arccos.js
  var require_arccos = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/arccos.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function arccos(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.acos(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(arccos);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/arcsin.js
  var require_arcsin = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/arcsin.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function arcsin(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.asin(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(arcsin);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/arctan.js
  var require_arctan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/arctan.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function arctan(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.atan(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(arctan);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/argmax.js
  var require_argmax = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/argmax.js"(exports, module) {
      var assert = require_assert();
      var indexOf = require_index_of();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var max = require_max();
      function argmax(x) {
        if (isDataFrame(x)) {
          const index = argmax(x.values);
          return [x.index[index[0]], x.columns[index[1]]];
        }
        if (isSeries(x)) {
          const index = argmax(x.values);
          return [x.index[index]];
        }
        assert(
          isArray(x),
          "The `argmax` function only works on arrays, Series, and DataFrames!"
        );
        try {
          const out = indexOf(x, max(x));
          if (out) {
            if (out.length === 0) {
              return void 0;
            } else if (out.length === 1) {
              return out[0];
            } else {
              return out;
            }
          } else {
            return void 0;
          }
        } catch (e) {
          return void 0;
        }
      }
      module.exports = argmax;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/min.js
  var require_min = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/min.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function min(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return min(arr.values);
        }
        assert(
          isArray(arr),
          "The `min` function only works on arrays, Series, and DataFrames!"
        );
        try {
          return Math.min(...flatten(arr));
        } catch (e) {
          return NaN;
        }
      }
      module.exports = min;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/argmin.js
  var require_argmin = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/argmin.js"(exports, module) {
      var assert = require_assert();
      var indexOf = require_index_of();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var min = require_min();
      function argmin(x) {
        if (isDataFrame(x)) {
          const index = argmin(x.values);
          return [x.index[index[0]], x.columns[index[1]]];
        }
        if (isSeries(x)) {
          const index = argmin(x.values);
          return [x.index[index]];
        }
        assert(
          isArray(x),
          "The `argmin` function only works on arrays, Series, and DataFrames!"
        );
        try {
          const out = indexOf(x, min(x));
          if (out) {
            if (out.length === 0) {
              return void 0;
            } else if (out.length === 1) {
              return out[0];
            } else {
              return out;
            }
          } else {
            return void 0;
          }
        } catch (e) {
          return void 0;
        }
      }
      module.exports = argmin;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/cast.js
  var require_cast = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/cast.js"(exports, module) {
      var isArray = require_is_array();
      var isBoolean = require_is_boolean();
      var isDataFrame = require_is_dataframe();
      var isDate = require_is_date();
      var isEqual = require_is_equal();
      var isNumber = require_is_number();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function cast(value, type) {
        if (isDataFrame(value) || isSeries(value)) {
          return value.apply((item) => cast(item, type));
        }
        if (isArray(value)) {
          return value.map((v) => cast(v, type));
        }
        if (type === "null") {
          return null;
        }
        if (type === "number") {
          if (isUndefined(value)) {
            return NaN;
          }
          const booleanValue = cast(value, "boolean");
          if (isBoolean(booleanValue)) {
            return booleanValue ? 1 : 0;
          }
          try {
            JSON.parse(value);
          } catch (e) {
            const dateValue = cast(value, "date");
            if (isDate(dateValue)) {
              return dateValue.getTime();
            }
          }
          const out = parseFloat(value);
          if (isNaN(out))
            return NaN;
          return out;
        }
        if (type === "boolean") {
          if (isBoolean(value)) {
            return value;
          }
          if (isNumber(value)) {
            if (value === 0) {
              return false;
            }
            if (value === 1) {
              return true;
            }
            return null;
          }
          try {
            const vBool = (typeof value === "object" ? value.toString() === "null" ? "false" : JSON.stringify(value) : value.toString()).trim().toLowerCase();
            if (vBool === "true" || vBool === "yes" || vBool === "y") {
              return true;
            }
            if (vBool === "false" || vBool === "no" || vBool === "n") {
              return false;
            }
            return null;
          } catch (e) {
            return null;
          }
        }
        if (type === "date") {
          if (isDate(value)) {
            return value;
          }
          if (isUndefined(value)) {
            return null;
          }
          const valueFloat = parseFloat(value);
          if (!isNaN(valueFloat)) {
            const out = new Date(value);
            if (!isDate(out))
              return null;
            return out;
          }
          const valueDate = Date.parse(value);
          if (!isNaN(valueDate)) {
            return new Date(valueDate);
          }
          return null;
        }
        if (type === "object") {
          if (isObject(value)) {
            return value;
          }
          const booleanValue = cast(value, "boolean");
          if (isBoolean(booleanValue)) {
            return null;
          }
          try {
            const numberValue = cast(value, "number");
            if (isNumber(numberValue)) {
              JSON.parse(value);
              return null;
            }
          } catch (e) {
          }
          const dateValue = cast(value, "date");
          if (dateValue) {
            return dateValue;
          }
          try {
            const out = JSON.parse(value);
            if (isArray(out)) {
              return out.map((v) => cast(v, type));
            } else {
              return out;
            }
          } catch (e) {
            return null;
          }
        }
        if (type === "string") {
          if (isUndefined(value)) {
            if (isEqual(value, void 0)) {
              return "undefined";
            }
            return "null";
          }
          if (value instanceof Date) {
            return value.toJSON();
          }
          const valueString = (() => {
            if (typeof value === "object") {
              if (value === null) {
                return "null";
              } else {
                return JSON.stringify(value);
              }
            } else {
              return value.toString();
            }
          })();
          return valueString;
        }
      }
      module.exports = cast;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/ceil.js
  var require_ceil = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/ceil.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function ceil(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.ceil(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(ceil);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/chop.js
  var require_chop = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/chop.js"(exports, module) {
      var abs = require_abs();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var vectorize = require_vectorize();
      function chop(x, threshold) {
        try {
          if (!isNumber(x))
            return NaN;
          if (isUndefined(threshold)) {
            threshold = 1e-10;
          } else if (!isNumber(threshold)) {
            return NaN;
          }
          return abs(x) < threshold ? 0 : x;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(chop);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/clamp.js
  var require_clamp = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/clamp.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function clamp(x, a, b) {
        try {
          if (!isNumber(x))
            return NaN;
          if (!isNumber(a))
            return NaN;
          if (!isNumber(b))
            return NaN;
          if (x < a)
            return a;
          if (x > b)
            return b;
          return x;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(clamp);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/combinations.js
  var require_combinations = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/combinations.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      function combinations(arr, r) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return combinations(arr.values, r);
        }
        assert(
          isArray(arr),
          "The `combinations` function only works on arrays, Series, and DataFrames!"
        );
        assert(isNumber(r), "`r` must be a whole number!");
        arr = flatten(arr);
        if (r > arr.length) {
          return [arr];
        }
        if (r <= 0) {
          return [[]];
        }
        assert(r === parseInt(r), "`r` must be a whole number!");
        if (arr.length < 2)
          return arr;
        const out = [];
        arr.forEach((item, i) => {
          const after = arr.slice(i + 1);
          if (after.length < r - 1)
            return;
          const children = combinations(after, r - 1);
          children.forEach((child) => {
            out.push([item].concat(child));
          });
        });
        return out;
      }
      module.exports = combinations;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/mean.js
  var require_mean = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/mean.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function mean(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return mean(arr.values);
        }
        assert(
          isArray(arr),
          "The `mean` function only works on arrays, Series, and DataFrames!"
        );
        try {
          const temp = flatten(arr);
          let out = 0;
          temp.forEach((v) => {
            out += v;
          });
          return out / temp.length;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = mean;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/covariance.js
  var require_covariance = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/covariance.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var mean = require_mean();
      var shape = require_shape();
      function covariance(x, y) {
        if (isSeries(x)) {
          return covariance(x.values, y);
        }
        if (isSeries(y)) {
          return covariance(x, y.values);
        }
        assert(
          isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
          "The `covariance` function only works on 1-dimensional arrays and Series!"
        );
        assert(
          x.length === y.length,
          "The two arrays or Series passed into the `covariance` function must have the same length!"
        );
        try {
          const mx = mean(x);
          const my = mean(y);
          if (!isNumber(mx) || !isNumber(my)) {
            return NaN;
          }
          const n = Math.max(x.length, y.length);
          let out = 0;
          for (let i = 0; i < n; i++) {
            if (!isNumber(x[i]))
              return NaN;
            if (!isNumber(y[i]))
              return NaN;
            out += (x[i] - mx) * (y[i] - my);
          }
          return out / x.length;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = covariance;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sqrt.js
  var require_sqrt = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sqrt.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function sqrt(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.sqrt(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(sqrt);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/variance.js
  var require_variance = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/variance.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var mean = require_mean();
      function variance(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return variance(arr.values);
        }
        assert(
          isArray(arr),
          "The `variance` function only works on arrays, Series, and DataFrames!"
        );
        try {
          const temp = flatten(arr);
          const m = mean(temp);
          let out = 0;
          for (let i = 0; i < temp.length; i++) {
            if (!isNumber(temp[i]))
              return NaN;
            out += (temp[i] - m) * (temp[i] - m);
          }
          return out / temp.length;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = variance;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/std.js
  var require_std = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/std.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var sqrt = require_sqrt();
      var variance = require_variance();
      function std(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return std(arr.values);
        }
        assert(
          isArray(arr),
          "The `std` function only works on arrays, Series, and DataFrames!"
        );
        try {
          return sqrt(variance(arr));
        } catch (e) {
          return NaN;
        }
      }
      module.exports = std;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/correl.js
  var require_correl = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/correl.js"(exports, module) {
      var assert = require_assert();
      var covariance = require_covariance();
      var isArray = require_is_array();
      var isSeries = require_is_series();
      var shape = require_shape();
      var std = require_std();
      function correl(x, y) {
        if (isSeries(x)) {
          return correl(x.values, y);
        }
        if (isSeries(y)) {
          return correl(x, y.values);
        }
        assert(
          isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
          "The `correl` function only works on 1-dimensional arrays and Series!"
        );
        assert(
          x.length === y.length,
          "The two arrays or Series passed into the `correl` function must have the same length!"
        );
        try {
          return covariance(x, y) / (std(x) * std(y));
        } catch (e) {
          return NaN;
        }
      }
      module.exports = correl;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/cos.js
  var require_cos = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/cos.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function cos(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.cos(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(cos);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/data-types.js
  var require_data_types = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/data-types.js"(exports, module) {
      module.exports = Object.freeze({
        boolean: "boolean",
        date: "date",
        null: "null",
        number: "number",
        object: "object",
        string: "string"
      });
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/diff.js
  var require_diff = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/diff.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var set = require_set();
      function diff(a, b) {
        if (isDataFrame(a) || isSeries(a)) {
          return diff(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return diff(a, b.values);
        }
        assert(
          isArray(a) && isArray(b),
          "The `diff` function only works on arrays, Series, and DataFrames!"
        );
        const aTemp = set(a);
        const bTemp = set(b);
        const out = [];
        aTemp.forEach((item) => {
          if (bTemp.findIndex((other) => isEqual(other, item)) < 0) {
            out.push(item);
          }
        });
        return out;
      }
      module.exports = diff;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/pow.js
  var require_pow = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/pow.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function pow(x, p) {
        try {
          if (!isNumber(x))
            return NaN;
          if (!isNumber(p))
            return NaN;
          return Math.pow(x, p);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(pow);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/multiply.js
  var require_multiply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/multiply.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function multiply() {
        try {
          const values = Object.values(arguments);
          if (values.length === 0)
            return NaN;
          let out = 1;
          for (let i = 0; i < values.length; i++) {
            if (!isNumber(values[i]))
              return NaN;
            out *= values[i];
          }
          return out;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(multiply);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/scale.js
  var require_scale = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/scale.js"(exports, module) {
      var multiply = require_multiply();
      function scale() {
        return multiply(...arguments);
      }
      module.exports = scale;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/subtract.js
  var require_subtract = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/subtract.js"(exports, module) {
      var add = require_add();
      var scale = require_scale();
      function subtract(a, b) {
        return add(a, scale(b, -1));
      }
      module.exports = subtract;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sum.js
  var require_sum = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sum.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function sum(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return sum(arr.values);
        }
        assert(
          isArray(arr),
          "The `sum` function only works on arrays, Series, and DataFrames!"
        );
        try {
          if (arr.length === 0)
            return NaN;
          return flatten(arr).reduce((a, b) => a + b, 0);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = sum;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/distance.js
  var require_distance = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/distance.js"(exports, module) {
      var abs = require_abs();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var pow = require_pow();
      var shape = require_shape();
      var sqrt = require_sqrt();
      var subtract = require_subtract();
      var sum = require_sum();
      function distance(a, b) {
        if (isNumber(a) && isNumber(b)) {
          return abs(a - b);
        }
        if (isDataFrame(a) || isSeries(a)) {
          return distance(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return distance(a, b.values);
        }
        if (isArray(a) && isArray(b)) {
          assert(
            isEqual(shape(a), shape(b)),
            "If passing two arrays, Series, or DataFrames into the `distance` function, then those objects must have the same shape!"
          );
        }
        try {
          return sqrt(sum(pow(subtract(a, b), 2)));
        } catch (e) {
          return NaN;
        }
      }
      module.exports = distance;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/divide.js
  var require_divide = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/divide.js"(exports, module) {
      var pow = require_pow();
      var scale = require_scale();
      function divide(a, b) {
        return scale(a, pow(b, -1));
      }
      module.exports = divide;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dot.js
  var require_dot = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dot.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var scale = require_scale();
      var shape = require_shape();
      var sum = require_sum();
      var transpose = require_transpose();
      function dot(a, b) {
        if (isDataFrame(a)) {
          const temp = dot(a.values, b);
          if (shape(temp).length === 1) {
            const out = new Series(temp);
            out.name = isSeries(b) ? b.name : out.name;
            out.index = a.index.slice();
            return out;
          } else {
            const out = new DataFrame(temp);
            out.index = a.index.slice();
            if (isDataFrame(b)) {
              out.columns = b.columns.slice();
            }
            return out;
          }
        }
        if (isDataFrame(b)) {
          const temp = dot(a, b.values);
          if (shape(temp).length === 1) {
            const out = new Series(temp);
            out.name = isSeries(a) ? a.name : out.name;
            out.index = b.columns.slice();
            return out;
          } else {
            const out = new DataFrame(temp);
            out.columns = b.columns.slice();
            return out;
          }
        }
        if (isSeries(a)) {
          return dot(a.values, b);
        }
        if (isSeries(b)) {
          return dot(a, b.values);
        }
        assert(
          isArray(a) && isArray(b),
          "The `dot` function only works on arrays, Series, and DataFrames!"
        );
        flatten(a).concat(flatten(b)).forEach((v) => {
          assert(
            isNumber(v),
            "One of the arrays you passed into the `dot` function contains non-numerical values!"
          );
        });
        const aShape = shape(a);
        const bShape = shape(b);
        assert(
          aShape.length <= 2 && bShape.length <= 2,
          "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!"
        );
        assert(
          aShape[aShape.length - 1] === bShape[0],
          `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${aShape[aShape.length - 1]} !== ${bShape[0]})`
        );
        if (aShape.length === 1 && bShape.length === 1) {
          return sum(scale(a, b));
        } else if (aShape.length === 1 && bShape.length === 2) {
          return transpose(b).map((col) => dot(a, col));
        } else if (aShape.length === 2 && bShape.length === 1) {
          return a.map((row) => dot(row, b));
        } else if (aShape.length === 2 && bShape.length === 2) {
          const bTranspose = transpose(b);
          const out = [];
          for (let i = 0; i < a.length; i++) {
            const row = [];
            for (let j = 0; j < bTranspose.length; j++) {
              row.push(dot(a[i], bTranspose[j]));
            }
            out.push(row);
          }
          return out;
        }
      }
      module.exports = dot;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-missing.js
  var require_drop_missing = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-missing.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function dropMissing(x) {
        if (isDataFrame(x) || isSeries(x)) {
          return x.dropMissing(...Object.values(arguments).slice(1));
        }
        assert(
          isArray(x),
          "The `dropMissing` function only works on arrays, Series, and DataFrames!"
        );
        const out = [];
        x.forEach((v) => {
          try {
            return out.push(dropMissing(v));
          } catch (e) {
            if (!isUndefined(v)) {
              out.push(v);
            }
          }
        });
        return out;
      }
      module.exports = dropMissing;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-missing-pairwise.js
  var require_drop_missing_pairwise = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-missing-pairwise.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function dropMissingPairwise(a, b) {
        if (isDataFrame(a) || isSeries(a)) {
          return dropMissingPairwise(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return dropMissingPairwise(a, b.values);
        }
        assert(
          isArray(a) && isArray(b),
          "The `dropMissingPairwise` function only works on arrays, Series, and DataFrames!"
        );
        assert(
          isEqual(shape(a), shape(b)),
          "The two arrays, Series, and/or DataFrames passed into the `dropMissingPairwise` function must have the same shape!"
        );
        const aOut = [];
        const bOut = [];
        for (let i = 0; i < a.length; i++) {
          try {
            const [aChildren, bChildren] = dropMissingPairwise(a[i], b[i]);
            aOut.push(aChildren);
            bOut.push(bChildren);
          } catch (e) {
            if (!isUndefined(a[i]) && !isUndefined(b[i])) {
              aOut.push(a[i]);
              bOut.push(b[i]);
            }
          }
        }
        return [aOut, bOut];
      }
      module.exports = dropMissingPairwise;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-nan-pairwise.js
  var require_drop_nan_pairwise = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-nan-pairwise.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var shape = require_shape();
      function dropNaNPairwise(a, b) {
        if (isDataFrame(a) || isSeries(a)) {
          return dropNaNPairwise(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return dropNaNPairwise(a, b.values);
        }
        assert(
          isArray(a) && isArray(b),
          "The `dropNaNPairwise` only works on arrays, Series, and DataFrames!"
        );
        assert(
          isEqual(shape(a), shape(b)),
          "The two arrays, Series, and/or DataFrames passed into the `dropNaNPairwise` must have the same shape!"
        );
        const aOut = [];
        const bOut = [];
        for (let i = 0; i < a.length; i++) {
          try {
            const [aChildren, bChildren] = dropNaNPairwise(a[i], b[i]);
            aOut.push(aChildren);
            bOut.push(bChildren);
          } catch (e) {
            if (isNumber(a[i]) && isNumber(b[i])) {
              aOut.push(a[i]);
              bOut.push(b[i]);
            }
          }
        }
        return [aOut, bOut];
      }
      module.exports = dropNaNPairwise;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-undefined.js
  var require_drop_undefined = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-undefined.js"(exports, module) {
      var dropMissing = require_drop_missing();
      function dropUndefined(x) {
        return dropMissing(x);
      }
      module.exports = dropUndefined;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/exp.js
  var require_exp = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/exp.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function exp(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.exp(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(exp);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/factorial.js
  var require_factorial = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/factorial.js"(exports, module) {
      var vectorize = require_vectorize();
      function factorial(n) {
        try {
          if (n !== parseInt(n))
            return NaN;
          if (n <= 1)
            return 1;
          return n * factorial(n - 1);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(factorial);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/find.js
  var require_find = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/find.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      function find(x, fn) {
        if (isDataFrame(x)) {
          return find(flatten(x.values), fn);
        }
        if (isSeries(x)) {
          return find(x.values, fn);
        }
        assert(
          isObject(x) || isArray(x),
          "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `find` function!"
        );
        if (!isFunction(fn)) {
          const value = fn;
          fn = (v) => v === value;
        }
        function helper(x2, fn2, checked) {
          checked = checked || [];
          if (checked.indexOf(x2) > -1) {
            return null;
          }
          if (isObject(x2)) {
            checked.push(x2);
            const keys = Object.keys(x2).concat(Object.getOwnPropertySymbols(x2));
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              const value = x2[key];
              if (fn2(value)) {
                return value;
              }
              const result = helper(value, fn2, checked);
              if (result) {
                return result;
              }
            }
          } else if (isArray(x2)) {
            checked.push(x2);
            for (let i = 0; i < x2.length; i++) {
              const value = x2[i];
              if (fn2(value)) {
                return value;
              }
              const result = helper(value, fn2, checked);
              if (result) {
                return result;
              }
            }
          } else {
            if (fn2(x2)) {
              return x2;
            }
          }
          return null;
        }
        function safeFn(v) {
          try {
            return fn(v);
          } catch (e) {
            return false;
          }
        }
        return helper(x, safeFn);
      }
      module.exports = find;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/find-all.js
  var require_find_all = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/find-all.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      function findAll(x, fn) {
        if (isDataFrame(x)) {
          return findAll(flatten(x.values), fn);
        }
        if (isSeries(x)) {
          return findAll(x.values, fn);
        }
        assert(
          isObject(x) || isArray(x),
          "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `findAll` function!"
        );
        if (!isFunction(fn)) {
          const value = fn;
          fn = (v) => v === value;
        }
        function helper(x2, fn2, checked) {
          checked = checked || [];
          if (checked.indexOf(x2) > -1) {
            return null;
          }
          if (isObject(x2)) {
            checked.push(x2);
            const keys = Object.keys(x2).concat(Object.getOwnPropertySymbols(x2));
            const out = [];
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              const value = x2[key];
              let alreadyStoredThisValue = false;
              if (fn2(value)) {
                out.push(value);
                alreadyStoredThisValue = true;
              }
              const results2 = helper(value, fn2, checked);
              if (results2 && results2.length > 0) {
                results2.slice(alreadyStoredThisValue ? 1 : 0).forEach((r) => out.push(r));
              }
            }
            return out;
          } else if (isArray(x2)) {
            checked.push(x2);
            const out = [];
            for (let i = 0; i < x2.length; i++) {
              const value = x2[i];
              let alreadyStoredThisValue = false;
              if (fn2(value)) {
                out.push(value);
                alreadyStoredThisValue = true;
              }
              const results2 = helper(value, fn2, checked);
              if (results2 && results2.length > 0) {
                results2.slice(alreadyStoredThisValue ? 1 : 0).forEach((r) => out.push(r));
              }
            }
            return out;
          } else {
            if (fn2(x2)) {
              return [x2];
            }
          }
          return null;
        }
        function safeFn(v) {
          try {
            return fn(v);
          } catch (e) {
            return false;
          }
        }
        const results = helper(x, safeFn);
        if (results && results.length > 0) {
          return results;
        } else {
          return null;
        }
      }
      module.exports = findAll;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/float.js
  var require_float = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/float.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function float(x) {
        try {
          if (x === "Infinity") {
            return Infinity;
          }
          if (x === "-Infinity") {
            return -Infinity;
          }
          const out = JSON.parse(x);
          if (isNumber(out))
            return out;
          return NaN;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(float);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/floor.js
  var require_floor = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/floor.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function floor(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.floor(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(floor);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/zeros.js
  var require_zeros = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/zeros.js"(exports, module) {
      var isNumber = require_is_number();
      var product = require_product();
      var reshape = require_reshape();
      function zeros(shape) {
        if (isNumber(shape))
          shape = [shape];
        const out = [];
        const n = product(shape);
        for (let i = 0; i < n; i++)
          out.push(0);
        return reshape(out, shape);
      }
      module.exports = zeros;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/identity.js
  var require_identity = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/identity.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var zeros = require_zeros();
      function identity(size) {
        assert(
          !isUndefined(size),
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        assert(
          isNumber(size),
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        assert(
          parseInt(size) === size,
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        assert(
          size > 0,
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        const out = zeros([size, size]);
        for (let i = 0; i < size; i++)
          out[i][i] = 1;
        return out;
      }
      module.exports = identity;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/boolean-values.js
  var require_boolean_values = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/boolean-values.js"(exports, module) {
      module.exports = ["true", "false", "yes", "no"];
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/null-values.js
  var require_null_values = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/null-values.js"(exports, module) {
      module.exports = ["null", "none", "nan", "na", "n/a", "", "undefined"];
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/infer-type.js
  var require_infer_type = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/infer-type.js"(exports, module) {
      var apply = require_apply();
      var assert = require_assert();
      var booleanValues = require_boolean_values();
      var cast = require_cast();
      var count = require_count();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isDate = require_is_date();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var isString = require_is_string();
      var nullValues = require_null_values();
      function checkIfInteger(results) {
        if (results.type === "number") {
          if (typeof results.value !== "undefined") {
            results.isInteger = parseInt(results.value) === results.value;
          } else {
            results.isInteger = flatten(results.values).every(
              (v) => isNumber(v) ? parseInt(v) === v : true
            );
          }
        }
        return results;
      }
      function inferType(arr) {
        if (isDataFrame(arr)) {
          const out = arr.copy();
          const results = inferType(arr.values);
          out.values = results.values;
          return checkIfInteger({ type: results.type, values: out });
        }
        if (isSeries(arr)) {
          const out = arr.copy();
          const results = inferType(arr.values);
          out.values = results.values;
          return checkIfInteger({ type: results.type, values: out });
        }
        if (!isArray(arr)) {
          const out = inferType([arr]);
          out.value = out.values[0];
          delete out.values;
          return checkIfInteger(out);
        }
        assert(
          isArray(arr),
          "The `inferType` function only works on arrays, Series, and DataFrames!"
        );
        const types = flatten(arr).map((v) => {
          if (v === void 0)
            return "null";
          try {
            if (typeof v === "object") {
              const temp = new Date(v.getTime());
              if (isDate(temp)) {
                return "date";
              }
            }
          } catch (e) {
          }
          if (!isString(v)) {
            v = JSON.stringify(v);
          }
          const vLower = v.toLowerCase();
          const vLowerTrimmed = vLower.trim();
          if (nullValues.indexOf(vLowerTrimmed) > -1) {
            return "null";
          }
          if (booleanValues.indexOf(vLowerTrimmed) > -1) {
            return "boolean";
          }
          try {
            const vParsed = JSON.parse(v);
            if (isNumber(vParsed)) {
              return "number";
            }
            if (typeof vParsed === "object") {
              if (isArray(vParsed))
                return "string";
              return "object";
            }
            return "string";
          } catch (e) {
            const vDate = new Date(v);
            if (isDate(vDate)) {
              return "date";
            }
            return "string";
          }
        });
        const counts = count(types).sort((a, b) => b.count - a.count);
        const primaryType = counts[0].value;
        return checkIfInteger({
          type: primaryType,
          values: apply(arr, (v) => cast(v, primaryType))
        });
      }
      module.exports = inferType;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/int.js
  var require_int = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/int.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function int(x) {
        try {
          const out = JSON.parse(x);
          if (isNumber(out))
            return parseInt(out);
          return NaN;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(int);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/intersect.js
  var require_intersect = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/intersect.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var set = require_set();
      function intersect() {
        const arrays = Object.values(arguments).map((x) => {
          if (isDataFrame(x) || isSeries(x)) {
            return set(x.values);
          }
          assert(
            isArray(x),
            "The `intersect` function only works on arrays, Series, and DataFrames!"
          );
          return set(x);
        });
        const all = set(arrays);
        return all.filter((v) => {
          return arrays.every((arr) => arr.findIndex((other) => isEqual(other, v)) > -1);
        });
      }
      module.exports = intersect;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/inverse.js
  var require_inverse = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/inverse.js"(exports, module) {
      var add = require_add();
      var assert = require_assert();
      var dot = require_dot();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var scale = require_scale();
      var shape = require_shape();
      function inverse(x) {
        if (isDataFrame(x)) {
          const out = x.copy();
          out.values = inverse(out.values);
          return out;
        }
        assert(
          isArray(x),
          "The `inverse` function only works on square 2-dimensional arrays or DataFrames!"
        );
        flatten(x).forEach(
          (v) => assert(
            isNumber(v),
            "The array passed into the `inverse` function must contain only numbers!"
          )
        );
        const xShape = shape(x);
        assert(
          xShape.length === 2,
          "The array passed into the `inverse` function must be exactly two-dimensional and square!"
        );
        assert(
          xShape[0] === xShape[1],
          "The array passed into the `inverse` function must be exactly two-dimensional and square!"
        );
        assert(
          xShape[0] >= 0,
          "The array passed into the `inverse` function must be exactly two-dimensional and square!"
        );
        if (xShape[0] === 0) {
          return x;
        } else if (xShape[0] === 1) {
          assert(x[0][0] !== 0, "This matrix cannot be inverted!");
          return 1 / x[0][0];
        } else if (xShape[0] === 2) {
          const a = x[0][0];
          const b = x[0][1];
          const c = x[1][0];
          const d = x[1][1];
          const det = a * d - b * c;
          assert(det !== 0, "This matrix cannot be inverted!");
          const out = [
            [d, -b],
            [-c, a]
          ];
          return scale(out, 1 / det);
        } else if (xShape[0] > 1) {
          const times = (a, b) => isNumber(a) || isNumber(b) ? scale(a, b) : dot(a, b);
          for (let divider = 1; divider < xShape[0] - 1; divider++) {
            try {
              const A = x.slice(0, divider).map((row) => row.slice(0, divider));
              const B = x.slice(0, divider).map((row) => row.slice(divider, xShape[0]));
              const C = x.slice(divider, xShape[0]).map((row) => row.slice(0, divider));
              const D = x.slice(divider, xShape[0]).map((row) => row.slice(divider, xShape[0]));
              const AInv = inverse(A);
              const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))));
              const topLeft = add(
                AInv,
                times(times(times(times(AInv, B), CompInv), C), AInv)
              );
              const topRight = times(-1, times(times(AInv, B), CompInv));
              const bottomLeft = times(-1, times(times(CompInv, C), AInv));
              const bottomRight = CompInv;
              const out = topLeft.map((row, i) => row.concat(topRight[i])).concat(bottomLeft.map((row, i) => row.concat(bottomRight[i])));
              return out;
            } catch (e) {
            }
          }
          assert(false, "This matrix cannot be inverted!");
        }
      }
      module.exports = inverse;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-browser.js
  var require_is_browser = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/is-browser.js"(exports, module) {
      var isBrowser = new Function(
        `
    try {
      return this === window
    } catch(e) {}

    try {
      return !!importScripts
    } catch(e){}

    return false
  `
      );
      module.exports = isBrowser;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/lerp.js
  var require_lerp = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/lerp.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function lerp(a, b, f) {
        try {
          if (!isNumber(a))
            return NaN;
          if (!isNumber(b))
            return NaN;
          if (!isNumber(f))
            return NaN;
          return f * (b - a) + a;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(lerp);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/log.js
  var require_log = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/log.js"(exports, module) {
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var vectorize = require_vectorize();
      function log(x, base) {
        try {
          base = isUndefined(base) ? Math.E : base;
          if (!isNumber(x))
            return NaN;
          if (!isNumber(base))
            return NaN;
          return Math.log(x) / Math.log(base);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(log);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/median.js
  var require_median = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/median.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var sort = require_sort();
      function median(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return median(arr.values);
        }
        assert(
          isArray(arr),
          "The `median` function only works on arrays, Series, and DataFrames!"
        );
        try {
          const temp = sort(flatten(arr));
          if (temp.length === 0) {
            return NaN;
          } else if (temp.length % 2 === 0) {
            return (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2;
          } else {
            return temp[parseInt(temp.length / 2)];
          }
        } catch (e) {
          return NaN;
        }
      }
      module.exports = median;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/mod.js
  var require_mod = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/mod.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function mod(a, b) {
        try {
          if (!isNumber(a))
            return NaN;
          if (!isNumber(b))
            return NaN;
          return a % b;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(mod);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/mode.js
  var require_mode = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/mode.js"(exports, module) {
      var assert = require_assert();
      var count = require_count();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var set = require_set();
      var sort = require_sort();
      function mode(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return mode(arr.values);
        }
        assert(
          isArray(arr),
          "The `mode` function only works on arrays, Series, and DataFrames!"
        );
        try {
          if (arr.length === 0)
            return NaN;
          const temp = flatten(arr);
          if (temp.length === 0)
            return NaN;
          const counts = {};
          const tempSet = set(temp);
          tempSet.forEach((value) => {
            counts[value] = count(temp, value);
          });
          const sortedTempSet = sort(tempSet, (a, b) => counts[b] - counts[a]);
          const mostCountedValue = sortedTempSet[0];
          const out = sort(
            sortedTempSet.filter((value) => counts[value] === counts[mostCountedValue])
          );
          return out;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = mode;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/normal.js
  var require_normal = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/normal.js"(exports, module) {
      var { random } = require_random();
      var apply = require_apply();
      var isUndefined = require_is_undefined();
      var ndarray = require_ndarray();
      function helper() {
        const u1 = random();
        const u2 = random();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      }
      function normal(shape) {
        if (isUndefined(shape))
          return helper();
        return apply(ndarray(shape), helper);
      }
      module.exports = normal;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/ones.js
  var require_ones = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/ones.js"(exports, module) {
      var apply = require_apply();
      var ndarray = require_ndarray();
      function ones(shape) {
        return apply(ndarray(shape), () => 1);
      }
      module.exports = ones;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/permutations.js
  var require_permutations = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/permutations.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function permutations(arr, r) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return permutations(arr.values, r);
        }
        assert(
          isArray(arr),
          "The `permutations` function only works on arrays, Series, and DataFrames!"
        );
        if (isUndefined(r))
          r = arr.length;
        assert(isNumber(r), "`r` must be a whole number!");
        arr = flatten(arr);
        if (r > arr.length) {
          return permutations(arr);
        }
        if (r <= 0) {
          return [[]];
        }
        assert(r === parseInt(r), "`r` must be a whole number!");
        if (arr.length < 2)
          return arr;
        const out = [];
        arr.forEach((item, i) => {
          const before = arr.slice(0, i);
          const after = arr.slice(i + 1);
          const others = before.concat(after);
          const children = permutations(others, r - 1);
          children.forEach((child) => {
            out.push([item].concat(child));
          });
        });
        return out;
      }
      module.exports = permutations;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/print.js
  var require_print = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/print.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isJagged = require_is_jagged();
      var isSeries = require_is_series();
      var shape = require_shape();
      function print() {
        Object.keys(arguments).forEach((key) => {
          const x = arguments[key];
          if (isArray(x)) {
            if (!isJagged(x)) {
              const xShape = shape(x);
              if (xShape.length === 1) {
                new Series(x).print();
              } else if (xShape.length == 2) {
                new DataFrame(x).print();
              } else {
                console.log(x);
              }
            } else {
              console.log(x);
            }
          } else if (isDataFrame(x) || isSeries(x)) {
            x.print();
          } else {
            console.log(x);
          }
        });
      }
      module.exports = print;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/remap.js
  var require_remap = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/remap.js"(exports, module) {
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var max = require_max();
      var min = require_min();
      var vectorize = require_vectorize();
      var helper = vectorize(function(x, a, b, c, d) {
        try {
          if (![x, a, b, c, d].every((v) => isNumber(v))) {
            return NaN;
          }
          if (b - a === 0)
            return NaN;
          return (d - c) * (x - a) / (b - a) + c;
        } catch (e) {
          return NaN;
        }
      });
      function remap(x, a, b, c, d) {
        if (isArray(x) && isUndefined(c) && isUndefined(d)) {
          c = a;
          d = b;
          a = min(x);
          b = max(x);
        }
        return helper(x, a, b, c, d);
      }
      module.exports = remap;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/round.js
  var require_round = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/round.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function round(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.round(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(round);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sign.js
  var require_sign = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sign.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function sign(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (x < 0)
            return -1;
          if (x > 0)
            return 1;
          return 0;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(sign);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sin.js
  var require_sin = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sin.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function sin(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.sin(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(sin);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/stdev.js
  var require_stdev = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/stdev.js"(exports, module) {
      var std = require_std();
      function stdev(x) {
        return std(x);
      }
      module.exports = stdev;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/tan.js
  var require_tan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/tan.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function tan(x) {
        try {
          if (!isNumber(x))
            return NaN;
          return Math.tan(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(tan);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/time.js
  var require_time = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/time.js"(exports, module) {
      var assert = require_assert();
      var isFunction = require_is_function();
      function timeSync(fn, args) {
        assert(isFunction(fn), "`fn` must be a function!");
        const start = /* @__PURE__ */ new Date();
        if (args) {
          fn(...args);
        } else {
          fn();
        }
        return /* @__PURE__ */ new Date() - start;
      }
      async function timeAsync(fn, args) {
        assert(isFunction(fn), "`fn` must be a function!");
        const start = /* @__PURE__ */ new Date();
        if (args) {
          await fn(...args);
        } else {
          await fn();
        }
        return /* @__PURE__ */ new Date() - start;
      }
      module.exports = { timeSync, timeAsync };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/union.js
  var require_union = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/union.js"(exports, module) {
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var set = require_set();
      function union() {
        return set(
          [...arguments].map((v) => {
            if (isArray(v))
              return v;
            if (isDataFrame(v))
              return v.values;
            if (isSeries(v))
              return v.values;
            return [v];
          })
        );
      }
      module.exports = union;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/zip.js
  var require_zip = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/zip.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var max = require_max();
      var range = require_range();
      function zip() {
        const out = [];
        const arrays = Object.values(arguments).map((arr) => {
          if (isDataFrame(arr) || isSeries(arr)) {
            arr = arr.values;
          }
          assert(
            isArray(arr),
            "The `zip` function only works on arrays, Series, and DataFrames!"
          );
          return arr;
        });
        range(0, max(arrays.map((arr) => arr.length))).forEach((i) => {
          const row = [];
          arrays.forEach((arr) => {
            const value = arr[i];
            row.push(isUndefined(value) ? void 0 : value);
          });
          out.push(row);
        });
        return out;
      }
      module.exports = zip;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/index.js
  var require_src = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/index.js"(exports, module) {
      var { copy, decycle } = require_copy();
      var { DataFrame, Series } = require_dataframe();
      var out = {
        abs: require_abs(),
        add: require_add(),
        apply: require_apply(),
        arccos: require_arccos(),
        arcsin: require_arcsin(),
        arctan: require_arctan(),
        argmax: require_argmax(),
        argmin: require_argmin(),
        assert: require_assert(),
        cast: require_cast(),
        ceil: require_ceil(),
        chop: require_chop(),
        clamp: require_clamp(),
        combinations: require_combinations(),
        copy,
        correl: require_correl(),
        cos: require_cos(),
        count: require_count(),
        covariance: require_covariance(),
        DataFrame,
        dataTypes: require_data_types(),
        decycle,
        diff: require_diff(),
        distance: require_distance(),
        divide: require_divide(),
        dot: require_dot(),
        dropMissing: require_drop_missing(),
        dropMissingPairwise: require_drop_missing_pairwise(),
        dropNaN: require_drop_nan(),
        dropNaNPairwise: require_drop_nan_pairwise(),
        dropUndefined: require_drop_undefined(),
        exp: require_exp(),
        factorial: require_factorial(),
        find: require_find(),
        findAll: require_find_all(),
        flatten: require_flatten(),
        float: require_float(),
        floor: require_floor(),
        identity: require_identity(),
        indexOf: require_index_of(),
        inferType: require_infer_type(),
        int: require_int(),
        intersect: require_intersect(),
        inverse: require_inverse(),
        isArray: require_is_array(),
        isBoolean: require_is_boolean(),
        isBrowser: require_is_browser(),
        isDataFrame: require_is_dataframe(),
        isDate: require_is_date(),
        isEqual: require_is_equal(),
        isFunction: require_is_function(),
        isJagged: require_is_jagged(),
        isNested: require_is_nested(),
        isNumber: require_is_number(),
        isObject: require_is_object(),
        isSeries: require_is_series(),
        isString: require_is_string(),
        isUndefined: require_is_undefined(),
        lerp: require_lerp(),
        log: require_log(),
        MathError: require_math_error(),
        max: require_max(),
        mean: require_mean(),
        median: require_median(),
        min: require_min(),
        mod: require_mod(),
        mode: require_mode(),
        multiply: require_multiply(),
        ndarray: require_ndarray(),
        normal: require_normal(),
        ones: require_ones(),
        permutations: require_permutations(),
        pow: require_pow(),
        print: require_print(),
        product: require_product(),
        random: require_random().random,
        range: require_range(),
        remap: require_remap(),
        reshape: require_reshape(),
        reverse: require_reverse(),
        round: require_round(),
        scale: require_scale(),
        seed: require_random().seed,
        Series,
        set: require_set(),
        shape: require_shape(),
        shuffle: require_shuffle(),
        sign: require_sign(),
        sin: require_sin(),
        sort: require_sort(),
        sqrt: require_sqrt(),
        std: require_std(),
        stdev: require_stdev(),
        subtract: require_subtract(),
        sum: require_sum(),
        tan: require_tan(),
        time: require_time().timeSync,
        timeSync: require_time().timeSync,
        timeAsync: require_time().timeAsync,
        transpose: require_transpose(),
        union: require_union(),
        variance: require_variance(),
        vectorize: require_vectorize(),
        zeros: require_zeros(),
        zip: require_zip(),
        dump: function() {
          const context = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : void 0;
          if (!context) {
            throw new out.MathError(
              "Cannot dump functions into global scope because none of `globalThis`, `global`, `window`, or `self` exist in the current context!"
            );
          }
          Object.keys(out).forEach((key) => {
            try {
              Object.defineProperty(context, key, {
                configurable: false,
                enumerable: true,
                writable: false,
                value: out[key]
              });
            } catch (e) {
              context[key] = out[key];
            }
          });
        }
      };
      if (typeof module !== "undefined") {
        module.exports = out;
      }
      if (typeof window !== "undefined") {
        window.JSMathTools = out;
      }
    }
  });

  // node_modules/@jrc03c/make-key/src/index.js
  var require_src2 = __commonJS({
    "node_modules/@jrc03c/make-key/src/index.js"(exports, module) {
      var {
        assert,
        int,
        isNumber,
        isString,
        random,
        seed
      } = require_src();
      function makeKey(keyLength, keySeed, charset) {
        if (arguments.length === 2) {
          if (isNumber(arguments[1])) {
            charset = null;
          } else {
            charset = keySeed;
            keySeed = null;
          }
        }
        assert(
          isNumber(keyLength) && int(keyLength) === keyLength,
          "`keyLength` must be an integer!"
        );
        if (keySeed) {
          assert(
            isNumber(keySeed) && int(keySeed) === keySeed,
            "`keySeed` must be an integer!"
          );
          seed(keySeed);
        }
        if (charset) {
          assert(isString(charset), "`charset` must be a string!");
        }
        let out = "";
        charset = charset || "abcdefg1234567890";
        for (let i = 0; i < keyLength; i++) {
          out += charset[int(random() * charset.length)];
        }
        return out;
      }
      if (typeof module !== "undefined") {
        module.exports = makeKey;
      }
      if (typeof window !== "undefined") {
        window.makeKey = makeKey;
      }
    }
  });

  // src/base.js
  var require_base = __commonJS({
    "src/base.js"(exports, module) {
      var makeKey = require_src2();
      var BaseComponent = class extends HTMLElement {
        static css = `
    x-base {
      color: red;
    }
  `;
        static instanceCount = 0;
        static styleElement = null;
        static template = `
    <slot></slot>
  `;
        eventListenerRemovers = [];
        mutationObserver = null;
        constructor() {
          super();
          this.id = makeKey(8);
          const currentHTML = this.innerHTML;
          this.innerHTML = this.constructor.template;
          if (currentHTML.length > 0) {
            const currentHTMLContainsSlots = currentHTML.match(/<.*?slot=".*?".*?>/g);
            const slots = Array.from(this.querySelectorAll("slot"));
            if (slots.length > 0) {
              if (currentHTMLContainsSlots) {
                const parser = new DOMParser();
                const fragment = parser.parseFromString(currentHTML, "text/html");
                const children = Array.from(fragment.head.children).concat(
                  Array.from(fragment.body.children)
                );
                children.forEach((child) => {
                  const slotName = child.getAttribute("slot") || "(none)";
                  const slot = slotName === "(none)" ? slots[0] : slots.find((slot2) => slot2.name === slotName);
                  if (slot) {
                    slot.parentElement.replaceChild(child, slot);
                  } else {
                    throw new Error(
                      `\`${this.constructor.name}\` elements do not contain "${slotName}" slots!`
                    );
                  }
                });
              } else {
                this.innerHTML = this.innerHTML.replace(
                  /<slot.*?>.*?<\/slot>/g,
                  currentHTML
                );
              }
            } else {
              throw new Error(
                `A \`${this.constructor.name}\` element received slotted content, but \`${this.constructor.name}\` elements have no slots in which to receive such content!`
              );
            }
          }
        }
        addEventListener(name) {
          if (name.includes("attribute-change:") && !this.mutationObserver) {
            this.mutationObserver = new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                  this.dispatchEvent(
                    new CustomEvent("attribute-change:" + mutation.attributeName)
                  );
                }
              }
            });
            this.mutationObserver.observe(this, { attributes: true });
          }
          return super.addEventListener(...arguments);
        }
        connectedCallback() {
          this.constructor.instanceCount++;
          if (this.constructor.instanceCount === 1) {
            this.constructor.styleElement = document.createElement("style");
            this.constructor.styleElement.innerHTML = this.constructor.css;
            document.body.appendChild(this.constructor.styleElement);
          }
          this.dispatchEvent(new CustomEvent("mount"));
          return this;
        }
        disconnectedCallback() {
          this.constructor.instanceCount--;
          if (this.constructor.instanceCount < 1) {
            this.constructor.styleElement.parentElement.removeChild(
              this.constructor.styleElement
            );
          }
          this.eventListenerRemovers.forEach((fn) => fn());
          if (this.mutationObserver) {
            this.mutationObserver.disconnect();
          }
          this.dispatchEvent(new CustomEvent("unmount"));
          return this;
        }
        toObject() {
          return {
            id: this.id
          };
        }
      };
      module.exports = BaseComponent;
    }
  });

  // src/draggable.js
  var require_draggable = __commonJS({
    "src/draggable.js"(exports, module) {
      var css = (
        /* css */
        `
  x-draggable {
    position: absolute;
    left: 0;
    top: 0;
  }

  x-draggable.has-grab-cursor {
    cursor: grab;
  }

  x-draggable.is-being-dragged {
    cursor: grabbing;
  }

  x-draggable.is-being-dragged,
  x-draggable.is-being-dragged * {
    user-select: none;
  }
`
      );
      var template = (
        /* html */
        `
  <slot></slot>
`
      );
      var BaseComponent = require_base();
      var DraggableComponent = class extends BaseComponent {
        static css = css;
        static template = template;
        x_ = 0;
        y_ = 0;
        constructor(data) {
          data = data || {};
          super(data);
          this.dataset.isBeingDragged = false;
          this.dataset.isHLocked = false;
          this.dataset.isVLocked = false;
          this.dataset.mouseX = 0;
          this.dataset.mouseY = 0;
          this.dataset.x = 0;
          this.dataset.y = 0;
        }
        connectedCallback() {
          const boundOnLockStatusChange = this.onLockStatusChange.bind(this);
          const boundOnMouseDown = this.onMouseDown.bind(this);
          const boundOnMouseMove = this.onMouseMove.bind(this);
          const boundOnMouseUp = this.onMouseUp.bind(this);
          const boundOnPositionAttributeChange = this.onPositionAttributeChange.bind(this);
          this.addEventListener("mousedown", boundOnMouseDown);
          window.addEventListener("mousemove", boundOnMouseMove);
          window.addEventListener("mouseup", boundOnMouseUp);
          this.addEventListener(
            "attribute-change:data-is-h-locked",
            boundOnLockStatusChange
          );
          this.addEventListener(
            "attribute-change:data-is-v-locked",
            boundOnLockStatusChange
          );
          this.addEventListener(
            "attribute-change:data-x",
            boundOnPositionAttributeChange
          );
          this.addEventListener(
            "attribute-change:data-y",
            boundOnPositionAttributeChange
          );
          this.eventListenerRemovers.push(() => {
            this.removeEventListener("mousedown", boundOnMouseDown);
            window.removeEventListener("mousemove", boundOnMouseMove);
            window.removeEventListener("mouseup", boundOnMouseUp);
            this.removeEventListener(
              "attribute-change:data-is-h-locked",
              boundOnLockStatusChange
            );
            this.removeEventListener(
              "attribute-change:data-is-v-locked",
              boundOnLockStatusChange
            );
            this.removeEventListener(
              "attribute-change:data-x",
              boundOnPositionAttributeChange
            );
            this.removeEventListener(
              "attribute-change:data-y",
              boundOnPositionAttributeChange
            );
          });
          this.x_ = parseFloat(this.dataset.x);
          this.y_ = parseFloat(this.dataset.y);
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (!isHLocked || !isVLocked) {
            this.classList.add("has-grab-cursor");
          }
          this.updateComputedStyle(true);
          return super.connectedCallback();
        }
        onLockStatusChange() {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (!isHLocked || !isVLocked) {
            this.classList.add("has-grab-cursor");
          } else {
            this.classList.remove("has-grab-cursor");
          }
        }
        onMouseDown(event) {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (isHLocked && isVLocked) {
            return;
          }
          if (!isHLocked) {
            this.dataset.mouseX = event.screenX;
          }
          if (!isVLocked) {
            this.dataset.mouseY = event.screenY;
          }
          this.dataset.isBeingDragged = true;
          this.classList.add("is-being-dragged");
          this.dispatchEvent(
            new CustomEvent("drag-start", { detail: this.getBoundingClientRect() })
          );
          return this;
        }
        onMouseMove(event) {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (isHLocked && isVLocked) {
            return;
          }
          if (JSON.parse(this.dataset.isBeingDragged)) {
            const dx = event.screenX - parseFloat(this.dataset.mouseX);
            const dy = event.screenY - parseFloat(this.dataset.mouseY);
            if (!isHLocked) {
              this.x_ += dx;
              this.dataset.mouseX = event.screenX;
            }
            if (!isVLocked) {
              this.y_ += dy;
              this.dataset.mouseY = event.screenY;
            }
            this.updateComputedStyle();
            this.dispatchEvent(
              new CustomEvent("drag", { detail: this.getBoundingClientRect() })
            );
          }
          return this;
        }
        onMouseUp() {
          const isHLocked = JSON.parse(this.dataset.isHLocked);
          const isVLocked = JSON.parse(this.dataset.isVLocked);
          if (isHLocked && isVLocked) {
            return;
          }
          const wasBeingDragged = JSON.parse(this.dataset.isBeingDragged);
          this.dataset.isBeingDragged = false;
          this.classList.remove("is-being-dragged");
          if (wasBeingDragged) {
            this.dispatchEvent(
              new CustomEvent("drag-end", { detail: this.getBoundingClientRect() })
            );
          }
          return this;
        }
        onPositionAttributeChange() {
          this.x_ = parseFloat(this.dataset.x);
          this.y_ = parseFloat(this.dataset.y);
          this.updateComputedStyle();
        }
        updateComputedStyle(shouldForceUpdate) {
          if (shouldForceUpdate || !JSON.parse(this.dataset.isHLocked)) {
            this.style.left = this.x_ + "px";
          }
          if (shouldForceUpdate || !JSON.parse(this.dataset.isVLocked)) {
            this.style.top = this.y_ + "px";
          }
        }
      };
      customElements.define("x-draggable", DraggableComponent);
      module.exports = DraggableComponent;
    }
  });

  // src/index.js
  var require_src3 = __commonJS({
    "src/index.js"(exports, module) {
      var MiscWebComponents = {
        Base: require_base(),
        // ContextMenu: require("./context-menu"),
        Draggable: require_draggable()
        // Frame: require("./frame"),
        // Resizeable: require("./resizeable"),
      };
      if (typeof module !== "undefined") {
        module.exports = MiscWebComponents;
      }
      if (typeof window !== "undefined") {
        window.MiscWebComponents = MiscWebComponents;
      }
    }
  });
  require_src3();
})();
