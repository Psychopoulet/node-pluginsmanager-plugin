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

		const { pathname } = parse(req.url);
		const method = req.method.toLowerCase();

		this.getPaths().then((paths) => {

			let path = null;

				for (let i = 0; i < paths.length; ++i) {

					if (paths[i].path === pathname && paths[i].method === method) {

						path = {
							"path": paths[i].path,
							"method": paths[i].method
						};

						break;

					}

				}

			return Promise.resolve(path);

		}).then((path) => {

			if (!path) {
				return next();
			}
			else {

				return Promise.resolve().then(() => {

					return REQUEST_FULLSTACK_PATHNAME === path.path ? this.checkMediator().then(() => {
						return this._Mediator.fullStack();
					}) : Promise.resolve();

				}).then(() => {

					res.writeHead(RESPONSE_CODE, {
						"Content-Type": "text/plain; charset=utf-8"
					});

					res.end(RESPONSE_CONTENT, "utf-8");

				});

			}

		}).catch((err) => {

			res.writeHead(RESPONSE_CODE, {
				"Content-Type": "text/plain; charset=utf-8"
			});

			res.end(err.message ? err.message : err);

		});

	}

	httpMiddleware (req, res) {

		const { pathname } = parse(req.url);
		const method = req.method.toLowerCase();

		if (REQUEST_PATHNAME === pathname && "get" === method) {

			res.writeHead(RESPONSE_CODE, {
				"Content-Type": "text/plain; charset=utf-8"
			});

			res.end(RESPONSE_CONTENT, "utf-8");

			return true;

		}
		else if (REQUEST_FULLSTACK_PATHNAME === pathname && "get" === method) {

			this.checkMediator().then(() => {

				return this._Mediator.fullStack();

			}).then(() => {

				res.writeHead(RESPONSE_CODE, {
					"Content-Type": "text/plain; charset=utf-8"
				});

				res.end(RESPONSE_CONTENT, "utf-8");

				return Promise.resolve();

			}).catch((err) => {

				res.writeHead(500, {
					"Content-Type": "text/plain; charset=utf-8"
				});

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
