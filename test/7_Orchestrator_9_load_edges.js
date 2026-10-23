// deps

    // natives
    const { ok, strictEqual } = require("node:assert");
    const { mkdtemp, rm, writeFile } = require("node:fs/promises");
    const { tmpdir } = require("node:os");
    const { join } = require("node:path");

    // locals
    const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// const

    const PACKAGE_FILE = join(__dirname, "..", "package.json");
    const DESCRIPTOR_FILE = join(__dirname, "utils", "DescriptorUser", "Descriptor.json");
    const MEDIATOR_FILE = join(__dirname, "utils", "Mediator", "LocalMediator.js");
    const SERVER_FILE = join(__dirname, "utils", "Server", "LocalServer.js");

// private

    function _init (mediatorFile, serverFile) {

        const orchestrator = new LocalOrchestrator({
            "packageFile": PACKAGE_FILE,
            "descriptorFile": DESCRIPTOR_FILE,
            "mediatorFile": mediatorFile,
            "serverFile": serverFile
        });

        return orchestrator.load().then(() => {
            return orchestrator.init();
        }).then(() => {
            return orchestrator;
        });

    }

    function _reject (mediatorSource, serverSource) {

        let root = "";

        return mkdtemp(join(tmpdir(), "plugin-load-")).then((dir) => {

            root = dir;

            return Promise.all([
                writeFile(join(dir, "mediator.js"), mediatorSource, "utf8"),
                writeFile(join(dir, "server.js"), serverSource, "utf8")
            ]);

        }).then(() => {

            return _init(join(root, "mediator.js"), join(root, "server.js"));

        }).then(() => {
            throw new Error("tests does not generate error");
        }, (err) => {
            ok(err instanceof Error, "generated error is not an Error");
            return err;
        }).finally(() => {

            return root ? rm(root, {
                "recursive": true,
                "force": true
            }) : Promise.resolve();

        });

    }

// tests

describe("Orchestrator / load edges", () => {

    it("should ignore package keys that must not be copied", () => {

        let root = "";

        return mkdtemp(join(tmpdir(), "plugin-package-")).then((dir) => {

            root = dir;

            return writeFile(join(dir, "package.json"), JSON.stringify({
                "name": "plugin",
                "version": "1.0.0",
                "constructor": "skip",
                "load": "skip"
            }), "utf8");

        }).then(() => {

            const orchestrator = new LocalOrchestrator({
                "packageFile": join(root, "package.json")
            });

            return orchestrator.load().then(() => {
                return orchestrator;
            });

        }).then((orchestrator) => {

            strictEqual(orchestrator.name, "plugin", "name is not as expected");
            strictEqual(orchestrator.version, "1.0.0", "version is not as expected");

        }).finally(() => {

            return root ? rm(root, {
                "recursive": true,
                "force": true
            }) : Promise.resolve();

        });

    });

    it("should load a mediator default export", () => {

        let root = "";

        return mkdtemp(join(tmpdir(), "plugin-default-")).then((dir) => {

            root = dir;

            return writeFile(join(dir, "mediator.js"), "module.exports = { \"default\": require(" + JSON.stringify(MEDIATOR_FILE) + ") };\n", "utf8");

        }).then(() => {

            return _init(join(root, "mediator.js"), SERVER_FILE);

        }).then((orchestrator) => {

            ok(orchestrator._Mediator, "mediator was not created");

        }).finally(() => {

            return root ? rm(root, {
                "recursive": true,
                "force": true
            }) : Promise.resolve();

        });

    });

    it("should load a server default export", () => {

        let root = "";

        return mkdtemp(join(tmpdir(), "plugin-default-")).then((dir) => {

            root = dir;

            return writeFile(join(dir, "server.js"), "module.exports = { \"default\": require(" + JSON.stringify(SERVER_FILE) + ") };\n", "utf8");

        }).then(() => {

            return _init(MEDIATOR_FILE, join(root, "server.js"));

        }).then((orchestrator) => {

            ok(orchestrator._Server, "server was not created");

        }).finally(() => {

            return root ? rm(root, {
                "recursive": true,
                "force": true
            }) : Promise.resolve();

        });

    });

    it("should reject a mediator that is not a class", () => {

        return _reject("module.exports = {};\n", "module.exports = {};\n").then((err) => {
            ok(-1 < err.message.indexOf("does not contain a valid Mediator"), "message is not as expected");
        });

    });

    it("should reject a mediator that throws an error", () => {

        return _reject("throw new Error(\"mediator-boom\");\n", "module.exports = {};\n").then((err) => {
            strictEqual(err.message, "mediator-boom", "message is not as expected");
        });

    });

    it("should reject a mediator that throws a string", () => {

        return _reject("throw \"mediator-string\";\n", "module.exports = {};\n").then((err) => {
            strictEqual(err.message, "mediator-string", "message is not as expected");
        });

    });

    it("should reject a server that is not a class", () => {

        return _reject("module.exports = require(" + JSON.stringify(MEDIATOR_FILE) + ");\n", "module.exports = {};\n").then((err) => {
            ok(-1 < err.message.indexOf("does not contain a valid Server"), "message is not as expected");
        });

    });

    it("should reject a server that throws an error", () => {

        return _reject("module.exports = require(" + JSON.stringify(MEDIATOR_FILE) + ");\n", "throw new Error(\"server-boom\");\n").then((err) => {
            strictEqual(err.message, "server-boom", "message is not as expected");
        });

    });

    it("should reject a server that throws a string", () => {

        return _reject("module.exports = require(" + JSON.stringify(MEDIATOR_FILE) + ");\n", "throw \"server-string\";\n").then((err) => {
            strictEqual(err.message, "server-string", "message is not as expected");
        });

    });

});
