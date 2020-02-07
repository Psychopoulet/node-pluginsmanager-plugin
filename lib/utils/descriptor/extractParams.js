"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const removeFirstSlash = require(join(__dirname, "..", "removeFirstSlash.js"));

// module

module.exports = function extractParams (patternPath, realPath) {

	const params = {};

		const patternPathSplitted = removeFirstSlash(patternPath).split("/");

		removeFirstSlash(realPath).split("/").forEach((p, i) => {

			if ("{" === patternPathSplitted[i][0]) {
				params[patternPathSplitted[i].replace("{", "").replace("}", "")] = p;
			}

		});

	return params;

};
