"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function removeFirstSlash(path) {
    return "string" === typeof path && "/" === path[0] ? path.substring(1, path.length) : String(path);
}
exports.default = removeFirstSlash;
;
