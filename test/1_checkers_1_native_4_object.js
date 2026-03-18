// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const { checkObject, checkObjectSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / TypeError / checkObject", () => {

    describe("async", () => {

        it("should test with missing data", (done) => {

            checkObject("test").then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof ReferenceError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with wrong type data", (done) => {

            checkObject("test", "test").then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof TypeError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with null data", (done) => {

            checkObject("test", null).then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof TypeError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with valid data", () => {
            return checkObject("test", {});
        });

    });

    describe("sync", () => {

        it("should test with missing data", () => {

            const err = checkObjectSync("test");

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof ReferenceError, "Generated error is not as expected");

        });

        it("should test with wrong type data", () => {

            const err = checkObjectSync("test", "test");

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof TypeError, "Generated error is not as expected");

        });

        it("should test with null data", () => {

            const err = checkObjectSync("test", null);

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof TypeError, "Generated error is not as expected");

        });

        it("should test with valid data", () => {

            const err = checkObjectSync("test", {});

            strictEqual(typeof err, "object", "Generated error is not an object");
            strictEqual(err, null, "Generated error is not as expected");

        });

    });

});
