"use strict";

// deps

	// natives
	const { lstat } = require("fs");

// module

module.exports = function isdirectory (directory) {

	return new Promise((resolve, reject) => {

		if ("undefined" === typeof directory) {
			reject(new ReferenceError("missing \"directory\" argument"));
		}
			else if ("string" !== typeof directory) {
				reject(new TypeError("\"directory\" argument is not a string"));
			}
			else if ("" === directory.trim()) {
				reject(new Error("\"directory\" argument is empty"));
			}

		else {

			lstat(directory, (err, stats) => {
				return resolve(Boolean(!err && stats.isDirectory()));
			});

		}

	});

};
