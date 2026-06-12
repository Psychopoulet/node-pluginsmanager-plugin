// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const isPlainObject = require(join(__dirname, "..", "lib", "cjs", "utils", "isPlainObject.js"));

// tests

describe("utils / isPlainObject", () => {

    it("should test with missing data", () => {
        strictEqual(isPlainObject.default(), false);
    });

    it("should test with null", () => {
        strictEqual(isPlainObject.default(null), false);
    });

    it("should test with wrong data", () => {

        strictEqual(isPlainObject.default(false), false);
        strictEqual(isPlainObject.default(""), false);
        strictEqual(isPlainObject.default(0), false);
        strictEqual(isPlainObject.default("test"), false);
        strictEqual(isPlainObject.default(Symbol("test")), false);
        strictEqual(isPlainObject.default(() => {
            return false;
        }), false);

    });

    it("should test with non-plain object", () => {
        strictEqual(isPlainObject.default([]), false);
        strictEqual(isPlainObject.default(new Date()), false);
        strictEqual(isPlainObject.default(/test/), false);
        strictEqual(isPlainObject.default(new Map()), false);
        strictEqual(isPlainObject.default(Object.create(null)), false);
        strictEqual(isPlainObject.default(new (class Test {})()), false);
    });

    it("should test with plain object", () => {
        ok(isPlainObject.default({}));
        ok(isPlainObject.default({ "test": "test" }));
        ok(isPlainObject.default(new Object())); // eslint-disable-line no-object-constructor
    });

});
