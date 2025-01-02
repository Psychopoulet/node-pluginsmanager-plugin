"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectSync = checkObjectSync;
exports.checkObject = checkObject;
// locals
const checkExists_1 = require("../ReferenceError/checkExists");
// module
function checkObjectSync(dataName, data) {
    let err = (0, checkExists_1.checkExistsSync)(dataName, data);
    if (!err && ("object" !== typeof data || null === data)) {
        err = new TypeError("\"" + dataName + "\" is not an object");
    }
    return err;
}
function checkObject(dataName, data) {
    const err = checkObjectSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
