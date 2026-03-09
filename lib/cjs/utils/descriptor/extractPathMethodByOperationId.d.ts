import type { OpenApiDocument } from "express-openapi-validate";
type tMethod = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
export interface iPathMethod {
    "path": string;
    "method": tMethod;
    "operationId": string;
}
export default function extractPathMethodByOperationId(paths: OpenApiDocument["paths"] | null | undefined, operationId: string): iPathMethod | undefined;
export {};
