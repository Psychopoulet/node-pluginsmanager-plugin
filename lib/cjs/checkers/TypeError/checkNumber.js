"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumber = exports.checkNumberSync = void 0;
// locals
const checkExists_1 = require("../ReferenceError/checkExists");
// module
function checkNumberSync(dataName, data) {
    let err = (0, checkExists_1.checkExistsSync)(dataName, data);
    if (!err && "number" !== typeof data) {
        err = new TypeError("\"" + dataName + "\" is not a number");
    }
    return err;
}
exports.checkNumberSync = checkNumberSync;
function checkNumber(dataName, data) {
    const err = checkNumberSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkNumber = checkNumber;
