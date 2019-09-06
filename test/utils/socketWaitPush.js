"use strict";

// deps

	// natives
	const WebSocket = require("ws");
	const { deepStrictEqual, strictEqual } = require("assert");

// consts

	const PORT = 3001;
	const MAIN_URL = "ws://127.0.0.1:" + PORT;

// module

module.exports = function socketWaitPush (commandPush, dataPush, requester) {

	const client = new WebSocket(MAIN_URL);

	// connection
	return new Promise((resolve) => {

		client.on("open", resolve);

	// send & wait for response
	}).then(() => {

		return new Promise((resolve, reject) => {

			client.on("message", (message) => {

				try {

					const { plugin, command } = JSON.parse(message);

					strictEqual(plugin, "node-pluginsmanager-plugin", "The name is not node-pluginsmanager-plugin");
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
			client.on("close", resolve).close();
		});

	});

};
