"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArrayLength = exports.checkArrayLengthSync = void 0;
//  deps
// locals
const checkArray_1 = require("./../TypeError/checkArray");
const checkInteger_1 = require("./../TypeError/checkInteger");
// module
function checkArrayLengthSync(dataName, data, length) {
    let err = (0, checkArray_1.checkArraySync)(dataName, data);
    if (!err) {
        err = (0, checkInteger_1.checkIntegerSync)(dataName + "/length", length);
    }
    if (!err && length !== data.length) {
        err = new RangeError("\"" + dataName + "\" length must be equal to " + length);
    }
    return err;
}
exports.checkArrayLengthSync = checkArrayLengthSync;
;
function checkArrayLength(dataName, data, length) {
    const err = checkArrayLengthSync(dataName, data, length);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkArrayLength = checkArrayLength;
;
