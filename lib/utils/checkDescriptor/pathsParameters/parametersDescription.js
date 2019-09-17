/*
	eslint max-depth: 0, max-statements: 0
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const PARAMETERS_DESCRIPTION = join(__dirname, "parametersDescription");

		const nameProperty = require(join(PARAMETERS_DESCRIPTION, "nameProperty.js"));
		const inProperty = require(join(PARAMETERS_DESCRIPTION, "inProperty.js"));
		const requiredProperty = require(join(PARAMETERS_DESCRIPTION, "requiredProperty.js"));
		const typeProperty = require(join(PARAMETERS_DESCRIPTION, "typeProperty.js"));
		const pathDescriptionWithoutParam = require(join(PARAMETERS_DESCRIPTION, "pathDescriptionWithoutParam.js"));

// module

module.exports = function parametersDescription (descriptor) {

	let err = null;

		for (let i = 0, paths = Object.keys(descriptor.paths); i < paths.length; ++i) {

			const path = paths[i];

			for (let j = 0, methods = Object.keys(descriptor.paths[path]); j < methods.length; ++j) {

				const method = methods[j];

				if ("undefined" === typeof descriptor.paths[path][method].parameters) {
					// nothing to do here
				}
				else if (
					"object" !== typeof descriptor.paths[path][method].parameters ||
					!(descriptor.paths[path][method].parameters instanceof Array)
				) {

					err = new TypeError(
						"The \"parameters\" property must be an Array" +
						" in the request path \"[" + path + "]" + method + "\""
					);

				}
				else {

					const { parameters } = descriptor.paths[path][method];

					for (let k = 0; k < parameters.length; ++k) {

						const parameter = parameters[k];

						err = nameProperty(path, method, parameter);

						if (!err) {
							err = inProperty(path, method, parameter);
						}

						if (!err) {
							err = requiredProperty(path, method, parameter);
						}

						if (!err) {
							err = typeProperty(path, method, parameter);
						}

						if (!err) {
							err = pathDescriptionWithoutParam(path, method, parameter);
						}

						if (err) {
							break;
						}

					}

				}

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
