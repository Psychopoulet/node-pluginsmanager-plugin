"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function cleanSendedError(data) {
    if ("object" === typeof data) {
        if (data instanceof Error) {
            return data.message;
        }
        else if (data.message) {
            return data.message instanceof Error ? data.message.message : data.message;
        }
        else if (data.error) { // 1 level recursive for "error" data (avoid too deep recursive analyse)
            if (data.error instanceof Error) {
                return data.error.message;
            }
            else if (data.error.message) {
                return data.error.message instanceof Error ? data.error.message.message : data.error.message;
            }
            else {
                return data.error;
            }
        }
        else if (data.err) { // 1 level recursive for "err" data (avoid too deep recursive analyse)
            if (data.err instanceof Error) {
                return data.err.message;
            }
            else if (data.err.message) {
                return data.err.message instanceof Error ? data.err.message.message : data.err.message;
            }
            else {
                return data.err;
            }
        }
        else {
            return data;
        }
    }
    else {
        return data;
    }
}
exports.default = cleanSendedError;
;
