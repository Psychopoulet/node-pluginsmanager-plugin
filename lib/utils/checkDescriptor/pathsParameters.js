"use strict";

// module

module.exports = function pathsParameters (descriptor) {

	let err = null;

		Object.keys(descriptor.paths).forEach((path) => {

			Object.keys(descriptor.paths[path]).forEach((method) => {

				if (descriptor.paths[path][method].parameters) {

					descriptor.paths[path][method].parameters.filter((param) => {
						return "path" === param.type;
					}).map((param) => {
						return param.name;
					}).forEach((parameter) => {

						if (-1 >= path.indexOf("{" + parameter + "}")) {
							err = "\"" + parameter + "\" defined path parameter is not in the request path";
						}

					});

				}

			});

		});

	return err ? Promise.reject(new Error(err)) : Promise.resolve();

};
