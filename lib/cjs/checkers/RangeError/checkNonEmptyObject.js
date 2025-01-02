"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNonEmptyObjectSync = checkNonEmptyObjectSync;
exports.checkNonEmptyObject = checkNonEmptyObject;
// locals
const checkObject_1 = require("./../TypeError/checkObject");
// module
function checkNonEmptyObjectSync(dataName, data) {
    let err = (0, checkObject_1.checkObjectSync)(dataName, data);
    if (!err && 1 > Object.keys(data).length) {
        err = new RangeError("\"" + dataName + "\" must have keys");
    }
    return err;
}
function checkNonEmptyObject(dataName, data) {
    const err = checkNonEmptyObjectSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
