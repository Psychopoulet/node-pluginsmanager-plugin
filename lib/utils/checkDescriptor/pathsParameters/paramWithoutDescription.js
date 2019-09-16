"use strict";

// module

module.exports = function paramWithoutDescription (descriptor) {

	let err = null;

		Object.keys(descriptor.paths).filter((path) => {
			return path.includes("{");
		}).forEach((path) => {

			const pathParameters = (path.match(/{[a-z-]+}/g) || []).map((param) => {
				return param.replace("{", "").replace("}", "");
			});

			if (!pathParameters.length) {

				err = new Error(
					"There is a wrong-formated parameter (must be like \"{[a-z-]+}\")" +
					" in the request path \"" + path + "\""
				);

			}
			else {

				Object.keys(descriptor.paths[path]).forEach((method) => {

					if (!descriptor.paths[path][method].parameters) {

						err = new ReferenceError(
							"There is no path parameters definitions" +
							" in the request path \"[" + method + "]" + path + "\""
						);

					}
					else {

						const definedParameters = descriptor.paths[path][method].parameters.filter((param) => {
							return "path" === param.in && param.required;
						}).map((param) => {
							return param.name;
						});

						pathParameters.forEach((param) => {

							if (!definedParameters.includes(param)) {

								err = new ReferenceError(
									"There is no definition for \"" + param + "\" parameter (or the parameter is not \"required\")" +
									" in the request path \"[" + method + "]" + path + "\""
								);

							}

						});

					}

				});

			}

		});

	return err ? Promise.reject(err) : Promise.resolve();

};
