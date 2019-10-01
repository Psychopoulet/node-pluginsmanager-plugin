/*
	eslint max-depth: 0
*/

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

			if ("/" !== path[0]) {

				err = new Error(
					"The path must start with a slash" +
					" in the request path \"" + path + "\""
				);

			}
			else if (path.includes(" ")) {

				err = new Error(
					"There must be no space" +
					" in the request path \"" + path + "\""
				);

			}
			else {

				const [ firstPath ] = path.substr(1, path.length).split("/");

				if (firstPath !== descriptor.info.title) {

					err = new Error(
						"The path must start with the descriptor title (\"/" + descriptor.info.title + "\")" +
						" in the request path \"" + path + "\""
					);

				}
				else {

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

				}

			}

			if (err) {
				break;
			}

		}

	return err ? Promise.reject(err) : Promise.resolve();

};
