"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
// module
function send(req, res, code, content, options) {
    return Promise.resolve().then(() => {
        if (!content) {
            return "";
        }
        else {
            let result = "";
            if (options.mime.includes("application/json")) {
                if ("string" === typeof content) {
                    try {
                        JSON.parse(content); // is content json & parseable ?
                        result = content; // yes => valid JSON string, send it as it is
                    }
                    catch (e) {
                        result = JSON.stringify(content); // no => not JSON string, send formatted one
                    }
                }
                else {
                    const stringified = JSON.stringify(content);
                    if (stringified !== content) {
                        result = stringified;
                    }
                }
            }
            else {
                result = content;
            }
            return result;
        }
    }).then((formattedContent) => {
        return new Promise((resolve) => {
            // force data for checking
            res.statusCode = code;
            res.headers = Object.assign({
                "Content-Type": options.mime,
                "Content-Length": formattedContent ? Buffer.byteLength(formattedContent) : 0,
                "Status-Code-Url-Cat": "https://http.cat/" + code,
                "API-Version": options.apiVersion
            }, options.cors ? {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Methods": req.headers["access-control-request-method"]
                    ? req.headers["access-control-request-method"]
                    : [
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                    ].join(", "),
                "Access-Control-Allow-Headers": req.headers["access-control-request-headers"]
                    ? req.headers["access-control-request-headers"]
                    : [
                        "Origin",
                        "Accept",
                        "Accept-Version",
                        "Content-Length",
                        "Content-MD5",
                        "Content-Type",
                        "Date",
                        "X-Api-Version",
                        "X-File-Name",
                        "X-CSRF-Token",
                        "X-Requested-With"
                    ].join(", ")
            } : {});
            // send data
            res.writeHead(res.statusCode, res.headers);
            if ("string" === typeof formattedContent) {
                res.body = content; // for Mediator response validator
                res.end(formattedContent, "utf-8", () => {
                    resolve();
                });
            }
            else if (Buffer.isBuffer(formattedContent)) {
                res.end(formattedContent, () => {
                    resolve();
                });
            }
            else {
                res.end(() => {
                    resolve();
                });
            }
        });
    });
}
exports.default = send;
