"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");

	// externals
	const WebSocket = require("ws");
	const socketIOClient = require("socket.io-client");

// module

module.exports = function socketRequestTest (port, requestName, returnName, socketIO = false) {

	const client = socketIO ?
		socketIOClient("http://127.0.0.1:" + port) :
		new WebSocket("ws://127.0.0.1:" + port);

	// connection
	return new Promise((resolve) => {

		client.on(socketIO ? "connect" : "open", resolve);

	// send & wait for response
	}).then(() => {

		return new Promise((resolve, reject) => {

			client.on("message", (message) => {

				try {

					const req = JSON.parse(message);

					strictEqual(req.command, returnName, "The command is not " + returnName);

					resolve();

				}
				catch (e) {
					reject(e);
				}

			});

			client.send(JSON.stringify({
				"plugin": "node-pluginsmanager-plugin",
				"command": requestName
			}));

		});

	// close
	}).then(() => {

		return new Promise((resolve) => {
			client.on(socketIO ? "disconnect" : "close", resolve).close();
		});

	});

};
