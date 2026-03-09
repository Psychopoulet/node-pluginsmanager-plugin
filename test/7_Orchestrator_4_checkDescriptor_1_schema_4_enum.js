// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { unlink } = require("node:fs");
    const { homedir } = require("node:os");
    const { join } = require("node:path");

    // locals
    const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));
    const generateDescriptorWithSchemas = require(join(__dirname, "utils", "Orchestrator", "generateDescriptorWithSchemas.js"));

// consts

    const TMP_DESCRIPTOR = join(homedir(), "tmp_descriptor.json");

// tests

describe("Orchestrator / checkDescriptor / schema / enum", () => {

    const orchestrator = new LocalOrchestrator({
        "packageFile": join(__dirname, "..", "package.json"),
        "descriptorFile": TMP_DESCRIPTOR,
        "mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
        "serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
    });

    afterEach(() => {

        return orchestrator.release().then(() => {

            return new Promise((resolve, reject) => {

                unlink(TMP_DESCRIPTOR, (err) => {
                    return err ? reject(err) : resolve();
                });

            });

        });

    });

    after(() => {
        return orchestrator.destroy();
    });

    it("should test wrong enum", () => {

        return generateDescriptorWithSchemas({
            "TestInteger": {
                "description": "Integer description",
                "type": "integer",
                "enum": false
            }
        }, TMP_DESCRIPTOR).then(() => {
            return orchestrator.load();
        }).then(() => {

            return new Promise((resolve, reject) => {

                orchestrator.init().then(() => {
                    reject(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not as expected");

                    resolve();

                });

            });

        });

    });

    it("should test empty enum", () => {

        return generateDescriptorWithSchemas({
            "TestInteger": {
                "description": "Integer description",
                "type": "integer",
                "enum": []
            }
        }, TMP_DESCRIPTOR).then(() => {
            return orchestrator.load();
        }).then(() => {

            return new Promise((resolve, reject) => {

                orchestrator.init().then(() => {
                    reject(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not as expected");

                    resolve();

                });

            });

        });

    });

});
