/*
	eslint complexity: 0, max-depth: 0, max-statements: 0
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const PARAMETERS_DESCRIPTION = join(__dirname, "parameters");

		const multiplesParameters = require(join(PARAMETERS_DESCRIPTION, "multiplesParameters.js"));
		const parameterWithoutDescription = require(join(PARAMETERS_DESCRIPTION, "parameterWithoutDescription.js"));

	const PARAMETER_DESCRIPTION = join(PARAMETERS_DESCRIPTION, "parameterDescription");

		const refProperty = require(join(PARAMETER_DESCRIPTION, "refProperty.js"));
		const nameProperty = require(join(PARAMETER_DESCRIPTION, "nameProperty.js"));
		const inProperty = require(join(PARAMETER_DESCRIPTION, "inProperty.js"));
		const requiredProperty = require(join(PARAMETER_DESCRIPTION, "requiredProperty.js"));
		const typeProperty = require(join(PARAMETER_DESCRIPTION, "typeProperty.js"));
		const descriptionWithoutParameter = require(join(PARAMETER_DESCRIPTION, "descriptionWithoutParameter.js"));

// module

module.exports = function parametersDescription (descriptor) {

	let err = null;

		for (let i = 0, paths = Object.keys(descriptor.paths); i < paths.length; ++i) {

			const path = paths[i];

			for (let j = 0, methods = Object.keys(descriptor.paths[path]); j < methods.length; ++j) {

				const method = methods[j];

				if (
					"undefined" !== typeof descriptor.paths[path][method].parameters &&
					(
						"object" !== typeof descriptor.paths[path][method].parameters ||
						!(descriptor.paths[path][method].parameters instanceof Array)
					)
				) {

					err = new TypeError(
						"The \"parameters\" property must be an Array" +
						" in the request path \"[" + path + "]" + method + "\""
					);

				}
				else {

					const parameters = descriptor.paths[path][method].parameters || [];

					for (let k = 0; k < parameters.length; ++k) {

						let parameter = parameters[k];

						if ("undefined" !== typeof parameter.$ref) {

							err = refProperty(path, method, parameter);

							if (!err) {

								const ref = parameter.$ref.split("/");

								if (
									"undefined" === typeof descriptor.components ||
									"undefined" === typeof descriptor.components.parameters ||
									"undefined" === typeof descriptor.components.parameters[ref[3]]
								) {

									err = new ReferenceError(
										"\"$ref\" property of a parameter does not refer to an existing component" +
										" in the request path \"[" + method + "]" + path + "\""
									);

								}
								else {

									parameter = descriptor.components.parameters[ref[3]];

									parameters[k] = parameter;
									descriptor.paths[path][method].parameters[k] = parameter;

								}

							}

						}

						if (!err) {
							err = nameProperty(path, method, parameter);
						}

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
							err = descriptionWithoutParameter(path, method, parameter);
						}

						if (err) {
							break;
						}

					}

					if (!err) {
						err = multiplesParameters(path, method, parameters);
					}

					if (!err) {
						err = parameterWithoutDescription(path, method, parameters);
					}

					if (err) {
						break;
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
