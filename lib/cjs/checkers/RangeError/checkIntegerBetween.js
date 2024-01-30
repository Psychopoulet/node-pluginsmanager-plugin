"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIntegerBetween = exports.checkIntegerBetweenSync = void 0;
// locals
const checkInteger_1 = require("./../TypeError/checkInteger");
const checkNonEmptyInteger_1 = require("./checkNonEmptyInteger");
// module
function checkIntegerBetweenSync(dataName, data, min, max) {
    let err = (0, checkInteger_1.checkIntegerSync)(dataName, data);
    if (!err) {
        err = (0, checkInteger_1.checkIntegerSync)(dataName + "/min", min);
    }
    if (!err) {
        err = (0, checkNonEmptyInteger_1.checkNonEmptyIntegerSync)(dataName + "/max", max);
    }
    if (!err && min > data) {
        err = new RangeError("\"" + dataName + "\" must be higher than " + min);
    }
    if (!err && max < data) {
        err = new RangeError("\"" + dataName + "\" must be lower than " + max);
    }
    return err;
}
exports.checkIntegerBetweenSync = checkIntegerBetweenSync;
function checkIntegerBetween(dataName, data, min, max) {
    const err = checkIntegerBetweenSync(dataName, data, min, max);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkIntegerBetween = checkIntegerBetween;
