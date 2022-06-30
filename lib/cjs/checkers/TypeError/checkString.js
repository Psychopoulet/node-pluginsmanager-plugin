"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkString = exports.checkStringSync = void 0;
//  deps
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
exports.checkStringSync = checkStringSync;
;
function checkString(dataName, data) {
    const err = checkStringSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkString = checkString;
;
