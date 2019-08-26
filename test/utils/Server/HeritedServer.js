"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const readJSONFile = require(join(__dirname, "..", "..", "..", "lib", "utils", "readJSONFile.js"));
	const HeritedMediator = require(join(__dirname, "..", "Mediator", "HeritedMediator.js"));
	const LocalServer = require(join(__dirname, "LocalServer.js"));

// module

module.exports = class HeritedServer extends LocalServer {

	init (...data) {

		return readJSONFile(join(__dirname, "..", "Descriptor.json")).then((content) => {

			this._Descriptor = content;
			this._Mediator = new HeritedMediator();

			return super.init(...data);

		});

	}

	socketMiddleware (server) {

		server.on("connection", (socket) => {

			socket.on("message", (payload) => {

				const req = JSON.parse(payload);

				if (req.name && "ping" === req.name) {

					this.emit("ping");

					socket.send(JSON.stringify({
						"name": "pong",
						"params": [ "test" ]
					}));

				}

			});

		});

	}

};
