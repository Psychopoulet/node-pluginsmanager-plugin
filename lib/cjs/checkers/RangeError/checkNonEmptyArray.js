"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNonEmptyArray = exports.checkNonEmptyArraySync = void 0;
//  deps
// locals
const checkArray_1 = require("./../TypeError/checkArray");
// module
function checkNonEmptyArraySync(dataName, data) {
    let err = (0, checkArray_1.checkArraySync)(dataName, data);
    if (!err && 1 > data.length) {
        err = new RangeError("\"" + dataName + "\" length must be higher than 0");
    }
    return err;
}
exports.checkNonEmptyArraySync = checkNonEmptyArraySync;
;
function checkNonEmptyArray(dataName, data) {
    const err = checkNonEmptyArraySync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkNonEmptyArray = checkNonEmptyArray;
;
