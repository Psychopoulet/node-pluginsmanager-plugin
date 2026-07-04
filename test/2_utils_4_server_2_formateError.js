// deps

    // natives
    const { deepStrictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const { ConflictError, LockedError, NotFoundError, UnauthorizedError } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
    const formateError = require(join(__dirname, "..", "lib", "cjs", "utils", "server", "formateError.js"));
    const SERVER_CODES = require(join(__dirname, "..", "lib", "cjs", "utils", "serverCodes.js"));

// tests

describe("utils / server / formateError", () => {

    it("should test with ReferenceError", () => {

        const err = new ReferenceError("missing parameter");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.MISSING_PARAMETER,
            "code": "MISSING_PARAMETER",
            "message": "missing parameter"
        });

    });

    it("should test with TypeError", () => {

        const err = new TypeError("wrong type parameter");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.WRONG_TYPE_PARAMETER,
            "code": "WRONG_TYPE_PARAMETER",
            "message": "wrong type parameter"
        });

    });

    it("should test with RangeError", () => {

        const err = new RangeError("empty or range parameter");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.EMPTY_OR_RANGE_OR_ENUM_PARAMETER,
            "code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
            "message": "empty or range parameter"
        });

    });

    it("should test with SyntaxError", () => {

        const err = new SyntaxError("json parse error");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.JSON_PARSE,
            "code": "JSON_PARSE",
            "message": "json parse error"
        });

    });

    it("should test with UnauthorizedError", () => {

        const err = new UnauthorizedError("unauthorized access");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.UNAUTHORIZED,
            "code": "UNAUTHORIZED",
            "message": "unauthorized access"
        });

    });

    it("should test with NotFoundError", () => {

        const err = new NotFoundError("resource not found");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.NOT_FOUND,
            "code": "NOT_FOUND",
            "message": "resource not found"
        });

    });

    it("should test with ConflictError", () => {

        const err = new ConflictError("resource conflict");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.CONFLICT,
            "code": "CONFLICT",
            "message": "resource conflict"
        });

    });

    it("should test with LockedError", () => {

        const err = new LockedError("resource locked");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.LOCKED,
            "code": "LOCKED",
            "message": "resource locked"
        });

    });

    it("should test with generic Error", () => {

        const err = new Error("internal server error");

        deepStrictEqual(formateError.default(err), {
            "httpCode": SERVER_CODES.default.INTERNAL_SERVER_ERROR,
            "code": "INTERNAL_SERVER_ERROR",
            "message": "internal server error"
        });

    });

});
