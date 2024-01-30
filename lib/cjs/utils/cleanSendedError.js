"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
function cleanSendedError(data) {
    if ("object" === typeof data) {
        if (null === data) {
            return data;
        }
        else if (data instanceof Error) {
            return data.message;
        }
        else {
            Object.keys(data).forEach((key) => {
                data[key] = cleanSendedError(data[key]);
            });
            return data;
        }
    }
    else {
        return data;
    }
}
exports.default = cleanSendedError;
