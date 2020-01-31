"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractBody = require(join(__dirname, "extractBody.js"));
	const extractParams = require(join(__dirname, "extractParams.js"));
	const extractPathName = require(join(__dirname, "extractPathName.js"));
	const extractPathMethodByOperationId = require(join(__dirname, "extractPathMethodByOperationId.js"));

// module

module.exports = {
	extractBody,
	extractParams,
	extractPathName,
	extractPathMethodByOperationId
};
