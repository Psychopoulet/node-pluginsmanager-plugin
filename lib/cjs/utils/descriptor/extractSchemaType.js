"use strict";
/*
    eslint-disable camelcase
*/
// => camelcase is disabled because of "openapi-types" types
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractSchemaType;
// module
function extractSchemaType(schema, schemas) {
    if ("object" !== typeof schema || null === schema) {
        return "string";
    }
    if ("string" === typeof schema.type) {
        return schema.type;
    }
    if ("string" === typeof schema.$ref) {
        const ref = schema.$ref.replace("#/components/schemas/", "");
        if ("object" === typeof schemas[ref] && "string" === typeof schemas[ref].type) {
            return schemas[ref].type;
        }
    }
    return "string";
}
