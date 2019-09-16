"use strict";

// consts

	const ALLOWED = [ "query", "header", "path", "cookie" ];

// module

module.exports = function pathsParametersIn (descriptor) {

	return Promise.resolve().then(() => {

		let err = null;

			Object.keys(descriptor.paths).forEach((path) => {

				Object.keys(descriptor.paths[path]).filter((method) => {
					return descriptor.paths[path][method].parameters;
				}).forEach((method) => {

					descriptor.paths[path][method].parameters.forEach((param) => {

						if (!ALLOWED.includes(param.in)) {

							err = new ReferenceError(
								"\"in\" property of \"" + param.name + "\" parameter is not in [ \"" + ALLOWED.join("\", \"") + "\" ]" +
								" in the request path \"[" + method + "]" + path + "\""
							);

						}
						else if ("path" === param.in && !path.includes("{" + param.name + "}")) {

							err = new ReferenceError(
								"\"in\" property of \"" + param.name + "\" parameter is not in the path" +
								" in the request path \"[" + method + "]" + path + "\""
							);

						}

					});

				});

			});

		return err ? Promise.reject(err) : Promise.resolve();

	});

};
