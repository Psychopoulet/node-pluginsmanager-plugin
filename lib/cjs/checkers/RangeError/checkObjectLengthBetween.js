"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectLengthBetween = exports.checkObjectLengthBetweenSync = void 0;
//  deps
// locals
const checkObject_1 = require("./../TypeError/checkObject");
const checkInteger_1 = require("./../TypeError/checkInteger");
const checkNonEmptyInteger_1 = require(".//checkNonEmptyInteger");
// module
function checkObjectLengthBetweenSync(dataName, data, min, max) {
    let err = (0, checkObject_1.checkObjectSync)(dataName, data);
    if (!err) {
        err = (0, checkInteger_1.checkIntegerSync)(dataName + "/min", min);
    }
    if (!err) {
        err = (0, checkNonEmptyInteger_1.checkNonEmptyIntegerSync)(dataName + "/max", max);
    }
    if (!err) {
        const { length } = Object.keys(data);
        if (min > length) {
            err = new RangeError("\"" + dataName + "\" length must be higher than " + min);
        }
        if (!err && max < length) {
            err = new RangeError("\"" + dataName + "\" length must be lower than " + max);
        }
    }
    return err;
}
exports.checkObjectLengthBetweenSync = checkObjectLengthBetweenSync;
;
function checkObjectLengthBetween(dataName, data, min, max) {
    const err = checkObjectLengthBetweenSync(dataName, data, min, max);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkObjectLengthBetween = checkObjectLengthBetween;
;
