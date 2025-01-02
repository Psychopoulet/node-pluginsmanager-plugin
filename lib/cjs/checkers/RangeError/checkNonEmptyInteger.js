"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNonEmptyIntegerSync = checkNonEmptyIntegerSync;
exports.checkNonEmptyInteger = checkNonEmptyInteger;
// locals
const checkInteger_1 = require("./../TypeError/checkInteger");
// module
function checkNonEmptyIntegerSync(dataName, data) {
    let err = (0, checkInteger_1.checkIntegerSync)(dataName, data);
    if (!err && 0 >= data) {
        err = new RangeError("\"" + dataName + "\" must be higher than 0");
    }
    return err;
}
function checkNonEmptyInteger(dataName, data) {
    const err = checkNonEmptyIntegerSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
