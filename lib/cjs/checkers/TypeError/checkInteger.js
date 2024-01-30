"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInteger = exports.checkIntegerSync = void 0;
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
exports.checkIntegerSync = checkIntegerSync;
function checkInteger(dataName, data) {
    const err = checkIntegerSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkInteger = checkInteger;
