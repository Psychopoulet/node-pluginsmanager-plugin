// types & interfaces

    // externals
    import { OpenApiDocument } from "express-openapi-validate";

    // locals

    export type tMethod = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";

    export interface iPathMethod {
        "path": string;
        "method": tMethod;
        "operationId": string;
    }

// module

export default function extractPathMethodByOperationId (paths: OpenApiDocument["paths"], operationId: string): iPathMethod | null {

    // no paths in this Descriptor
    if ("object" !== typeof paths || null === paths) {
        return null;
    }

    // no operationId given
    else if ("string" !== typeof operationId || "" === operationId.trim()) {
        return null;
    }

    else {

        let result: iPathMethod | null = null;

            for (let i: number = 0, pathnames = Object.keys(paths); i < pathnames.length; ++i) {

                const pathname: string = pathnames[i];

                const method: tMethod = (Object.keys(paths[pathname]) as tMethod[]).find((m: tMethod): boolean => {
                    return Boolean(paths[pathname][m]) && (paths[pathname][m] as Record<string, any>).operationId === operationId;
                }) as tMethod;

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
