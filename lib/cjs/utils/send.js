"use strict";
/*
    eslint-disable @typescript-eslint/no-base-to-string
*/
// => @typescript-eslint/no-base-to-string is disabled to allow stringification of unattented content ('[object Object]' for example)
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = send;
// module
function send(req, res, code, content, options) {
    const response = { ...res, "body": "", "headers": {} };
    return Promise.resolve().then(() => {
        if ("undefined" === typeof content) {
            return "";
        }
        else if ("object" === typeof content && content instanceof Buffer) {
            return content;
        }
        else if ("string" === typeof content && "" === content) {
            return "";
        }
        else if (options.mime.includes("application/json")) {
            let result = "";
            if ("string" === typeof content) {
                try {
                    JSON.parse(content); // is content json & parseable ?
                    result = content; // yes => valid JSON string, send it as it is
                }
                catch {
                    result = JSON.stringify(content); // no => not JSON string, send formatted one
                }
            }
            else {
                const stringified = JSON.stringify(content);
                if (stringified !== content) {
                    result = stringified;
                }
            }
            return result;
        }
        return String(content);
    }).then((formattedContent) => {
        return new Promise((resolve) => {
            // force data for checking
            response.statusCode = code;
            response.headers = {
                "Content-Type": options.mime,
                "Content-Length": 0 < formattedContent.length ? Buffer.byteLength(formattedContent) : 0,
                "Status-Code-Url-Cat": "https://http.cat/" + code,
                "API-Version": options.apiVersion,
                ...options.cors ? {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Methods": req.headers["access-control-request-method"] ?? [
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                    ].join(", "),
                    "Access-Control-Allow-Headers": req.headers["access-control-request-headers"] ?? [
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
                } : {}
            };
            // send data
            response.writeHead(response.statusCode, response.headers);
            if ("string" === typeof formattedContent) {
                response.body = content; // for Mediator response validator
                response.end(formattedContent, "utf-8", () => {
                    resolve();
                });
            }
            else if (Buffer.isBuffer(formattedContent)) {
                response.end(formattedContent, () => {
                    resolve();
                });
            }
            else {
                response.end(() => {
                    resolve();
                });
            }
        });
    }).then(() => {
        return response;
    });
}
