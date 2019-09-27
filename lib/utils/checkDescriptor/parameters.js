"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const checkUrlParameters = require(join(__dirname, "url-parameters", "checkUrlParameters.js"));

// module

module.exports = function parameters (descriptor) {

	let err = null;

		for (let i = 0, paths = Object.keys(descriptor.paths); i < paths.length; ++i) {

			const path = paths[i];

			for (let j = 0, methods = Object.keys(descriptor.paths[path]); j < methods.length; ++j) {

				const method = methods[j];

				// url parameters

				err = checkUrlParameters(
					path, method,
					descriptor.paths[path][method].parameters,
					descriptor.components || {}
				);

				// body parameters

				// if (!err) { }

				if (err) {
					break;
				}

			}

			if (err) {
				break;
			}

		}

	return err ? Promise.reject(err) : Promise.resolve();

};
