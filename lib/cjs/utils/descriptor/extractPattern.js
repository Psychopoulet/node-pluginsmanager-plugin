"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractPattern;
// locals
const removeFirstSlash_1 = __importDefault(require("../removeFirstSlash"));
// module
function extractPattern(paths, pathname, method) {
    var _a;
    return "object" !== typeof paths ? "" : (_a = Object.keys(paths).filter((p) => {
        return "undefined" !== typeof paths[p][method];
    }).find((p) => {
        const pathnameSplitted = (0, removeFirstSlash_1.default)(pathname).split("/");
        const pathSplitted = (0, removeFirstSlash_1.default)(p).split("/");
        if (pathnameSplitted.length !== pathSplitted.length) {
            return false;
        }
        for (let i = 0; i < pathnameSplitted.length; ++i) {
            if ("{" !== pathSplitted[i][0] && pathSplitted[i] !== pathnameSplitted[i]) {
                return false;
            }
        }
        return true;
    })) !== null && _a !== void 0 ? _a : "";
}
