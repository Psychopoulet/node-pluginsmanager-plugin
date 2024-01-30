"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFunction = exports.checkFunctionSync = void 0;
// locals
const checkExists_1 = require("../ReferenceError/checkExists");
// module
function checkFunctionSync(dataName, data) {
    let err = (0, checkExists_1.checkExistsSync)(dataName, data);
    if (!err && "function" !== typeof data) {
        err = new TypeError("\"" + dataName + "\" is not a function");
    }
    return err;
}
exports.checkFunctionSync = checkFunctionSync;
function checkFunction(dataName, data) {
    const err = checkFunctionSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkFunction = checkFunction;
