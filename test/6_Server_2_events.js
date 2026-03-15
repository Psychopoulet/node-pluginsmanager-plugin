// deps

    // natives
    const { join } = require("node:path");

    // locals

        // plugin
        const { Server } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
        const readJSONFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));
        const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// tests

describe("Server / events", () => {

    let descriptor = null;
    const mediator = new LocalMediator();

    before(() => {

        return readJSONFile.default(join(__dirname, "utils", "DescriptorUser", "Descriptor.json")).then((data) => {
            descriptor = data;
        });

    });

    it("should test events before init", () => {

        const server = new Server({
            "externalResourcesDirectory": "",
            descriptor,
            mediator
        });

        return new Promise((resolve) => {

            server
                .once("test", resolve)
                .emit("test");

        });

    });

    it("should test events after init", () => {

        const server = new Server({
            "externalResourcesDirectory": "",
            descriptor,
            mediator
        });

        return new Promise((resolve, reject) => {

            server
                .once("test", resolve);

            server.init().then(() => {
                server.emit("test");
            }).catch(reject);

        });

    });

    it("should test events after release", () => {

        const server = new Server({
            "externalResourcesDirectory": "",
            descriptor,
            mediator
        });

        return new Promise((resolve, reject) => {

            server.once("test", () => {
                reject(new Error("Should not fire this event"));
            });

            server.init().then(() => {
                return server.release();
            }).then(() => {

                server.emit("test");

                resolve();

            }).catch(reject);

        });

    });

});
