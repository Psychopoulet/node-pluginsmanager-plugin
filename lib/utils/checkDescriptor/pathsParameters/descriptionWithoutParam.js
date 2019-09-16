"use strict";

// module

module.exports = function descriptionWithoutParam (descriptor) {

	let err = null;

		Object.keys(descriptor.paths).forEach((path) => {

			Object.keys(descriptor.paths[path]).filter((method) => {
				return descriptor.paths[path][method].parameters;
			}).forEach((method) => {

				descriptor.paths[path][method].parameters.filter((param) => {
					return "path" === param.in;
				}).map((param) => {
					return param.name;
				}).forEach((parameter) => {

					if (!path.includes("{" + parameter + "}")) {

						err = new ReferenceError(
							"\"" + parameter + "\" defined path parameter" +
							" in the request path \"[" + method + "]" + path + "\""
						);

					}

				});

			});

		});

	return err ? Promise.reject(err) : Promise.resolve();

};
