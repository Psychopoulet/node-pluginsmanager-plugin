"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArrayLengthBetweenSync = checkArrayLengthBetweenSync;
exports.checkArrayLengthBetween = checkArrayLengthBetween;
// locals
const checkArray_1 = require("./../TypeError/checkArray");
const checkInteger_1 = require("./../TypeError/checkInteger");
const checkNonEmptyInteger_1 = require("./checkNonEmptyInteger");
// module
function checkArrayLengthBetweenSync(dataName, data, min, max) {
    let err = (0, checkArray_1.checkArraySync)(dataName, data);
    if (!err) {
        err = (0, checkInteger_1.checkIntegerSync)(dataName + "/min", min);
    }
    if (!err) {
        err = (0, checkNonEmptyInteger_1.checkNonEmptyIntegerSync)(dataName + "/max", max);
    }
    if (!err && min > data.length) {
        err = new RangeError("\"" + dataName + "\" length must be higher than " + min);
    }
    if (!err && max < data.length) {
        err = new RangeError("\"" + dataName + "\" length must be lower than " + max);
    }
    return err;
}
function checkArrayLengthBetween(dataName, data, min, max) {
    const err = checkArrayLengthBetweenSync(dataName, data, min, max);
    return err ? Promise.reject(err) : Promise.resolve();
}
