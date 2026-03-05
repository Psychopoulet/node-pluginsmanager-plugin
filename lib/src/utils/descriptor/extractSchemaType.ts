/*
    eslint-disable camelcase
*/
// => @typescript-eslint/camelcase is disabled because of "openapi-types" types

// types & interfaces

    // externals
    import type { OpenAPIV3_1 } from "openapi-types";

// module

export default function extractSchemaType (schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject, schemas: { [index: string]: OpenAPIV3_1.SchemaObject; }): OpenAPIV3_1.SchemaObject["type"] {

    let result: OpenAPIV3_1.SchemaObject["type"] = "string";

        if ("string" === typeof (schema as OpenAPIV3_1.SchemaObject).type) {
            result = (schema as OpenAPIV3_1.SchemaObject).type as OpenAPIV3_1.SchemaObject["type"];
        }
        else if ((schema as OpenAPIV3_1.ReferenceObject).$ref) {

            const ref: string = (schema as OpenAPIV3_1.ReferenceObject).$ref.replace("#/components/schemas/", "");

            if ("string" === typeof schemas[ref].type) {
                result = schemas[ref].type;
            }

        }

    return result;

}
