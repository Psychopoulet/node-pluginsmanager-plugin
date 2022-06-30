"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module
function extractSchemaType(schema, schemas) {
    let result = "string";
    if (schema.type) {
        result = schema.type;
    }
    else if (schema.$ref) {
        const ref = schema.$ref.replace("#/components/schemas/", "");
        if (schemas[ref] && schemas[ref].type) {
            result = schemas[ref].type;
        }
    }
    return result;
}
exports.default = extractSchemaType;
;
