// deps

    // natives
    const { deepStrictEqual, strictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));

// const

    const DESCRIPTOR = {
        "openapi": "3.0.2",
        "info": {
            "title": "plugin",
            "version": "1.0.0",
            "description": "test"
        },
        "paths": {}
    };

// private

    function _server (socketServer) {

        const server = new LocalServer({
            "descriptor": DESCRIPTOR
        });

        server._socketServer = socketServer || null;

        return server;

    }

    function _wait () {

        return new Promise((resolve) => {
            setImmediate(resolve);
        });

    }

// tests

describe("Server / clients", () => {

    it("should enable and disable cors", () => {

        const server = _server(null);

        strictEqual(server.enableCors(), server, "enableCors must return the server");
        strictEqual(server._cors, true, "cors must be enabled");
        strictEqual(server.disableCors(), server, "disableCors must return the server");
        strictEqual(server._cors, false, "cors must be disabled");

    });

    it("should list no clients without a socket server", () => {

        deepStrictEqual(_server(null).getClients(), [], "clients are not as expected");

    });

    it("should list websocket clients", () => {

        const open = {
            "readyState": 1
        };
        const closed = {
            "id": "closed",
            "readyState": 3
        };
        const clients = new Set([ open, closed ]);
        const server = _server({
            "clients": clients
        });
        const listed = server.getClients();

        strictEqual(listed.length, 2, "client count is not as expected");
        strictEqual(typeof open.id, "string", "missing id must be created");
        strictEqual(listed[0].status, "CONNECTED", "open client is not connected");
        strictEqual(listed[1].id, "closed", "closed client id is not as expected");
        strictEqual(listed[1].status, "DISCONNECTED", "closed client is not disconnected");

    });

    it("should list socket.io v2 clients", () => {

        const server = _server({
            "sockets": {
                "emit": () => {
                    // nothing to do here
                },
                "sockets": {
                    "on": {
                        "id": "on",
                        "connected": true
                    },
                    "off": {
                        "id": "off",
                        "connected": false
                    }
                }
            }
        });

        deepStrictEqual(server.getClients(), [
            {
                "id": "on",
                "status": "CONNECTED"
            },
            {
                "id": "off",
                "status": "DISCONNECTED"
            }
        ], "clients are not as expected");

    });

    it("should list socket.io v3 clients", () => {

        const sockets = new Map();

        sockets.set("on", {
            "id": "on",
            "connected": true
        });
        sockets.set("off", {
            "id": "off",
            "connected": false
        });

        const server = _server({
            "sockets": {
                "emit": () => {
                    // nothing to do here
                },
                "sockets": sockets
            }
        });

        deepStrictEqual(server.getClients(), [
            {
                "id": "on",
                "status": "CONNECTED"
            },
            {
                "id": "off",
                "status": "DISCONNECTED"
            }
        ], "clients are not as expected");

    });

    it("should ignore a client lookup without socket.io", () => {

        strictEqual(typeof _server(null)._getUsableSocketIOClient("on"), "undefined", "client must be missing");

    });

    it("should find a connected socket.io v2 client", () => {

        const client = {
            "id": "on",
            "connected": true
        };
        const server = _server({
            "sockets": {
                "emit": () => {
                    // nothing to do here
                },
                "sockets": {
                    "on": client,
                    "off": {
                        "id": "off",
                        "connected": false
                    }
                }
            }
        });

        strictEqual(server._getUsableSocketIOClient("on"), client, "connected client is not as expected");
        strictEqual(typeof server._getUsableSocketIOClient("off"), "undefined", "disconnected client must be ignored");
        strictEqual(typeof server._getUsableSocketIOClient("missing"), "undefined", "unknown client must be ignored");

    });

    it("should find a connected socket.io v3 client", () => {

        const client = {
            "id": "on",
            "connected": true
        };
        const sockets = new Map();

        sockets.set("on", client);
        sockets.set("off", {
            "id": "off",
            "connected": false
        });

        const server = _server({
            "sockets": {
                "emit": () => {
                    // nothing to do here
                },
                "sockets": sockets
            }
        });

        strictEqual(server._getUsableSocketIOClient("on"), client, "connected client is not as expected");
        strictEqual(typeof server._getUsableSocketIOClient("off"), "undefined", "disconnected client must be ignored");
        strictEqual(typeof server._getUsableSocketIOClient("missing"), "undefined", "unknown client must be ignored");

    });

    it("should ignore a socket.io client that cannot be read", () => {

        const sockets = {
            "has": () => {
                return true;
            },
            "get": () => {
                // nothing to do here
            }
        };
        const server = _server({
            "sockets": {
                "emit": () => {
                    // nothing to do here
                },
                "sockets": sockets
            }
        });

        strictEqual(typeof server._getUsableSocketIOClient("on"), "undefined", "unreadable client must be ignored");

    });

    it("should ignore a push when there is no socket server", () => {

        const server = _server(null);

        strictEqual(server.pushClient("on", "ping"), server, "pushClient must return the server");

    });

    it("should push to one websocket client", () => {

        const sent = [];
        const clients = new Set([
            {
                "readyState": 1,
                "send": (payload) => {
                    sent.push(payload);
                }
            },
            {
                "id": "other",
                "readyState": 1,
                "send": () => {
                    throw new Error("other client must not be used");
                }
            }
        ]);
        const server = _server({
            "clients": clients
        });

        server.pushClient("missing", "ping", "pong", false);

        return _wait().then(() => {

            strictEqual(sent.length, 0, "unknown client must not receive the push");

            const [ target ] = [ ...clients ];

            server.pushClient(target.id, "ping", "pong");

            return _wait();

        }).then(() => {

            strictEqual(sent.length, 1, "push count is not as expected");

            const message = JSON.parse(sent[0]);

            strictEqual(message.plugin, "plugin", "plugin is not as expected");
            strictEqual(message.command, "ping", "command is not as expected");
            strictEqual(message.data, "pong", "data is not as expected");

        });

    });

    it("should push to one socket.io client", () => {

        const sent = [];
        const client = {
            "id": "on",
            "connected": true,
            "emit": (event, payload) => {
                sent.push({
                    event,
                    payload
                });
            }
        };
        const server = _server({
            "sockets": {
                "emit": () => {
                    // nothing to do here
                },
                "sockets": {
                    "on": client
                }
            }
        });

        server.pushClient("missing", "ping");

        return _wait().then(() => {

            strictEqual(sent.length, 0, "unknown client must not receive the push");

            server.pushClient("on", "ping", {
                "name": "test"
            });

            return _wait();

        }).then(() => {

            strictEqual(sent.length, 1, "push count is not as expected");
            strictEqual(sent[0].event, "message", "event is not as expected");
            strictEqual(JSON.parse(sent[0].payload).command, "ping", "command is not as expected");

        });

    });

    it("should log a failed push", () => {

        const server = new LocalServer();

        server._socketServer = {
            "clients": new Set()
        };
        server.pushClient("on", "ping");

        return _wait();

    });

});
