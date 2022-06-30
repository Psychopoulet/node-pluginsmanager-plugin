"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const fs_1 = require("fs");
// locals
const checkNonEmptyString_1 = require("../../checkers/RangeError/checkNonEmptyString");
// module
function isFile(file) {
    return (0, checkNonEmptyString_1.checkNonEmptyString)("file", file).then(() => {
        return new Promise((resolve) => {
            (0, fs_1.lstat)(file, (err, stats) => {
                return resolve(Boolean(!err && stats.isFile()));
            });
        });
    });
}
exports.default = isFile;
;
