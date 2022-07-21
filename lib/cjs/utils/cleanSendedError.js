"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function cleanSendedError(data) {
    if ("object" === typeof data) {
        if (data instanceof Error) {
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
;
