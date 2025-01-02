"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStringSync = checkStringSync;
exports.checkString = checkString;
// locals
const checkExists_1 = require("../ReferenceError/checkExists");
// module
function checkStringSync(dataName, data) {
    let err = (0, checkExists_1.checkExistsSync)(dataName, data);
    if (!err && "string" !== typeof data) {
        err = new TypeError("\"" + dataName + "\" is not a string");
    }
    return err;
}
function checkString(dataName, data) {
    const err = checkStringSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
