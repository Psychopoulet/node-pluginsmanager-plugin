// deps

    // natives
    const { join } = require("node:path");
    const { URL } = require("node:url");

    // externals
    const express = require("express");

    // locals
    const HeritedServer = require(join(__dirname, "..", "Server", "HeritedServer.js"));

// tests

const server = new HeritedServer();

server.init().then(() => {

    const { port } = new URL(server._Descriptor.servers[0].url, "http://localhost"); // any url, but "http://localhost" is used to avoid errors

    (0, console).log("Start on port", port);

    return new Promise((resolve) => {

        express().use(
            "/node-pluginsmanager-plugin", express.static(join(__dirname))
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

}).catch((err) => {
    (0, console).error(err);
});
