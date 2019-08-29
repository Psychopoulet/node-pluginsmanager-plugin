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

	constructor (opt) {

		super(opt);

		this._socketServer = null;
		this._onConnection = null;

	}

	init (...data) {

		return readJSONFile(join(__dirname, "..", "Descriptor.json")).then((content) => {

			this._Descriptor = content;
			this._Mediator = new HeritedMediator();

			return super.init(...data);

		});

	}

	_releaseWorkSpace () {

		return this._socketServer ? Promise.resolve().then(() => {

			if ("function" === typeof this._onConnection) {

				this._socketServer.removeListener("connection", this._onConnection);
				this._onConnection = null;

			}

			this._socketServer = null;

		}) : Promise.resolve();

	}

	socketMiddleware (server) {

		super.socketMiddleware(server); // only here for eslint

		this._socketServer = server;
		this._onConnection = (socket) => {

			(0, console).log("server", "socket", "connection");

			socket.on("message", (payload) => {

				(0, console).log("server", "socket", "message", payload);

				const req = JSON.parse(payload);

				if (req.name && "ping" === req.name) {

					this.emit("ping");

					socket.send(JSON.stringify({
						"name": "pong",
						"params": [ "test" ]
					}));

				}

			}).on("close", () => {
				(0, console).log("server", "socket", "close");
			});

		};

		this._socketServer.on("connection", this._onConnection);

	}

};
