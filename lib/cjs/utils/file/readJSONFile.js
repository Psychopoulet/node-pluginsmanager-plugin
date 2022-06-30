"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const fs_1 = require("fs");
// locals
const checkFile_1 = __importDefault(require("./checkFile"));
// module
function readJSONFile(file) {
    return (0, checkFile_1.default)(file).then(() => {
        return new Promise((resolve, reject) => {
            (0, fs_1.readFile)(file, "utf8", (err, content) => {
                return err ? reject(err) : resolve(content);
            });
        });
    }).then((content) => {
        return Promise.resolve(JSON.parse(content));
    });
}
exports.default = readJSONFile;
;
