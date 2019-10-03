"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractUrlParams = require(join(__dirname, "extractFromDescriptor", "extractUrlParams.js"));

// module

module.exports = function checkUrlParameters (params, docParameters, components) {

	// extract & formate url parameters from doc
	const paramsDoc = extractUrlParams(docParameters, components);
	const paramsKeys = Object.keys(params);

	// check missing params
	return Promise.resolve().then(() => {

		const missingParams = paramsDoc.filter((p) => {
			return p.required && !paramsKeys.includes(p.name);
		}).map((p) => {
			return p.name;
		});

		return missingParams.length ? Promise.reject(new ReferenceError(
			"Missing url parameters :" +
			" [ \"" + missingParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check unexpected params
	}).then(() => {

		const paramsDocKeys = paramsDoc.map((p) => {
			return p.name;
		});

		const notWantedParams = paramsKeys.filter((p) => {
			return !paramsDocKeys.includes(p);
		});

		return notWantedParams.length ? Promise.reject(new ReferenceError(
			"Not wanted url parameters :" +
			" [ \"" + notWantedParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check params types
	}).then(() => {

		// @TODO factorize with body

		let err = null;
		const result = {};

			for (let i = 0; i < paramsKeys.length; ++i) {

				const val = params[paramsKeys[i]];

				const foundAt = paramsDoc.findIndex((param) => {
					return param.name === paramsKeys[i];
				});

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

	});

};
