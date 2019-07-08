/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const isFile = require(join(__dirname, "isFile.js"));

// module

module.exports = function checkFile (file) {

	return isFile(file).then(function check (exists) {

		return exists ? Promise.resolve() :
			Promise.reject(new Error("\"" + file + "\" does not exist."));

	});

};
