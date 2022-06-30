"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStringLength = exports.checkStringLengthSync = void 0;
//  deps
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
exports.checkStringLengthSync = checkStringLengthSync;
;
function checkStringLength(dataName, data, length) {
    const err = checkStringLengthSync(dataName, data, length);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkStringLength = checkStringLength;
;
