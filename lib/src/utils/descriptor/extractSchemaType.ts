/*
    eslint-disable camelcase
*/
// => camelcase is disabled because of "openapi-types" types

// types & interfaces

    // externals
    import type { OpenAPIV3_1 } from "openapi-types";

// module

export default function extractSchemaType (schema: unknown, schemas: Record<string, OpenAPIV3_1.SchemaObject>): OpenAPIV3_1.SchemaObject["type"] {

    if ("object" !== typeof schema || null === schema) {
        return "string";
    }

    if ("string" === typeof (schema as OpenAPIV3_1.SchemaObject).type) {
        return (schema as OpenAPIV3_1.SchemaObject).type;
    }

    if ("string" === typeof (schema as OpenAPIV3_1.ReferenceObject).$ref) {

        const ref: string = (schema as OpenAPIV3_1.ReferenceObject).$ref.replace("#/components/schemas/", "");

        if ("object" === typeof schemas[ref] && "string" === typeof schemas[ref].type) {
            return schemas[ref].type;
        }

    }

    return "string";

}
