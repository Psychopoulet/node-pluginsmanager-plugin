"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractBodyParams = require(join(__dirname, "extractFromDescriptor", "extractBodyParams.js"));
		const checkExtractedParameters = require(join(__dirname, "checkExtractedParameters.js"));

// module

module.exports = function checkBodyParameters (parameters, docParameters, contentType, components) {

	// extract & formate body parameters from doc
	const paramsDoc = extractBodyParams(docParameters, contentType, components);
	const paramsKeys = Object.keys(parameters);

	// check missing params
	return Promise.resolve().then(() => {

		const missingParams = paramsDoc.filter((p) => {
			return p.required && !paramsKeys.includes(p.name);
		}).map((p) => {
			return p.name;
		});

		return missingParams.length ? Promise.reject(new ReferenceError(
			"Missing body parameters :" +
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
			"Not wanted body parameters :" +
			" [ \"" + notWantedParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check parameters types
	}).then(() => {

		return checkExtractedParameters(parameters, paramsDoc, "body");

	});

};
