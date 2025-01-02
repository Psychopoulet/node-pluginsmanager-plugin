"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractPathMethodByOperationId;
// module
function extractPathMethodByOperationId(paths, operationId) {
    // no paths in this Descriptor
    if ("object" !== typeof paths || null === paths) {
        return null;
    }
    // no operationId given
    else if ("string" !== typeof operationId || "" === operationId.trim()) {
        return null;
    }
    else {
        let result = null;
        for (let i = 0, pathnames = Object.keys(paths); i < pathnames.length; ++i) {
            const pathname = pathnames[i];
            const method = Object.keys(paths[pathname]).find((m) => {
                return Boolean(paths[pathname][m]) && paths[pathname][m].operationId === operationId;
            });
            if ("undefined" !== typeof method) {
                result = {
                    "path": pathname,
                    method,
                    operationId
                };
                break;
            }
        }
        return result;
    }
}
