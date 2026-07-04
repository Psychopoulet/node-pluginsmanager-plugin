// deps

    // natives
    const { strictEqual } = require("node:assert");
    const { createServer } = require("node:http");
    const { join } = require("node:path");

    // externals
    const socketIO = require("socket.io");

    // locals
    const getSocketIOVersionFromServer = require(join(__dirname, "..", "lib", "cjs", "utils", "server", "getSocketIOVersionFromServer.js"));

// private

    function _mock () {
        // mock
    }

// tests

describe("utils / server / getSocketIOVersionFromServer", () => {

    it("should test with missing data", () => {
        strictEqual(getSocketIOVersionFromServer.default(), "NO_SERVER", "generated data is not as expected");
    });

    it("should test with null", () => {
        strictEqual(getSocketIOVersionFromServer.default(null), "NO_SERVER", "generated data is not as expected");
    });

    it("should test with wrong data", () => {

        strictEqual(getSocketIOVersionFromServer.default(false), "UNKNOWN", "generated data is not as expected");
        strictEqual(getSocketIOVersionFromServer.default(""), "UNKNOWN", "generated data is not as expected");
        strictEqual(getSocketIOVersionFromServer.default({}), "UNKNOWN", "generated data is not as expected");

    });

    it("should test with websocket server", () => {

        strictEqual(getSocketIOVersionFromServer.default({
            "clients": {
                "forEach": _mock
            }
        }), "UNKNOWN", "generated data is not as expected");

    });

    it("should test with socket.io v2 server", () => {

        strictEqual(getSocketIOVersionFromServer.default({
            "sockets": {
                "emit": _mock,
                "sockets": {}
            }
        }), "V2", "generated data is not as expected");

    });

    it("should test with socket.io v3-v4 mock server", () => {

        strictEqual(getSocketIOVersionFromServer.default({
            "sockets": {
                "emit": _mock,
                "sockets": {
                    "has": () => {
                        return false;
                    }
                }
            }
        }), "V3-V4", "generated data is not as expected");

    });

    it("should test with socket.io v3-v4 server without emit", () => {

        strictEqual(getSocketIOVersionFromServer.default({
            "sockets": {
                "sockets": {
                    "has": () => {
                        return false;
                    }
                }
            }
        }), "UNKNOWN", "generated data is not as expected");

    });

    it("should test with real socket.io v4 server", () => {

        const httpServer = createServer();
        const io = socketIO(httpServer);

        try {
            strictEqual(getSocketIOVersionFromServer.default(io), "V3-V4", "generated data is not as expected");
        }
        finally {

            io.close();
            httpServer.close();

        }

    });

});
