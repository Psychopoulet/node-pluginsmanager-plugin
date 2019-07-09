/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { lstat } = require("fs");

// module

module.exports = function isFile (file) {

	return new Promise(function checkParams (resolve, reject) {

		if ("undefined" === typeof file) {
			reject(new ReferenceError("missing \"file\" argument"));
		}
			else if ("string" !== typeof file) {
				reject(new TypeError("\"file\" argument is not a string"));
			}
			else if ("" === file.trim()) {
				reject(new Error("\"file\" argument is empty"));
			}

		else {

			lstat(file, function check (err, stats) {
				return resolve(Boolean(!err && stats.isFile()));
			});

		}

	});

};
