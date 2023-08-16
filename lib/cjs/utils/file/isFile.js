"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const node_fs_1 = require("node:fs");
// locals
const checkNonEmptyString_1 = require("../../checkers/RangeError/checkNonEmptyString");
// module
function isFile(filename) {
    return (0, checkNonEmptyString_1.checkNonEmptyString)("filename", filename).then(() => {
        return new Promise((resolve) => {
            (0, node_fs_1.lstat)(filename, (err, stats) => {
                return resolve(Boolean(!err && stats.isFile()));
            });
        });
    });
}
exports.default = isFile;
;
