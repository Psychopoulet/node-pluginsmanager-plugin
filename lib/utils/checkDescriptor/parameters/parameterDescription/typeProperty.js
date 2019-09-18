"use strict";

// consts

	const ALLOWED = [ "string", "number", "integer", "float", "boolean" ];

// module

module.exports = function typeProperty (path, method, parameter) {

	let err = null;

		if ("undefined" === typeof parameter.schema) {

			err = new ReferenceError(
				"\"schema\" property of \"" + parameter.name + "\" parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("object" !== typeof parameter.schema) {

			err = new TypeError(
				"\"schema\" property of \"" + parameter.name + "\" parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

			else if ("undefined" === typeof parameter.schema.type) {

				err = new ReferenceError(
					"\"schema.type\" property of \"" + parameter.name + "\" parameter is missing" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else if ("string" !== typeof parameter.schema.type) {

				err = new TypeError(
					"\"schema.type\" property of \"" + parameter.name + "\" parameter must be a string" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else if ("" === parameter.schema.type.trim()) {

				err = new RangeError(
					"\"schema.type\" property of \"" + parameter.name + "\" parameter is empty" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else if (!ALLOWED.includes(parameter.schema.type)) {

				err = new RangeError(
					"\"schema.type\" property of \"" + parameter.name + "\" parameter is not in [ \"" + ALLOWED.join("\", \"") + "\" ]" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}

	return err;

};
