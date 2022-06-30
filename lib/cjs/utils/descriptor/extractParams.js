"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const removeFirstSlash_1 = __importDefault(require("../removeFirstSlash"));
// module
function extractParams(patternPath, realPath) {
    const params = {};
    const patternPathSplitted = (0, removeFirstSlash_1.default)(patternPath).split("/");
    (0, removeFirstSlash_1.default)(realPath).split("/").forEach((p, i) => {
        if ("{" === patternPathSplitted[i][0]) {
            params[patternPathSplitted[i].replace("{", "").replace("}", "")] = decodeURI(p);
        }
    });
    return params;
}
exports.default = extractParams;
;
