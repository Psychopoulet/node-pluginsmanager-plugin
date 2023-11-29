"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function send(req, code, responses) {
    const stringifiedCode = String(code);
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
        throw new ReferenceError("No \"response\" detected in Descriptor");
    }
    // 201 (put) => may be without content
    // 204 => no content
    if (!descriptorContent && !["201", "204"].includes(stringifiedCode)) {
        throw new TypeError("No valid \"response\" detected in Descriptor");
    }
    else {
        const [mimeRequest, charsetRequest] = req.headers["content-type"].split(";").map((content) => {
            return content.trim().toLowerCase();
        });
        let mime = "";
        if (descriptorContent && Object.keys(descriptorContent).includes(mimeRequest)) {
            mime = mimeRequest;
        }
        if (!mime) {
            mime = mimeRequest || "text/plain";
        }
        if (mimeRequest && mimeRequest !== mime) {
            throw new RangeError("Mime detected in request (" + mimeRequest + ") is not the same than actually returned (" + mime + ")");
        }
        if (charsetRequest) {
            mime = mimeRequest + "; " + charsetRequest;
        }
        return mime;
    }
}
exports.default = send;
;
