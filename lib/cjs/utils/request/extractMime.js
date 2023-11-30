"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const checkString_1 = require("../../checkers/TypeError/checkString");
const checkNonEmptyNumber_1 = require("../../checkers/RangeError/checkNonEmptyNumber");
const checkObject_1 = require("../../checkers/TypeError/checkObject");
// consts
const DEFAULT_MIME = "text/plain";
// module
function extractMime(contentType, code, responses) {
    const err = (0, checkString_1.checkStringSync)("contentType", contentType) ||
        (0, checkNonEmptyNumber_1.checkNonEmptyNumberSync)("code", code) ||
        (0, checkObject_1.checkObjectSync)("responses", responses);
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
            if (!possibleMimes.length) {
                if (contentType) {
                    return contentType;
                }
                else {
                    return DEFAULT_MIME;
                }
            }
            else if (1 === possibleMimes.length) { // only one possible option
                return possibleMimes[0];
            }
            else {
                let result = DEFAULT_MIME; // default mime
                const [mimeRequest, charsetRequest] = contentType.split(";").map((content) => {
                    return content.trim().toLowerCase();
                });
                if (mimeRequest && possibleMimes.includes(mimeRequest)) {
                    result = mimeRequest;
                }
                else {
                    result = DEFAULT_MIME;
                }
                if (charsetRequest) {
                    result = mimeRequest + "; " + charsetRequest;
                }
                return result;
            }
        }
    }
}
exports.default = extractMime;
;
