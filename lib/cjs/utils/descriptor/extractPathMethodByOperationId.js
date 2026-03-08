"use strict";
/*
    eslint-disable no-undefined
*/
// => no-undefined is disabled because the function can return undefined
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractPathMethodByOperationId;
// module
function extractPathMethodByOperationId(paths, operationId) {
    // no paths in this Descriptor
    if ("object" !== typeof paths || null === paths) {
        return undefined;
    }
    // no operationId given
    else if ("string" !== typeof operationId || "" === operationId.trim()) {
        return undefined;
    }
    else {
        for (let i = 0, pathnames = Object.keys(paths); i < pathnames.length; ++i) {
            const pathname = pathnames[i];
            if ("object" === typeof paths[pathname]) {
                const method = Object.keys(paths[pathname]).find((m) => {
                    return paths[pathname][m].operationId === operationId;
                });
                if ("undefined" !== typeof method) {
                    return {
                        "path": pathname,
                        method,
                        operationId
                    };
                }
            }
        }
        return undefined;
    }
}
