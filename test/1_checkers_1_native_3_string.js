// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const { checkString, checkStringSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / TypeError / checkString", () => {

    describe("async", () => {

        it("should test with missing data", (done) => {

            checkString("test").then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof ReferenceError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with wrong type data", (done) => {

            checkString("test", false).then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof TypeError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with valid data", () => {
            return checkString("test", "test");
        });

    });

    describe("sync", () => {

        it("should test with missing data", () => {

            const err = checkStringSync("test");

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof ReferenceError, "Generated error is not as expected");

        });

        it("should test with wrong type data", () => {

            const err = checkStringSync("test", false);

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof TypeError, "Generated error is not as expected");

        });

        it("should test with valid data", () => {

            const err = checkStringSync("test", "test");

            strictEqual(typeof err, "object", "Generated error is not an object");
            strictEqual(err, null, "Generated error is not as expected");

        });

    });

});
