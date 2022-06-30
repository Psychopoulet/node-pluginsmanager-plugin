"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNonEmptyNumber = exports.checkNonEmptyNumberSync = void 0;
//  deps
// locals
const checkNumber_1 = require("./../TypeError/checkNumber");
// module
function checkNonEmptyNumberSync(dataName, data) {
    let err = (0, checkNumber_1.checkNumberSync)(dataName, data);
    if (!err && 0 >= data) {
        err = new RangeError("\"" + dataName + "\" must be higher than 0");
    }
    return err;
}
exports.checkNonEmptyNumberSync = checkNonEmptyNumberSync;
;
function checkNonEmptyNumber(dataName, data) {
    const err = checkNonEmptyNumberSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkNonEmptyNumber = checkNonEmptyNumber;
;
