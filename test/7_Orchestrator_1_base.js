// deps

    // natives
    const { deepStrictEqual, strictEqual, ok } = require("node:assert");
    const Events = require("node:events");
    const { join } = require("node:path");

    // locals

        // plugin
        const { DescriptorUser, MediatorUser, Server, Orchestrator } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

        // utils
        const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

    const EXTERNAL_RESOURCES_DIRECTORY = join(__dirname, "external-resources");

    const GOOD_OPTIONS = {
        "packageFile": join(__dirname, "..", "package.json"),
        "descriptorFile": join(__dirname, "utils", "DescriptorUser", "Descriptor.json"),
        "mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
        "serverFile": join(__dirname, "utils", "Server", "LocalServer.js"),
        "externalResourcesDirectory": EXTERNAL_RESOURCES_DIRECTORY
    };

// tests

describe("Orchestrator", () => {

    it("should test constructor", () => {

        const orchestrator = new LocalOrchestrator({
            "packageFile": "packageFile",
            "descriptorFile": "descriptorFile",
            "mediatorFile": "mediatorFile",
            "serverFile": "serverFile",
            "externalResourcesDirectory": "test"
        });

        strictEqual(typeof orchestrator, "object", "Generated orchestrator is not an object");
        ok(orchestrator instanceof Events, "Generated orchestrator is not a Events instance");
        ok(orchestrator instanceof DescriptorUser, "Generated orchestrator is not a DescriptorUser instance");
        ok(orchestrator instanceof MediatorUser, "Generated orchestrator is not a MediatorUser instance");
        ok(orchestrator instanceof Orchestrator, "Generated orchestrator is not a Orchestrator instance");
        ok(orchestrator instanceof LocalOrchestrator, "Generated orchestrator is not a LocalOrchestrator instance");

        // protected

            strictEqual(typeof orchestrator._Server, "object", "Generated orchestrator _Server is not an object");
            strictEqual(orchestrator._Server, null, "Generated orchestrator _Server is not as expected");

            // params

            strictEqual(typeof orchestrator._packageFile, "string", "Generated orchestrator _packageFile is not a string");
            strictEqual(orchestrator._packageFile, "packageFile", "Generated orchestrator _packageFile is not as expected");

            strictEqual(typeof orchestrator._descriptorFile, "string", "Generated orchestrator _descriptorFile is not a string");
            strictEqual(orchestrator._descriptorFile, "descriptorFile", "Generated orchestrator _descriptorFile is not as expected");

            strictEqual(typeof orchestrator._mediatorFile, "string", "Generated orchestrator _mediatorFile is not a string");
            strictEqual(orchestrator._mediatorFile, "mediatorFile", "Generated orchestrator _mediatorFile is not as expected");

            strictEqual(typeof orchestrator._serverFile, "string", "Generated orchestrator _serverFile is not a string");
            strictEqual(orchestrator._serverFile, "serverFile", "Generated orchestrator _serverFile is not as expected");

            // extended

            strictEqual(typeof orchestrator._extended, "object", "Generated orchestrator extended is not an object");
            ok(orchestrator._extended instanceof Array, "Generated orchestrator extended is not an Array");
            deepStrictEqual(orchestrator._extended, [], "Generated orchestrator extended is not as expected");

        // public

            strictEqual(typeof orchestrator.enabled, "boolean", "Generated orchestrator enabled is not a boolean");
            ok(orchestrator.enabled, "Generated orchestrator enabled is not as expected");

            strictEqual(typeof orchestrator.initialized, "boolean", "Generated orchestrator initialized is not a boolean");
            strictEqual(orchestrator.initialized, false, "Generated orchestrator initialized is not as expected");

            // native

            strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
            deepStrictEqual(orchestrator.authors, [], "Generated orchestrator authors is not as expected");

            strictEqual(typeof orchestrator.description, "string", "Generated orchestrator description is not a string");
            strictEqual(orchestrator.description, "", "Generated orchestrator description is not as expected");

            strictEqual(typeof orchestrator.dependencies, "object", "Generated orchestrator dependencies is not an object");
            deepStrictEqual(orchestrator.dependencies, null, "Generated orchestrator dependencies is not as expected");

            strictEqual(typeof orchestrator.devDependencies, "object", "Generated orchestrator devDependencies is not an object");
            deepStrictEqual(orchestrator.devDependencies, null, "Generated orchestrator devDependencies is not as expected");

            strictEqual(typeof orchestrator.engines, "object", "Generated orchestrator engines is not an object");
            deepStrictEqual(orchestrator.engines, null, "Generated orchestrator engines is not as expected");

            strictEqual(typeof orchestrator.license, "string", "Generated orchestrator license is not a string");
            strictEqual(orchestrator.license, "", "Generated orchestrator license is not as expected");

            strictEqual(typeof orchestrator.main, "string", "Generated orchestrator main is not a string");
            strictEqual(orchestrator.main, "", "Generated orchestrator main is not as expected");

            strictEqual(typeof orchestrator.name, "string", "Generated orchestrator name is not a string");
            strictEqual(orchestrator.name, "", "Generated orchestrator name is not as expected");

            strictEqual(typeof orchestrator.scripts, "object", "Generated orchestrator scripts is not an object");
            deepStrictEqual(orchestrator.scripts, null, "Generated orchestrator scripts is not as expected");

            strictEqual(typeof orchestrator.version, "string", "Generated orchestrator version is not a string");
            strictEqual(orchestrator.version, "", "Generated orchestrator version is not as expected");

    });

    it("should test constructor without params", () => {

        const orchestrator = new LocalOrchestrator();

        // protected

            // params

            strictEqual(typeof orchestrator._packageFile, "string", "Generated orchestrator _packageFile is not a string");
            strictEqual(orchestrator._packageFile, "", "Generated orchestrator _packageFile is not as expected");

            strictEqual(typeof orchestrator._descriptorFile, "string", "Generated orchestrator _descriptorFile is not a string");
            strictEqual(orchestrator._descriptorFile, "", "Generated orchestrator _descriptorFile is not as expected");

            strictEqual(typeof orchestrator._mediatorFile, "string", "Generated orchestrator _mediatorFile is not a string");
            strictEqual(orchestrator._mediatorFile, "", "Generated orchestrator _mediatorFile is not as expected");

            strictEqual(typeof orchestrator._serverFile, "string", "Generated orchestrator _serverFile is not a string");
            strictEqual(orchestrator._serverFile, "", "Generated orchestrator _serverFile is not as expected");

            // extended

            strictEqual(typeof orchestrator._extended, "object", "Generated orchestrator extended is not an object");
            ok(orchestrator._extended instanceof Array, "Generated orchestrator extended is not an Array");
            deepStrictEqual(orchestrator._extended, [], "Generated orchestrator extended is not as expected");

    });

    describe("checkServer", () => {

        it("should check without server", (done) => {

            const orchestrator = new LocalOrchestrator();
            delete orchestrator._Server;

            orchestrator.checkServer().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof ReferenceError, "Generated error is not a ReferenceError instance");

                done();

            });

        });

        it("should check with null server", (done) => {

            const orchestrator = new LocalOrchestrator();
            orchestrator._Server = null;

            orchestrator.checkServer().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof TypeError, "Generated error is not a ReferenceError instance");

                done();

            });

        });

        it("should check with wrong server (string)", (done) => {

            const orchestrator = new LocalOrchestrator();
            orchestrator._Server = "test";

            orchestrator.checkServer().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof TypeError, "Generated error is not a TypeError instance");

                done();

            });

        });

        it("should check with wrong server (object)", (done) => {

            const orchestrator = new LocalOrchestrator();
            orchestrator._Server = {};

            orchestrator.checkServer().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof TypeError, "Generated error is not a TypeError instance");

                done();

            });

        });

        it("should check with right server", () => {

            const orchestrator = new LocalOrchestrator();
            orchestrator._Server = new Server();

            return orchestrator.checkServer();

        });

    });

    describe("checkFiles", () => {

        describe("packageFile", () => {

            it("should check without file", (done) => {

                new LocalOrchestrator().checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

            it("should check with inexistant file", (done) => {

                new LocalOrchestrator({
                    "packageFile": "ezsorfnzlmefnzmùe"
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

        });

        describe("descriptorFile", () => {

            it("should check without file", (done) => {

                new LocalOrchestrator({
                    "packageFile": GOOD_OPTIONS.packageFile
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

            it("should check with inexistant file", (done) => {

                new LocalOrchestrator({
                    "packageFile": GOOD_OPTIONS.packageFile,
                    "descriptorFile": "ezsorfnzlmefnzmùe"
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

        });

        describe("mediatorFile", () => {

            it("should check without file", (done) => {

                new LocalOrchestrator({
                    "packageFile": GOOD_OPTIONS.packageFile,
                    "descriptorFile": GOOD_OPTIONS.descriptorFile
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

            it("should check with inexistant file", (done) => {

                new LocalOrchestrator({
                    "packageFile": GOOD_OPTIONS.packageFile,
                    "descriptorFile": GOOD_OPTIONS.descriptorFile,
                    "mediatorFile": "ezsorfnzlmefnzmùe"
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

        });

        describe("serverFile", () => {

            it("should check without file", (done) => {

                new LocalOrchestrator({
                    "packageFile": GOOD_OPTIONS.packageFile,
                    "descriptorFile": GOOD_OPTIONS.descriptorFile,
                    "mediatorFile": GOOD_OPTIONS.mediatorFile
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

            it("should check with inexistant file", (done) => {

                new LocalOrchestrator({
                    "packageFile": GOOD_OPTIONS.packageFile,
                    "descriptorFile": GOOD_OPTIONS.descriptorFile,
                    "mediatorFile": GOOD_OPTIONS.mediatorFile,
                    "serverFile": "ezsorfnzlmefnzmùe"
                }).checkFiles().then(() => {
                    done(new Error("There is no generated error"));
                }).catch((err) => {

                    strictEqual(typeof err, "object", "Generated error is not an object");
                    ok(err instanceof Error, "Generated error is not a Error instance");

                    done();

                });

            });

        });

        describe("execute", () => {

            it("should check with existant files", () => {

                return new LocalOrchestrator(GOOD_OPTIONS).checkFiles();

            });

        });

    });

});
