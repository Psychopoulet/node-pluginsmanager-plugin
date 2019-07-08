/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { readFile } = require("fs");

	// locals
	const isFile = require(join(__dirname, "isFile.js"));

// module

module.exports = function readJSONFile (file) {

	return isFile(file).then(function check (exists) {

		return !exists ?
			Promise.reject(new Error("The file does not exist")) :
			new Promise(function read (resolve, reject) {

				readFile(file, function result (err, content) {
					return err ? reject(err) : resolve(content);
				});

			});

	}).then(function parse (content) {
		return Promise.resolve(JSON.parse(content));
	});

};
