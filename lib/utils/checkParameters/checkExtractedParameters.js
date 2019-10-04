/*
	eslint max-statements: 0, complexity: 0
*/

"use strict";

// module

module.exports = function checkExtractedParameters (params, docParams, type) {

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
						err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not a boolean");
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
							err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not an integer");
						}

					}

					if (docParams[foundAt].min && result[paramsKeys[i]] < docParams[foundAt].min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" higher or equals to " + docParams[foundAt].min
						);

					}

					if (docParams[foundAt].max && result[paramsKeys[i]] > docParams[foundAt].max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" lower or equals to " + docParams[foundAt].min
						);

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
							err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not a number");
						}

					}

					if (docParams[foundAt].min && result[paramsKeys[i]] < docParams[foundAt].min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" higher or equals to " + docParams[foundAt].min
						);

					}

					if (docParams[foundAt].max && result[paramsKeys[i]] > docParams[foundAt].max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" lower or equals to " + docParams[foundAt].min
						);

					}

				break;

				case "string":

					if ("string" === typeof val) {
						result[paramsKeys[i]] = val;
					}
					else {
						err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not a string");
					}

					if (docParams[foundAt].min && result[paramsKeys[i]].length < docParams[foundAt].min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" higher or equals to " + docParams[foundAt].min
						);

					}

					if (docParams[foundAt].max && result[paramsKeys[i]].length > docParams[foundAt].max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" lower or equals to " + docParams[foundAt].min
						);

					}

				break;

				case "array":

					if ("object" === typeof val && val instanceof Array) {
						result[paramsKeys[i]] = val;
					}
					else {
						err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not an Array");
					}

					if (docParams[foundAt].min && result[paramsKeys[i]].length < docParams[foundAt].min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" higher or equals to " + docParams[foundAt].min
						);

					}

					if (docParams[foundAt].max && result[paramsKeys[i]].length > docParams[foundAt].max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" lower or equals to " + docParams[foundAt].min
						);

					}

				break;

				case "object":

					/*
					console.log("");
					console.log("");
					console.log("");

					console.log("params", params);
					console.log("docParams", docParams);

					console.log("");
					console.log("");

					console.log("val", val);
					console.log("docParams[foundAt]", docParams[foundAt]);

					console.log("");
					console.log("");
					console.log("");
					*/

					if ("object" === typeof val) {
						result[paramsKeys[i]] = val;
					}
					else {
						err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not an object");
					}

				break;

				default:
					err = new RangeError("\"" + paramsKeys[i] + "\" " + type + " parameter has an unsupported type");
				break;

			}

			if (err) {
				break;
			}

		}

	return err ? Promise.reject(err) : Promise.resolve(result);

};
