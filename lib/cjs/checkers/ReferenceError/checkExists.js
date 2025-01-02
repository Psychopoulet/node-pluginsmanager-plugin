"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistsSync = checkExistsSync;
exports.checkExists = checkExists;
function checkExistsSync(dataName, data) {
    let err = null;
    if ("undefined" === typeof data) {
        err = new ReferenceError("\"" + dataName + "\" does not exist");
    }
    return err;
}
function checkExists(dataName, data) {
    const err = checkExistsSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
