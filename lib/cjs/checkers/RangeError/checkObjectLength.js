"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectLengthSync = checkObjectLengthSync;
exports.checkObjectLength = checkObjectLength;
// locals
const checkObject_1 = require("./../TypeError/checkObject");
const checkInteger_1 = require("./../TypeError/checkInteger");
// private
// methods
// module
function checkObjectLengthSync(dataName, data, _length) {
    let err = (0, checkObject_1.checkObjectSync)(dataName, data);
    if (!err) {
        err = (0, checkInteger_1.checkIntegerSync)(dataName + "/length", _length);
    }
    if (!err) {
        const { length } = Object.keys(data);
        if (_length !== length) {
            err = new RangeError("\"" + dataName + "\" keys count must be equal to " + _length);
        }
    }
    return err;
}
function checkObjectLength(dataName, data, length) {
    const err = checkObjectLengthSync(dataName, data, length);
    return err ? Promise.reject(err) : Promise.resolve();
}
