"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// locals
	const Server = require(join(__dirname, "..", "..", "lib", "components", "Server.js"));

// consts

	const RESPONSE_CODE = 201;
	const RESPONSE_CONTENT = "Hello World";

// module

module.exports = class ServerHerited extends Server {

	appMiddleware (req, res, next) {

		res.status(RESPONSE_CODE).send(RESPONSE_CONTENT);

		return next();

	}

	httpMiddleware (req, res) {

		const { pathname } = parse(req.url);

		if ("/thisisatest" === pathname) {

			res.writeHead(RESPONSE_CODE, { "Content-Type": "text/html; charset=utf-8" });
			res.end(RESPONSE_CONTENT, "utf-8");

			return true;

		}

		return false;

	}

};
