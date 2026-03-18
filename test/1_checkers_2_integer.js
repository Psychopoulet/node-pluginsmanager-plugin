// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const { checkInteger, checkIntegerSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / TypeError / checkInteger", () => {

    describe("async", () => {

        it("should test with missing data", (done) => {

            checkInteger("test").then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof ReferenceError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with wrong type data", (done) => {

            checkInteger("test", "test").then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof TypeError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with float data", (done) => {

            checkInteger("test", 1.1).then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof TypeError, "Generated error is not as expected");

                done();

            });

        });

        it("should test with valid data", () => {
            return checkInteger("test", 1);
        });

    });

    describe("sync", () => {

        it("should test with missing data", () => {

            const err = checkIntegerSync("test");

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof ReferenceError, "Generated error is not as expected");

        });

        it("should test with wrong type data", () => {

            const err = checkIntegerSync("test", "test");

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof TypeError, "Generated error is not as expected");

        });

        it("should test with float data", () => {

            const err = checkIntegerSync("test", 1.1);

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof TypeError, "Generated error is not as expected");

        });

        it("should test with valid data", () => {

            const err = checkIntegerSync("test", 1);

            strictEqual(typeof err, "object", "Generated error is not an object");
            strictEqual(err, null, "Generated error is not as expected");

        });

    });

});
