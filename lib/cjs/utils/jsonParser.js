"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function jsonParser(content) {
    try {
        let parsed = JSON.parse(content);
        if ("string" === typeof parsed) {
            parsed = jsonParser(parsed);
        }
        return parsed;
    }
    catch (e) {
        return content;
    }
}
exports.default = jsonParser;
;
