import { OpenApiDocument } from "express-openapi-validate";
export type tMethod = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
export interface iPathMethod {
    "path": string;
    "method": tMethod;
    "operationId": string;
}
export default function extractPathMethodByOperationId(paths: OpenApiDocument["paths"], operationId: string): iPathMethod | null;
