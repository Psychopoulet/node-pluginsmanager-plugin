"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const { Server } = require(join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs"));

		console.log(Server);

// module

module.exports = class ServerWithSockets extends Server {

	constructor (opt) {

		super(opt);

		this._onConnection = null;

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

				// check plugin
				if ("string" === typeof req.plugin && this._Descriptor.info.title === req.plugin) {

					// check command (switch ?)
					if ("string" === typeof req.command && "ping" === req.command) {

						this.emit("ping");
						this.push("pong", "test");

					}

				}

			});

		};

		this._socketServer.on("connection", this._onConnection);

	}

};
