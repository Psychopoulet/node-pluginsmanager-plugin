"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractSchemaType;
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
