// deps

    // natives
    const { join } = require("node:path");
    const { URL } = require("node:url");

    // externals
    const express = require("express");

    // locals

        // utils
        const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));
        const tests = require(join(__dirname, "utils", "Server", "tests.js"));

// tests

describe("Server / requests / app", () => {

    let runningServer = null;
    const server = new HeritedServer();

    before(() => {

        server.disableCheckParameters().disableCheckResponse();

        return server.init().then(() => {

            const url = new URL(server._Descriptor.servers[0].url, "http://localhost"); // any url, but "http://localhost" is used to avoid errors
            const port = parseInt(url.port, 10);

            return new Promise((resolve) => {

                runningServer = express().use(
                    "/node-pluginsmanager-plugin", express.static(join(__dirname, "utils", "public"))
                ).use((req, res, next) => {
                    server.appMiddleware(req, res, next);
                }).use((req, res) => {

                    res.writeHead(404, {
                        "Content-Type": "application/json; charset=utf-8"
                    });

                    res.end(JSON.stringify({
                        "code": "404",
                        "message": "Unknown page"
                    }));

                }).listen(port, resolve);

            });

        });

    });

    after(() => {

        return server.release().then(() => {

            return runningServer ? new Promise((resolve) => {

                runningServer.close(() => {
                    runningServer = null;
                    resolve();
                });

            }) : Promise.resolve();

        });

    });

    tests(server, false);

});
