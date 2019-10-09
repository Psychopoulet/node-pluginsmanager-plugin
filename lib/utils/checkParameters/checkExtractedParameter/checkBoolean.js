"use strict";

// module

module.exports = function checkBoolean (key, val, docParam, type) {

	let err = null;
	let result = null;

		if ("boolean" === typeof val) {
			result = val;
		}
		else if ("true" === val || "false" === val) {
			result = "true" === val;
		}
		else {
			err = new TypeError("\"" + key + "\" " + type + " parameter is not a boolean");
		}

	return err instanceof Error ? err : result;

};
