"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// externals
	const express = require("express");

	// locals
	const HeritedServer = require(join(__dirname, "..", "Server", "HeritedServer.js"));

// tests

const server = new HeritedServer();

server.init().then(() => {

	const port = parseInt(parse(server._Descriptor.servers[0].url).port, 10);

	(0, console).log("Start on port", port);

	return new Promise((resolve) => {

		express().use(
			"/node-pluginsmanager-plugin", express.static(join(__dirname))
		).use((req, res, next) => {
			server.appMiddleware(req, res, next);
		}).use((req, res) => {

			res.writeHead(404, {
				"Content-Type": "application/json; charset=utf-8"
			});

			res.end(JSON.stringify({
				"code": "404",
				"message": "Unknown page"
			}));

		}).listen(port, resolve);

	});

}).catch((err) => {
	(0, console).error(err);
});
