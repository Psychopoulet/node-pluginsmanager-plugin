// deps

    // natives
    const { strictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const getServerTypeFromServer = require(join(__dirname, "..", "lib", "src", "utils", "server", "getServerTypeFromServer.ts"));

// tests

describe("utils / server / getServerTypeFromServer", () => {

    it("should return UNKNOWN when the server is neither websocket nor socket.io", () => {

        strictEqual(getServerTypeFromServer.default({}), "UNKNOWN", "generated data is not as expected");
        strictEqual(getServerTypeFromServer.default({
            "clients": {},
            "sockets": {}
        }), "UNKNOWN", "generated data is not as expected");

    });

});
