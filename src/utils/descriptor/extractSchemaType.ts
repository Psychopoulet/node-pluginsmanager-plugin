"use strict";

// deps

	// externals
	import { OpenAPIV3_1 } from "openapi-types";

// module

export default function extractSchemaType (schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject, schemas: { [key:string]: any }): "boolean" | "object" | "number" | "string" | "integer" | "array" {

	let result: "boolean" | "object" | "number" | "string" | "integer" = "string";

		if ((schema as OpenAPIV3_1.SchemaObject).type) {
			result = (schema as OpenAPIV3_1.SchemaObject).type as "boolean" | "object" | "number" | "string" | "integer";
		}
		else if ((schema as OpenAPIV3_1.ReferenceObject).$ref) {

			const ref: string = (schema as OpenAPIV3_1.ReferenceObject).$ref.replace("#/components/schemas/", "");

			if (schemas[ref] && schemas[ref].type) {
				result = schemas[ref].type;
			}

		}

	return result;

};
