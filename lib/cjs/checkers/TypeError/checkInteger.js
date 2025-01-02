"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIntegerSync = checkIntegerSync;
exports.checkInteger = checkInteger;
// locals
const checkExists_1 = require("../ReferenceError/checkExists");
// module
function checkIntegerSync(dataName, data) {
    let err = (0, checkExists_1.checkExistsSync)(dataName, data);
    if (!err && !Number.isInteger(data)) {
        err = new TypeError("\"" + dataName + "\" is not an integer");
    }
    return err;
}
function checkInteger(dataName, data) {
    const err = checkIntegerSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
