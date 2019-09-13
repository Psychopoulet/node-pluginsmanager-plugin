"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const { Server } = require(join(__dirname, "..", "..", "..", "lib", "main.js"));
		const readJSONFile = require(join(__dirname, "..", "..", "..", "lib", "utils", "readJSONFile.js"));

		// utils
		const HeritedMediator = require(join(__dirname, "..", "Mediator", "HeritedMediator.js"));

// module

module.exports = class HeritedServer extends Server {

	constructor (opt) {

		super(opt);

		this._onConnection = null;

	}

	init (...data) {

		return readJSONFile(join(__dirname, "..", "DescriptorUser", "Descriptor.json")).then((content) => {

			this._Descriptor = content;
			this._Mediator = new HeritedMediator({
				"descriptor": this._Descriptor
			});

			return super.init(...data);

		});

	}

	_releaseWorkSpace () {

		return this._socketServer ? Promise.resolve().then(() => {

			if ("function" === typeof this._onConnection) {

				this._socketServer.removeListener("connection", this._onConnection);
				this._onConnection = null;

			}

		}) : Promise.resolve();

	}

	socketMiddleware (server) {

		super.socketMiddleware(server);

		this._onConnection = (socket) => {

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

		};

		this._socketServer.on("connection", this._onConnection);

	}

};
