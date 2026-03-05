import type { OpenApiDocument } from "express-openapi-validate";
type PathsObject = OpenApiDocument["paths"];
type PathItemObject = PathsObject[string];
type tMethod = keyof PathItemObject;
export interface iPathMethod {
    "path": string;
    "method": tMethod;
    "operationId": string;
}
export default function extractPathMethodByOperationId(paths: OpenApiDocument["paths"] | null | undefined, operationId: string): iPathMethod | undefined;
