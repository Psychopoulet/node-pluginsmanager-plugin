"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBooleanSync = checkBooleanSync;
exports.checkBoolean = checkBoolean;
// locals
const checkExists_1 = require("../ReferenceError/checkExists");
// module
function checkBooleanSync(dataName, data) {
    let err = (0, checkExists_1.checkExistsSync)(dataName, data);
    if (!err && "boolean" !== typeof data) {
        err = new TypeError("\"" + dataName + "\" is not a boolean");
    }
    return err;
}
function checkBoolean(dataName, data) {
    const err = checkBooleanSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
