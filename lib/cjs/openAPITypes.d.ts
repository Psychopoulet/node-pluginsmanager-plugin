import type { OpenApiDocument } from "express-openapi-validate";
export type PathsObject = OpenApiDocument["paths"];
export type PathItemObject = PathsObject[string];
export type tMethod = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
export type OperationObject = NonNullable<PathItemObject[tMethod]>;
