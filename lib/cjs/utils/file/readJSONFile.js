"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const promises_1 = require("node:fs/promises");
// locals
const checkFile_1 = __importDefault(require("./checkFile"));
// module
function readJSONFile(file) {
    return (0, checkFile_1.default)(file).then(() => {
        return (0, promises_1.readFile)(file, "utf-8");
    }).then((content) => {
        return Promise.resolve(JSON.parse(content));
    });
}
exports.default = readJSONFile;
;
