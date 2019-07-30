"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// locals
	const LocalServer = require(join(__dirname, "LocalServer.js"));

// consts

	const REQUEST_PATHNAME = "/thisisatest";
	const REQUEST_FULLSTACK_PATHNAME = "/fullstack";
	const RESPONSE_CODE = 201;
	const RESPONSE_CONTENT = "Hello World";

// module

module.exports = class HeritedServer extends LocalServer {

	appMiddleware (req, res, next) {

		switch (req.url) {

			case REQUEST_PATHNAME:

				res.status(RESPONSE_CODE).send(RESPONSE_CONTENT);

			break;

			case REQUEST_FULLSTACK_PATHNAME:

				this.checkMediator().then(() => {
					res.status(RESPONSE_CODE).send(RESPONSE_CONTENT);
				}).catch((err) => {
					res.status(500).send(err.message ? err.message : err);
				});

			break;

			default:
				return next();

		}

		return null;

	}

	httpMiddleware (req, res) {

		const { pathname } = parse(req.url);

		if (REQUEST_PATHNAME === pathname) {

			res.writeHead(RESPONSE_CODE, { "Content-Type": "text/html; charset=utf-8" });
			res.end(RESPONSE_CONTENT, "utf-8");

			return true;

		}
		else if (REQUEST_FULLSTACK_PATHNAME === pathname) {

			this.checkMediator().then(() => {

				return this._Mediator.fullStack();

			}).then(() => {

				res.writeHead(RESPONSE_CODE, { "Content-Type": "text/html; charset=utf-8" });
				res.end(RESPONSE_CONTENT, "utf-8");

				return Promise.resolve();

			}).catch((err) => {

				res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
				res.end(err.message ? err.message : err, "utf-8");

			});

			return true;

		}

		return false;

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
