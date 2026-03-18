// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const checkFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "checkFile.js"));

// tests

describe("utils / file / checkFile", () => {

    it("should test with missing file", (done) => {

        checkFile.default().then(() => {
            done(new Error("tests does not generate error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "generated error is not as expected");
            ok(err instanceof ReferenceError, "generated error is not as expected");

            done();

        });

    });

    it("should test with wrong type file", (done) => {

        checkFile.default(false).then(() => {
            done(new Error("tests does not generate error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "generated error is not as expected");
            ok(err instanceof TypeError, "generated error is not as expected");

            done();

        });

    });

    it("should test with empty data", (done) => {

        checkFile.default("").then(() => {
            done(new Error("tests does not generate error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "generated error is not as expected");
            ok(err instanceof Error, "generated error is not as expected");

            done();

        });

    });

    it("should test with inexistant file", (done) => {

        checkFile.default("zrgzergzergerg").then(() => {
            done(new Error("There is no generated error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "Generated error is not an object");
            ok(err instanceof Error, "Generated error is not a Error instance");

            done();

        });

    });

    it("should test with existant file", () => {

        return checkFile.default(__filename);

    });

});
