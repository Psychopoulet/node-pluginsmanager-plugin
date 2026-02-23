"use strict";
// eslint-disable-next-line @typescript-eslint/camelcase
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractSchemaType;
// module
function extractSchemaType(schema, schemas) {
    var _a;
    let result = "string";
    if (schema.type) {
        result = schema.type;
    }
    else if (schema.$ref) {
        const ref = schema.$ref.replace("#/components/schemas/", "");
        if ((_a = schemas[ref]) === null || _a === void 0 ? void 0 : _a.type) {
            result = schemas[ref].type;
        }
    }
    return result;
}
