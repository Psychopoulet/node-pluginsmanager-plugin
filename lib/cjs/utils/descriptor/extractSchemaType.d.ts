import type { OpenAPIV3_1 } from "openapi-types";
export default function extractSchemaType(schema: unknown, schemas: Record<string, OpenAPIV3_1.SchemaObject>): OpenAPIV3_1.SchemaObject["type"];
