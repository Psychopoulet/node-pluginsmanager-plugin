// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals

        // plugin
        const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

    const DESCRIPTOR = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyBody.js"));

// tests

describe("Mediator / checkParameters / object", () => {

    const mediator = new LocalMediator({
        "descriptor": DESCRIPTOR
    });

    before(() => {
        return mediator.init();
    });

    after(() => {
        return mediator.release();
    });

    it("should test missing params", (done) => {

        mediator.checkParameters("testObject", {
            "path": {},
            "query": {},
            "headers": {},
            "cookies": {}
        }, {
            "test": "test2"
        }).then(() => {
            done(new Error("There is no generated error"));
        }).catch((err) => {

            (0, console).log(err);

            strictEqual(typeof err, "object", "Generated error is not as expected");
            ok(err instanceof ReferenceError, "Generated error is not as expected");

            done();

        });

    });

    it("should test wrong type", (done) => {

        mediator.checkParameters("testObject", {
            "path": {},
            "query": {},
            "headers": {},
            "cookies": {}
        }, {
            "body-param-object": "test2"
        }).then(() => {
            done(new Error("There is no generated error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "Generated error is not as expected");
            ok(err instanceof TypeError, "Generated error is not as expected");

            done();

        });

    });

    it("should test missing sub-type", (done) => {

        mediator.checkParameters("testObject", {
            "path": {},
            "query": {},
            "headers": {},
            "cookies": {}
        }, {
            "body-param-object": {
                "test": "test2"
            }
        }).then(() => {
            done(new Error("There is no generated error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "Generated error is not as expected");
            ok(err instanceof ReferenceError, "Generated error is not as expected");

            done();

        });

    });

    it("should test valid data", () => {

        return mediator.checkParameters("testObject", {
            "path": {},
            "query": {},
            "headers": {},
            "cookies": {}
        }, {
            "body-param-object": {
                "body-param-object-test": "test2"
            }
        });

    });

});
