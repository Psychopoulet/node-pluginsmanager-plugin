"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractIp;
// module
function extractIp(req) {
    if ("object" !== typeof req) {
        return "";
    }
    else {
        let result = "";
        if (req.ip) {
            result = req.ip;
        }
        else if ("string" === typeof req.headers["x-forwarded-for"]) {
            result = req.headers["x-forwarded-for"].split(",").pop();
        }
        else if ("string" === typeof req.socket.remoteAddress) {
            result = req.socket.remoteAddress;
        }
        else if ("object" === typeof req.connection) {
            const { connection } = req;
            if ("string" === typeof connection.remoteAddress) {
                result = connection.remoteAddress;
            }
            else if ("object" === typeof connection.socket) {
                const { socket } = connection;
                if (socket.remoteAddress) {
                    result = socket.remoteAddress;
                }
                else {
                    result = "";
                }
            }
            else {
                result = "";
            }
        }
        else {
            result = "";
        }
        return result
            .replace("::ffff:", "")
            .replace("localhost", "127.0.0.1")
            .replace("::1", "127.0.0.1");
    }
}
