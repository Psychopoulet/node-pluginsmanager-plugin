"use strict";

// module

module.exports = function pathsParameters (descriptor) {

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

					if (-1 >= path.indexOf("{" + parameter + "}")) {
						err = "\"" + parameter + "\" defined path parameter is not in the request path";
					}

				});

			});

		});

	return err ? Promise.reject(new Error(err)) : Promise.resolve();

};
