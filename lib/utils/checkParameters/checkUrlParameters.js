"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractUrlParams = require(join(__dirname, "..", "extractFromDescriptor", "extractUrlParams.js"));

// module

module.exports = function checkUrlParameters (params, docParameters, docParametersComponents) {

	// console.log("");
	// console.log("checkUrlParameters");
	// console.log("params", params);
	// console.log("docParameters", docParameters);
	// console.log("docParametersComponents", docParametersComponents);

	// extract & formate url parameters from doc
	const paramsDoc = extractUrlParams(docParameters, docParametersComponents);
	// console.log("paramsDoc", paramsDoc);

	const paramsKeys = Object.keys(params);
	// console.log("paramsKeys", paramsKeys);

	// check missing params
	return Promise.resolve().then(() => {

		const missingParams = paramsDoc.filter((param) => {
			return param.required && !paramsKeys.includes(param.name);
		}).map((param) => {
			return param.name;
		});
		// console.log("missingParams", missingParams);

		return missingParams.length ? Promise.reject(new ReferenceError(
			"Missing url parameters :" +
			" [ \"" + missingParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check unexpected params
	}).then(() => {

		const paramsDocKeys = paramsDoc.map((p) => {
			return p.name;
		});
		// console.log("paramsDocKeys", paramsDocKeys);

		const notWantedParams = paramsKeys.filter((param) => {
			return !paramsDocKeys.includes(param);
		});
		// console.log("notWantedParams", notWantedParams);

		return notWantedParams.length ? Promise.reject(new ReferenceError(
			"Not wanted url parameters :" +
			" [ \"" + notWantedParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check params types
	}).then(() => {

		let err = null;
		const result = {};

			for (let i = 0; i < paramsKeys.length; ++i) {

				const val = params[paramsKeys[i]];

				const foundAt = paramsDoc.findIndex((param) => {
					return param.name === paramsKeys[i];
				});

				// console.log(paramsKeys[i], "must be a", paramsDoc[foundAt].type, "(" + val + ")");

				switch (paramsDoc[foundAt].type) {

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
					case "float":

						if ("number" === typeof val) {
							result[paramsKeys[i]] = val;
						}
						else {

							const parsed = parseFloat(val);

							if (!Number.isNaN(parsed)) {
								result[paramsKeys[i]] = parsed;
							}
							else {
								err = new TypeError("\"" + paramsKeys[i] + "\" url parameter is not a float/number");
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

			// console.log("result", result);

		return err ? Promise.reject(err) : Promise.resolve(result);

	});

};
