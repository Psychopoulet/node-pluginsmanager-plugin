"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArray = exports.checkArraySync = void 0;
//  deps
// locals
const checkObject_1 = require("../TypeError/checkObject");
// module
function checkArraySync(dataName, data) {
    let err = (0, checkObject_1.checkObjectSync)(dataName, data);
    if (!err && !(data instanceof Array)) {
        err = new TypeError("\"" + dataName + "\" is not an Array");
    }
    return err;
}
exports.checkArraySync = checkArraySync;
;
function checkArray(dataName, data) {
    const err = checkArraySync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkArray = checkArray;
;
