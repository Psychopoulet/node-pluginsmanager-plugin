"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cleanSendedError;
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
                data[key] = cleanSendedError(data[key]); // in practice, it's unknown, had to specify the type for linter
            });
            return data;
        }
    }
    return data;
}
