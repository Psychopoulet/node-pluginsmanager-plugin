"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
function extractIp(req) {
    if ("object" !== typeof req) {
        return "";
    }
    else {
        let result = "";
        if (req.ip) {
            result = req.ip;
        }
        else if (req.headers && req.headers["x-forwarded-for"]) {
            result = req.headers["x-forwarded-for"].split(",").pop();
        }
        else if (req.socket && req.socket.remoteAddress) {
            result = req.socket.remoteAddress;
        }
        else if (req.connection) {
            if (req.connection.remoteAddress) {
                result = req.connection.remoteAddress;
            }
            else if (req.connection.socket && req.connection.socket.remoteAddress) {
                result = req.connection.socket.remoteAddress;
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
exports.default = extractIp;
