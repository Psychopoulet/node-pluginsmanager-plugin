"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberSync = checkNumberSync;
exports.checkNumber = checkNumber;
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
function checkNumber(dataName, data) {
    const err = checkNumberSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
