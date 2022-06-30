import { OpenApiDocument } from "express-openapi-validate";
export default function extractPattern(paths: OpenApiDocument["paths"], pathname: string, method: string): string;
