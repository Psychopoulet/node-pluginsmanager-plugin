"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const checkString_1 = require("../../checkers/TypeError/checkString");
const checkNonEmptyNumber_1 = require("../../checkers/RangeError/checkNonEmptyNumber");
const checkObject_1 = require("../../checkers/TypeError/checkObject");
// consts
const DEFAULT_MIME = "text/plain";
// module
function extractMime(contentType, code, responses) {
    var _a, _b;
    const err = (_b = (_a = (0, checkString_1.checkStringSync)("contentType", contentType)) !== null && _a !== void 0 ? _a : (0, checkNonEmptyNumber_1.checkNonEmptyNumberSync)("code", code)) !== null && _b !== void 0 ? _b : (0, checkObject_1.checkObjectSync)("responses", responses);
    if (err) {
        throw err;
    }
    else {
        const stringifiedCode = String(code);
        if (!responses[stringifiedCode] && !responses.default && "" !== contentType.trim()) {
            return contentType;
        }
        else {
            let descriptorContent;
            if (responses[stringifiedCode]) {
                if (responses[stringifiedCode].content) {
                    descriptorContent = responses[stringifiedCode].content;
                }
            }
            else if (responses.default && responses.default.content) {
                descriptorContent = responses.default.content;
            }
            else {
                return DEFAULT_MIME;
            }
            const possibleMimes = descriptorContent ? Object.keys(descriptorContent) : [];
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
                result = possibleMimes[0];
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
exports.default = extractMime;
