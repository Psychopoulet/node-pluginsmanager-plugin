"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNonEmptyString = exports.checkNonEmptyStringSync = void 0;
//  deps
// locals
const checkString_1 = require("./../TypeError/checkString");
// module
function checkNonEmptyStringSync(dataName, data) {
    let err = (0, checkString_1.checkStringSync)(dataName, data);
    if (!err && "" === data.trim()) {
        err = new RangeError("\"" + dataName + "\" must be higher than 0");
    }
    return err;
}
exports.checkNonEmptyStringSync = checkNonEmptyStringSync;
;
function checkNonEmptyString(dataName, data) {
    const err = checkNonEmptyStringSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkNonEmptyString = checkNonEmptyString;
;
