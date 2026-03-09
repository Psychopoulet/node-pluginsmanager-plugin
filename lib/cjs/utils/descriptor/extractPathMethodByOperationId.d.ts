import type { OpenApiDocument } from "express-openapi-validate";
import type { tMethod } from "../../openAPITypes";
export interface iPathMethod {
    "path": string;
    "method": tMethod;
    "operationId": string;
}
export default function extractPathMethodByOperationId(paths: OpenApiDocument["paths"] | null | undefined, operationId: string): iPathMethod | undefined;
