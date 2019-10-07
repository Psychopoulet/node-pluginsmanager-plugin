/*
	eslint max-statements: 0, complexity: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const checkParamsKeys = require(join(__dirname, "checkParamsKeys.js"));

// module

module.exports = function checkExtractedParameters (params, docParams, type) {

	let err = checkParamsKeys(params, docParams, type);
	if (err) {
		return err;
	}

	const result = {};

		for (let i = 0, paramsKeys = Object.keys(params); i < paramsKeys.length; ++i) {

			const val = params[paramsKeys[i]];

			const docParam = docParams.find((param) => {
				return param.name === paramsKeys[i];
			});

			switch (docParam.type) {

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

					if (!err && "number" === typeof docParam.min && result[paramsKeys[i]] < docParam.min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" higher or equals to " + docParam.min
						);

					}

					if (!err && "number" === typeof docParam.max && result[paramsKeys[i]] > docParam.max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" lower or equals to " + docParam.max
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

					if (!err && "number" === typeof docParam.min && result[paramsKeys[i]] < docParam.min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" higher or equals to " + docParam.min
						);

					}

					if (!err && "number" === typeof docParam.max && result[paramsKeys[i]] > docParam.max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter must be" +
							" lower or equals to " + docParam.max
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

					if (!err && "number" === typeof docParam.min && result[paramsKeys[i]].length < docParam.min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" higher or equals to " + docParam.min
						);

					}

					if (!err && "number" === typeof docParam.max && result[paramsKeys[i]].length > docParam.max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" lower or equals to " + docParam.max
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

					if (!err && "number" === typeof docParam.min && result[paramsKeys[i]].length < docParam.min) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" higher or equals to " + docParam.min
						);

					}

					if (!err && "number" === typeof docParam.max && result[paramsKeys[i]].length > docParam.max) {

						err = new RangeError(
							"\"" + paramsKeys[i] + "\" " + type + " parameter length must be" +
							" lower or equals to " + docParam.max
						);

					}

				break;

				case "object":

					if ("object" === typeof val) {

						const res = checkExtractedParameters(val, docParam.properties, type);

						if (res instanceof Error) {
							err = res;
						}
						else {
							result[paramsKeys[i]] = res;
						}

					}
					else {
						err = new TypeError("\"" + paramsKeys[i] + "\" " + type + " parameter is not an object");
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

	return err instanceof Error ? err : result;

};
