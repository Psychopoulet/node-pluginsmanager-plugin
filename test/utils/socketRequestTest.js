"use strict";

// deps

	// natives
	const WebSocket = require("ws");
	const { strictEqual } = require("assert");

// consts

	const PORT = 3001;
	const MAIN_URL = "ws://127.0.0.1:" + PORT;

// module

module.exports = function socketRequestTest (requestName, returnName) {

	const client = new WebSocket(MAIN_URL);

	// connection
	return new Promise((resolve) => {

		client.on("open", resolve);

	// send & wait for response
	}).then(() => {

		return new Promise((resolve, reject) => {

			client.on("message", (message) => {

				try {

					const req = JSON.parse(message);

					strictEqual(req.name, returnName, "The name is not " + returnName);

					resolve();

				}
				catch (e) {
					reject(e);
				}

			});

			client.send(JSON.stringify({
				"name": requestName
			}));

		});

	// close
	}).then(() => {

		return new Promise((resolve) => {
			client.on("close", resolve).close();
		});

	});

};
