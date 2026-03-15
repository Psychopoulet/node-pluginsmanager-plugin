// deps

    // natives
    const { deepStrictEqual, strictEqual, ok } = require("node:assert");
    const Events = require("node:events");
    const { join } = require("node:path");

    // locals

        // plugin
        const { DescriptorUser, MediatorUser, Mediator, Server } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
        const readJSONFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));
        const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
        const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));

// tests

describe("Server", () => {

    let descriptor = null;

    before(() => {

        return readJSONFile.default(join(__dirname, "utils", "DescriptorUser", "Descriptor.json")).then((data) => {
            descriptor = data;
        });

    });

    it("should test constructor", () => {

        const server = new LocalServer();

        strictEqual(typeof server, "object", "Generated server is not an object");
        ok(server instanceof Events, "Generated server is not a Events instance");
        ok(server instanceof DescriptorUser, "Generated server is not a DescriptorUser instance");
        ok(server instanceof MediatorUser, "Generated server is not a MediatorUser instance");
        ok(server instanceof Server, "Generated server is not a Server instance");

    });

    it("should init server without Descriptor or Mediator", (done) => {

        const server = new LocalServer();

        strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
        strictEqual(server._Descriptor, null, "Generated server _Descriptor is not null");
        strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
        strictEqual(server._Mediator, null, "Generated server _Mediator is not null");

        server.init("test init").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "Generated Error is not as expected");
            ok(err instanceof Error, "Generated Error is not as expected");

            done();

        });

    });

    it("should init server without Mediator with Descriptor", (done) => {

        const server = new LocalServer({
            descriptor
        });

        strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
        deepStrictEqual(server._Descriptor, descriptor, "Generated server _Descriptor is not as expected");
        strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
        strictEqual(server._Mediator, null, "Generated server _Mediator is not null");

        server.init("test init").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "Generated Error is not as expected");
            ok(err instanceof Error, "Generated Error is not as expected");

            done();

        });

    });

    it("should init server without Descriptor with Mediator", (done) => {

        const mediator = new LocalMediator();
        const server = new LocalServer({
            mediator
        });

        strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
        strictEqual(server._Descriptor, null, "Generated server _Descriptor is not null");
        strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
        ok(server._Mediator instanceof Events, "Generated server _Mediator is not a Events instance");
        ok(server._Mediator instanceof DescriptorUser, "Generated server _Mediator is not a DescriptorUser instance");
        ok(server._Mediator instanceof Mediator, "Generated server _Mediator is not a Mediator instance");

        server.init("test init").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object", "Generated Error is not as expected");
            ok(err instanceof Error, "Generated Error is not as expected");

            done();

        });

    });

    it("should test non-herited _initWorkSpace", () => {

        return new Server({
            "externalResourcesDirectory": ""
        })._initWorkSpace();

    });

    it("should init server with Descriptor and Mediator", () => {

        const mediator = new LocalMediator();
        const server = new Server({
            "externalResourcesDirectory": "",
            descriptor,
            mediator
        });

        strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
        deepStrictEqual(server._Descriptor, descriptor, "Generated server _Descriptor is not as expected");
        strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
        ok(server._Mediator instanceof Events, "Generated server _Mediator is not a Events instance");
        ok(server._Mediator instanceof DescriptorUser, "Generated server _Mediator is not a DescriptorUser instance");
        ok(server._Mediator instanceof Mediator, "Generated server _Mediator is not a Mediator instance");

        return server.init("test init");

    });

    it("should test non-herited _releaseWorkSpace", () => {

        return new Server({
            "externalResourcesDirectory": ""
        })._releaseWorkSpace();

    });

    it("should release server", () => {

        return new Server({
            "externalResourcesDirectory": ""
        }).release("test release");

    });

});
