"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStringLengthBetween = exports.checkStringLengthBetweenSync = void 0;
// locals
const checkString_1 = require("./../TypeError/checkString");
const checkInteger_1 = require("./../TypeError/checkInteger");
const checkNonEmptyInteger_1 = require("./checkNonEmptyInteger");
// module
function checkStringLengthBetweenSync(dataName, data, min, max) {
    let err = (0, checkString_1.checkStringSync)(dataName, data);
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
exports.checkStringLengthBetweenSync = checkStringLengthBetweenSync;
function checkStringLengthBetween(dataName, data, min, max) {
    const err = checkStringLengthBetweenSync(dataName, data, min, max);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkStringLengthBetween = checkStringLengthBetween;
