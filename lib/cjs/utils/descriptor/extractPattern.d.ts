import type { OpenApiDocument } from "express-openapi-validate";
type PathsObject = OpenApiDocument["paths"];
type PathItemObject = PathsObject[string];
export default function extractPattern(paths: PathsObject, pathname: string, method: keyof PathItemObject): string;
export {};
