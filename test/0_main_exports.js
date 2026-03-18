// deps

    // natives
    const { strictEqual, ok, notStrictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const main = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

    const CHECKER_NAMES = [
        "checkExists",
        "checkExistsSync",
        "checkFunction",
        "checkFunctionSync",
        "checkNumber",
        "checkNumberSync",
        "checkObject",
        "checkObjectSync",
        "checkString",
        "checkStringSync",
        "checkInteger",
        "checkIntegerSync",
        "checkNonEmptyNumber",
        "checkNonEmptyNumberSync",
        "checkNonEmptyObject",
        "checkNonEmptyObjectSync",
        "checkNonEmptyString",
        "checkNonEmptyStringSync"
    ];

    const COMPONENT_NAMES = [
        "DescriptorUser",
        "Mediator",
        "MediatorUser",
        "Orchestrator",
        "Server"
    ];

    const ERROR_NAMES = [
        "UnauthorizedError",
        "NotFoundError",
        "LockedError"
    ];

// tests

describe("main entry exports", () => {

    it("should export an object", () => {

        strictEqual(typeof main, "object", "main must be an object");
        notStrictEqual(main, null, "main must not be null");

    });

    it("should export all checker functions", () => {

        for (const name of CHECKER_NAMES) {
            strictEqual(typeof main[name], "function", "export \"" + name + "\" must be a function");
        }

    });

    it("should export all component classes", () => {

        for (const name of COMPONENT_NAMES) {
            strictEqual(typeof main[name], "function", "export \"" + name + "\" must be a class (function)");
        }

    });

    it("should export all error classes", () => {

        for (const name of ERROR_NAMES) {
            strictEqual(typeof main[name], "function", "export \"" + name + "\" must be a class (function)");
        }

    });

    it("should have exactly the expected exports (no missing or extra)", () => {

        const expected = new Set([
            ...CHECKER_NAMES, ...COMPONENT_NAMES, ...ERROR_NAMES
        ]);

        const actual = new Set(Object.keys(main).filter((k) => {
            return "default" !== k && !k.startsWith("__");
        }));

        strictEqual(actual.size, expected.size, "export count must match expected");

        for (const key of expected) {
            ok(actual.has(key), "missing export \"" + key + "\"");
        }

        for (const key of actual) {
            ok(expected.has(key), "unexpected export \"" + key + "\"");
        }

    });

});
