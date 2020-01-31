"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const removeFirstSlash = require(join(__dirname, "..", "removeFirstSlash.js"));

// module

module.exports = function extractPathName (paths, pathname, method) {

	return "object" !== typeof paths ? "" : Object.keys(paths).filter((p) => {
		return "undefined" !== typeof paths[p][method];
	}).find((p) => {

		const pathnameSplitted = removeFirstSlash(pathname).split("/");
		const pathSplitted = removeFirstSlash(p).split("/");

		if (pathnameSplitted.length !== pathSplitted.length) {
			return false;
		}

		for (let i = 0; i < pathnameSplitted.length; ++i) {

			if ("{" !== pathSplitted[i][0] && pathSplitted[i] !== pathnameSplitted[i]) {
				return false;
			}

		}

		return true;

	}) || "";

};
