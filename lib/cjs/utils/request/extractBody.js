"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractBody;
// locals
const checkInteger_1 = require("../../checkers/TypeError/checkInteger");
const checkFunction_1 = require("../../checkers/TypeError/checkFunction");
const checkNonEmptyObject_1 = require("../../checkers/RangeError/checkNonEmptyObject");
// module
function extractBody(req) {
    return (0, checkNonEmptyObject_1.checkNonEmptyObject)("req", req).then(() => {
        return (0, checkFunction_1.checkFunction)("req.on", req.on);
    }).then(() => {
        return (0, checkNonEmptyObject_1.checkNonEmptyObject)("req.headers", req.headers);
    }).then(() => {
        return (0, checkInteger_1.checkInteger)("req.headers[\"content-length\"]", req.headers["content-length"]);
    }).then(() => {
        return new Promise((resolve, reject) => {
            let queryData = "";
            req.on("data", (data) => {
                queryData += data.toString("utf-8");
            }).on("end", () => {
                if ("" === queryData || "null" === queryData) {
                    resolve("");
                }
                else {
                    req.headers["content-length"] = parseInt(req.headers["content-length"], 10);
                    if (req.headers["content-length"] !== Buffer.byteLength(queryData)) {
                        reject(new Error("\"Content-Length\" header (" + Buffer.byteLength(queryData) + ")"
                            + " is not as expected (" + req.headers["content-length"] + ")."
                            + " Do not forget the fact that it is a 8-bit bytes number."));
                    }
                    else {
                        resolve(queryData);
                    }
                }
            });
        });
    });
}
