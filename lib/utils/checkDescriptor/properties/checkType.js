"use strict";

// consts

	const ALLOWED = [ "string", "number", "integer", "boolean", "object", "array" ];

// module

module.exports = function checkType (path, method, name, type) {

	let err = null;

		if ("undefined" === typeof type) {

			err = new ReferenceError(
				"\"type\" property of \"" + name + "\" parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("string" !== typeof type) {

			err = new TypeError(
				"\"type\" property of \"" + name + "\" parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("" === type.trim()) {

			err = new RangeError(
				"\"type\" property of \"" + name + "\" parameter cannot be empty" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if (!ALLOWED.includes(type)) {

			err = new RangeError(
				"\"type\" property of \"" + name + "\" parameter is not in [" +
					" \"" + ALLOWED.join("\", \"") + "\"" +
				" ]  in the request path \"[" + method + "]" + path + "\""
			);

		}

	return err;

};
