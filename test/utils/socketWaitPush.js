/*
	eslint max-params: 0
*/

"use strict";

// deps

	// natives
	const { deepStrictEqual, strictEqual } = require("assert");

	// externals
	const WebSocket = require("ws");
	const socketIOClient = require("socket.io-client");

// module

module.exports = function socketWaitPush (port, commandPush, dataPush, requester, socketIO = false) {

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

					const { plugin, command } = JSON.parse(message);

					strictEqual(plugin, "node-pluginsmanager-plugin", "The plugin is not node-pluginsmanager-plugin");
					strictEqual(command, commandPush, "The command is not " + commandPush);

					if (dataPush) {

						const { data } = JSON.parse(message);

						deepStrictEqual(data, dataPush, "The data is not " + JSON.stringify(dataPush));

					}

					resolve();

				}
				catch (e) {
					reject(e);
				}

			});

			requester();

		});

	// send & wait for response
	}).then(() => {

		return new Promise((resolve) => {
			client.on(socketIO ? "disconnect" : "close", resolve).close();
		});

	});

};
