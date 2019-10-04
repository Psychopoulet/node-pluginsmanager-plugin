"use strict";

// module

module.exports = function checkExtractedParameters (params, docParams) {

	let err = null;
	const result = {};

		for (let i = 0, paramsKeys = Object.keys(params); i < paramsKeys.length; ++i) {

			const val = params[paramsKeys[i]];

			const foundAt = docParams.findIndex((param) => {
				return param.name === paramsKeys[i];
			});

			switch (docParams[foundAt].type) {

				case "boolean":

					if ("boolean" === typeof val) {
						result[paramsKeys[i]] = val;
					}
					else if ("true" === val || "false" === val) {
						result[paramsKeys[i]] = "true" === val;
					}
					else {
						err = new TypeError("\"" + paramsKeys[i] + "\" url parameter is not a boolean");
					}

				break;

				case "integer":

					if (Number.isInteger(val)) {
						result[paramsKeys[i]] = val;
					}
					else {

						const parsed = parseInt(val, 10);

						if (!Number.isNaN(parsed)) {
							result[paramsKeys[i]] = parsed;
						}
						else {
							err = new TypeError("\"" + paramsKeys[i] + "\" url parameter is not an integer");
						}

					}

				break;

				case "number":

					if ("number" === typeof val) {
						result[paramsKeys[i]] = val;
					}
					else {

						const parsed = parseFloat(val);

						if (!Number.isNaN(parsed)) {
							result[paramsKeys[i]] = parsed;
						}
						else {
							err = new TypeError("\"" + paramsKeys[i] + "\" url parameter is not a number");
						}

					}

				break;

				default:
					result[paramsKeys[i]] = val;
				break;

			}

			if (err) {
				break;
			}

		}

	return err ? Promise.reject(err) : Promise.resolve(result);

};
