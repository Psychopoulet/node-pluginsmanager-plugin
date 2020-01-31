"use strict";

// deps

	// natives
	const { join } = require("path");
	const { lstat } = require("fs");

	// locals

	const { checkNonEmptyString } = require(join(__dirname, "..", "..", "checkers", "main.js"));

// module

module.exports = function isFile (file) {

	return checkNonEmptyString("file", file).then(() => {

		return new Promise((resolve) => {

			lstat(file, (err, stats) => {
				return resolve(Boolean(!err && stats.isFile()));
			});

		});

	});

};
