/*
    eslint-disable no-undefined
*/
// => no-undefined is disabled because the function can return undefined

// types & interfaces

    // externals
    import type { OpenApiDocument } from "express-openapi-validate";

    // locals
    import type { iSimplifiedOperationObject } from "../../components/DescriptorUser";

    type tMethod = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";

    export interface iPathMethod {
        "path": string;
        "method": tMethod;
        "operationId": string;
    }

// module

export default function extractPathMethodByOperationId (paths: OpenApiDocument["paths"] | null | undefined, operationId: string): iPathMethod | undefined {

    // no paths in this Descriptor
    if ("object" !== typeof paths || null === paths) {
        return undefined;
    }

    // no operationId given
    else if ("string" !== typeof operationId || "" === operationId.trim()) {
        return undefined;
    }

    else {

        for (let i: number = 0, pathnames = Object.keys(paths); i < pathnames.length; ++i) {

            const pathname: string = pathnames[i];

            if ("object" === typeof paths[pathname]) {

                const method: tMethod | undefined = (Object.keys(paths[pathname]) as tMethod[]).find((m: tMethod): boolean => {
                    return (paths[pathname][m] as unknown as iSimplifiedOperationObject).operationId === operationId;
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
