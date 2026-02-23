"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractIp;
function extractIp(req) {
    var _a, _b, _c;
    if ("object" !== typeof req) {
        return "";
    }
    else {
        let result = "";
        if (req.ip) {
            result = req.ip;
        }
        else if ((_a = req.headers) === null || _a === void 0 ? void 0 : _a["x-forwarded-for"]) {
            result = req.headers["x-forwarded-for"].split(",").pop();
        }
        else if ((_b = req.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress) {
            result = req.socket.remoteAddress;
        }
        else if (req.connection) {
            if (req.connection.remoteAddress) {
                result = req.connection.remoteAddress;
            }
            else if ((_c = req.connection.socket) === null || _c === void 0 ? void 0 : _c.remoteAddress) {
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
