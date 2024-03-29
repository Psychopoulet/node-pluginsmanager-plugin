import type { OpenAPIV3_1 } from "openapi-types";
export default function extractSchemaType(schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject, schemas: Record<string, any>): "boolean" | "object" | "number" | "string" | "integer" | "array";
