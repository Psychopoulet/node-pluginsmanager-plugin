"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExists = exports.checkExistsSync = void 0;
// module
function checkExistsSync(dataName, data) {
    let err = null;
    if ("undefined" === typeof data) {
        err = new ReferenceError("\"" + dataName + "\" does not exist");
    }
    return err;
}
exports.checkExistsSync = checkExistsSync;
;
function checkExists(dataName, data) {
    const err = checkExistsSync(dataName, data);
    return err ? Promise.reject(err) : Promise.resolve();
}
exports.checkExists = checkExists;
;
