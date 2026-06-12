// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const isDirectory = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "isDirectory.js"));

// tests

describe("utils / file / isDirectory", () => {

    it("should test with missing directory", (done) => {

        isDirectory.default().then(() => {
            done(new Error("tests does not generate error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "generated error is not as expected");
            ok(err instanceof ReferenceError, "generated error is not as expected");

            done();

        });

    });

    it("should test with wrong type directory", (done) => {

        isDirectory.default(false).then(() => {
            done(new Error("tests does not generate error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "generated error is not as expected");
            ok(err instanceof TypeError, "generated error is not as expected");

            done();

        });

    });

    it("should test with empty data", (done) => {

        isDirectory.default("").then(() => {
            done(new Error("tests does not generate error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "generated error is not as expected");
            ok(err instanceof Error, "generated error is not as expected");

            done();

        });

    });

    it("should test with inexistant directory", () => {

        return isDirectory.default("zrgzergzergerg").then((exists) => {

            strictEqual(typeof exists, "boolean", "check is not as expected");
            strictEqual(exists, false, "check is not as expected");

            return Promise.resolve();

        });

    });

    it("should test with existant directory", () => {

        return isDirectory.default(__dirname).then((exists) => {

            strictEqual(typeof exists, "boolean", "check is not as expected");
            ok(exists, "check is not as expected");

            return Promise.resolve();

        });

    });

});
