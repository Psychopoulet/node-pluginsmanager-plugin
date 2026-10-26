// deps

    // natives
    const { strictEqual, throws } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const { Orchestrator } = require(join(__dirname, "..", "lib", "src", "main.cts"));
    const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));
    const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));

// private

    function _wait () {

        return new Promise((resolve) => {
            setImmediate(resolve);
        });

    }

// tests

describe("Orchestrator / cors", () => {

    it("should reject file options that are not strings", () => {

        throws(() => {

            return new Orchestrator({
                "externalResourcesDirectory": "",
                "packageFile": false
            });

        }, (err) => {
            return err instanceof ReferenceError;
        });

        throws(() => {

            return new Orchestrator({
                "externalResourcesDirectory": "",
                "packageFile": "",
                "descriptorFile": false
            });

        }, (err) => {
            return err instanceof ReferenceError;
        });

        throws(() => {

            return new Orchestrator({
                "externalResourcesDirectory": "",
                "packageFile": "",
                "descriptorFile": "",
                "mediatorFile": false
            });

        }, (err) => {
            return err instanceof ReferenceError;
        });

        throws(() => {

            return new Orchestrator({
                "externalResourcesDirectory": "",
                "packageFile": "",
                "descriptorFile": "",
                "mediatorFile": "",
                "serverFile": false
            });

        }, (err) => {
            return err instanceof ReferenceError;
        });

    });

    it("should emit when cors cannot be applied", () => {

        const orchestrator = new LocalOrchestrator();
        const errors = [];

        orchestrator.on("error", (err) => {
            errors.push(err);
        });

        strictEqual(orchestrator.disableCors(), orchestrator, "disableCors must return the orchestrator");
        strictEqual(orchestrator.enableCors(), orchestrator, "enableCors must return the orchestrator");

        return _wait().then(() => {
            strictEqual(errors.length, 2, "both cors calls must emit an error");
        });

    });

    it("should forward cors to the server", () => {

        const orchestrator = new LocalOrchestrator();
        const server = new LocalServer();

        orchestrator._Server = server;
        orchestrator.enableCors();

        return _wait().then(() => {

            strictEqual(server._cors, true, "cors must be enabled");

            orchestrator.disableCors();

            return _wait();

        }).then(() => {
            strictEqual(server._cors, false, "cors must be disabled");
        });

    });

    it("should skip http middleware when the plugin is disabled", () => {

        const orchestrator = new LocalOrchestrator();
        let called = false;

        orchestrator.enabled = false;
        orchestrator.appMiddleware({}, {}, () => {
            called = true;
        });

        strictEqual(called, true, "next was not called");

    });

    it("should skip http middleware when the server is missing", () => {

        const orchestrator = new LocalOrchestrator();
        let called = false;

        orchestrator.enabled = true;
        orchestrator.initialized = true;
        orchestrator.appMiddleware({}, {}, () => {
            called = true;
        });

        return _wait().then(() => {
            strictEqual(called, true, "next was not called");
        });

    });

    it("should delay socket middleware when the plugin is disabled", () => {

        const orchestrator = new LocalOrchestrator();
        const socketServer = {};

        orchestrator.enabled = false;
        orchestrator.socketMiddleware(socketServer);

        strictEqual(orchestrator._socketServer, socketServer, "socket server must be stored");

    });

});
