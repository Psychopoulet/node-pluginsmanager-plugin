"use strict";

// deps

	// natives
	const { join } = require("path");
	const { readFile } = require("fs");

	// locals
	const checkFile = require(join(__dirname, "checkFile.js"));

// module

module.exports = function readJSONFile (file) {

	return checkFile(file).then(() => {

		return new Promise((resolve, reject) => {

			readFile(file, "utf8", (err, content) => {
				return err ? reject(err) : resolve(content);
			});

		});

	}).then((content) => {
		return Promise.resolve(JSON.parse(content));
	});

};
