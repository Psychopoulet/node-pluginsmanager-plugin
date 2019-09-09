"use strict";

// module

module.exports = function pathsParameters (descriptor) {

	// search path parameters wihout description
	return Promise.resolve().then(() => {

		let err = null;

			Object.keys(descriptor.paths).filter((path) => {
				return path.includes("{");
			}).forEach((path) => {

				const pathParameters = (path.match(/{[a-z-]+}/g) || []).map((param) => {
					return param.replace("{", "").replace("}", "");
				});

				if (!pathParameters.length) {
					err = new Error("\"" + path + "\" has a wrong-formated parameter");
				}
				else {

					Object.keys(descriptor.paths[path]).forEach((method) => {

						if (!descriptor.paths[path][method].parameters) {

							err = new ReferenceError(
								"There is no defined path parameters" +
								" in the request path \"[" + method + "]" + path + "\""
							);

						}
						else {

							const definedParameters = descriptor.paths[path][method].parameters.map((param) => {
								return param.name;
							});

							pathParameters.forEach((param) => {

								if (!definedParameters.includes(param)) {

									err = new ReferenceError(
										"There is no definition for \"" + param + "\"" +
										" path parameter in the request path \"[" + method + "]" + path + "\""
									);

								}

							});

						}

					});

				}

			});

		return err ? Promise.reject(err) : Promise.resolve();

	// search description without path parameter
	}).then(() => {

		let err = null;

			Object.keys(descriptor.paths).forEach((path) => {

				Object.keys(descriptor.paths[path]).filter((method) => {
					return descriptor.paths[path][method].parameters;
				}).forEach((method) => {

					descriptor.paths[path][method].parameters.filter((param) => {
						return "path" === param.type;
					}).map((param) => {
						return param.name;
					}).forEach((parameter) => {

						if (!path.includes("{" + parameter + "}")) {

							err = new ReferenceError(
								"\"" + parameter + "\" defined path parameter" +
								" is not in the request path"
							);

						}

					});

				});

			});

		return err ? Promise.reject(err) : Promise.resolve();

	});

};
