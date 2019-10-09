"use strict";

// module

module.exports = function checkString (key, val, docParam, type) {

	let err = null;
	let result = null;

		if ("string" === typeof val) {
			result = val;
		}
		else {
			err = new TypeError("\"" + key + "\" " + type + " parameter is not a string");
		}

		if (!err && "number" === typeof docParam.min && result.length < docParam.min) {

			err = new RangeError(
				"\"" + key + "\" " + type + " parameter length must be" +
				" higher or equals to " + docParam.min
			);

		}

		if (!err && "number" === typeof docParam.max && result.length > docParam.max) {

			err = new RangeError(
				"\"" + key + "\" " + type + " parameter length must be" +
				" lower or equals to " + docParam.max
			);

		}

	return err instanceof Error ? err : result;

};
