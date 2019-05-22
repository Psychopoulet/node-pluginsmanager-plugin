"use strict";

// deps

	// natives
	const { join } = require("path");
	const { readFile } = require("fs");

	// locals
	const isFile = require(join(__dirname, "isFile.js"));

// module

module.exports = function readJSONFile (file) {

	return isFile(file).then((exists) => {

		return !exists ?
			Promise.reject(new Error("The file does not exist")) :
			new Promise((resolve, reject) => {

				readFile(file, (err, content) => {
					return err ? reject(err) : resolve(content);
				});

			});

	}).then((content) => {
		return Promise.resolve(JSON.parse(content));
	});

};
