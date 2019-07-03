"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const isFile = require(join(__dirname, "isFile.js"));
	const isDirectory = require(join(__dirname, "isDirectory.js"));
	const readJSONFile = require(join(__dirname, "readJSONFile.js"));

// module

module.exports = {
	"isFile": isFile,
	"isDirectory": isDirectory,
	"readJSONFile": readJSONFile
};
