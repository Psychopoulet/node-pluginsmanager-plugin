"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const isFile_1 = __importDefault(require("./isFile"));
// module
function checkFile(filename) {
    return (0, isFile_1.default)(filename).then((exists) => {
        return exists
            ? Promise.resolve()
            : Promise.reject(new Error("\"" + filename + "\" does not exist."));
    });
}
exports.default = checkFile;
