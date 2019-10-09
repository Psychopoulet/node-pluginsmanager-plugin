"use strict";

// module

module.exports = function checkInteger (key, val, docParam, type) {

	let err = null;
	let result = null;

		if (Number.isInteger(val)) {
			result = val;
		}
		else if ("string" === typeof val) {

			const parsed = parseInt(val, 10);

			if (!Number.isNaN(parsed)) {
				result = parsed;
			}
			else {
				err = new TypeError("\"" + key + "\" " + type + " parameter is not an integer");
			}

		}
		else {
			err = new TypeError("\"" + key + "\" " + type + " parameter is not an integer");
		}

		if (!err && "number" === typeof docParam.min && result < docParam.min) {

			err = new RangeError(
				"\"" + key + "\" " + type + " parameter must be" +
				" higher or equals to " + docParam.min
			);

		}

		if (!err && "number" === typeof docParam.max && result > docParam.max) {

			err = new RangeError(
				"\"" + key + "\" " + type + " parameter must be" +
				" lower or equals to " + docParam.max
			);

		}

	return err instanceof Error ? err : result;

};
