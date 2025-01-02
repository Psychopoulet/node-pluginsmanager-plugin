"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStringLengthSync = checkStringLengthSync;
exports.checkStringLength = checkStringLength;
// locals
const checkString_1 = require("./../TypeError/checkString");
const checkInteger_1 = require("./../TypeError/checkInteger");
// module
function checkStringLengthSync(dataName, data, length) {
    let err = (0, checkString_1.checkStringSync)(dataName, data);
    if (!err) {
        err = (0, checkInteger_1.checkIntegerSync)(dataName + "/length", length);
    }
    if (!err && length !== data.length) {
        err = new RangeError("\"" + dataName + "\" length must be equal to " + length);
    }
    return err;
}
function checkStringLength(dataName, data, length) {
    const err = checkStringLengthSync(dataName, data, length);
    return err ? Promise.reject(err) : Promise.resolve();
}
