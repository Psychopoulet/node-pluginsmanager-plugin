"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractMime;
// locals
const checkString_1 = require("../../checkers/TypeError/checkString");
const checkNonEmptyNumber_1 = require("../../checkers/RangeError/checkNonEmptyNumber");
const checkObject_1 = require("../../checkers/TypeError/checkObject");
// consts
const DEFAULT_MIME = "text/plain";
// module
function extractMime(contentType, code, responses) {
    const err = (0, checkString_1.checkStringSync)("contentType", contentType)
        ?? (0, checkNonEmptyNumber_1.checkNonEmptyNumberSync)("code", code)
        ?? (0, checkObject_1.checkObjectSync)("responses", responses);
    if (err) {
        throw err;
    }
    else {
        const stringifiedCode = String(code);
        const res = responses; // mandatory for typing, convert "unknown" response to controlled and typed one
        if ("undefined" === typeof res[stringifiedCode] && "undefined" === typeof res.default && "" !== contentType.trim()) {
            return contentType;
        }
        else {
            let descriptorContent = {};
            if ("object" === typeof res[stringifiedCode]) {
                if ("object" === typeof res[stringifiedCode].content) {
                    descriptorContent = res[stringifiedCode].content;
                }
            }
            else if ("object" === typeof res.default) {
                if ("object" === typeof res.default.content) {
                    descriptorContent = res.default.content;
                }
            }
            else {
                return DEFAULT_MIME;
            }
            const possibleMimes = Object.keys(descriptorContent);
            const [mimeRequest, charsetRequest] = contentType.split(";").map((content) => {
                return content.trim().toLowerCase();
            });
            let result = DEFAULT_MIME; // default mime
            if (!possibleMimes.length) {
                if (mimeRequest) {
                    result = mimeRequest;
                }
                else {
                    result = DEFAULT_MIME;
                }
            }
            else if (1 === possibleMimes.length) { // only one possible option
                [result] = possibleMimes;
            }
            else {
                result = mimeRequest && possibleMimes.includes(mimeRequest) ? mimeRequest : DEFAULT_MIME;
            }
            if (charsetRequest) {
                result = mimeRequest + "; " + charsetRequest;
            }
            return result;
        }
    }
}
