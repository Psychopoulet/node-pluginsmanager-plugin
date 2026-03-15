// deps

    // natives
    const { createServer } = require("node:http");
    const { join } = require("node:path");
    const { URL } = require("node:url");

    // locals

        // utils
        const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));
        const tests = require(join(__dirname, "utils", "Server", "tests.js"));

// tests

describe("Server / requests / http", () => {

    let runningServer = null;
    const server = new HeritedServer();

    before(() => {

        server.enableCheckParameters().enableCheckResponse();

        return server.init().then(() => {

            // servers[0] => http server
            const url = new URL(server._Descriptor.servers[0].url, "http://localhost"); // any url, but "http://localhost" is used to avoid errors

            return new Promise((resolve) => {

                runningServer = createServer((req, res) => {

                    server.appMiddleware(req, res, () => {

                        res.writeHead(404, {
                            "Content-Type": "application/json; charset=utf-8"
                        });

                        res.end(JSON.stringify({
                            "code": "404",
                            "message": "Unknown page"
                        }));

                    });

                }).listen(parseInt(url.port, 10), resolve);

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

    tests(server, true);

});
