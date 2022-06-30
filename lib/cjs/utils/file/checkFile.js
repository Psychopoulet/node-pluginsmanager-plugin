"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const isFile_1 = __importDefault(require("./isFile"));
// module
function checkFile(file) {
    return (0, isFile_1.default)(file).then((exists) => {
        return exists ? Promise.resolve() :
            Promise.reject(new Error("\"" + file + "\" does not exist."));
    });
}
exports.default = checkFile;
;
