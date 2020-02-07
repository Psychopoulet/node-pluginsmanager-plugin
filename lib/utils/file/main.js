"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const checkFile = require(join(__dirname, "checkFile.js"));
	const isFile = require(join(__dirname, "isFile.js"));
	const readJSONFile = require(join(__dirname, "readJSONFile.js"));

// module

module.exports = {
	checkFile,
	isFile,
	readJSONFile
};
