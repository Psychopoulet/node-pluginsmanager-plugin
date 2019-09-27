"use strict";

// module

module.exports = function parameterWithoutDescription (path, method, parameters) {

	let err = null;

		if (path.includes("{")) {

			const pathParameters = (path.match(/{[a-z-]+}/g) || []).map((param) => {
				return param.replace("{", "").replace("}", "");
			});

			if (!pathParameters.length) {

				err = new Error(
					"There is a wrong-formated parameter (must be like \"{[a-z-]+}\")" +
					" in the request path \"" + path + "\""
				);

			}
			else if (!parameters || !parameters.length) {

				err = new ReferenceError(
					"There is no definition for parameters" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else {

				const definedParameters = parameters.filter((param) => {
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

		}

	return err;

};
