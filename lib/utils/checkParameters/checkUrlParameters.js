"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractUrlParams = require(join(__dirname, "extractFromDescriptor", "extractUrlParams.js"));
		const checkExtractedParameters = require(join(__dirname, "checkExtractedParameters.js"));

// module

module.exports = function checkUrlParameters (parameters, docParameters, components) {

	// extract & formate url parameters from doc
	const paramsDoc = extractUrlParams(docParameters, components);
	const paramsKeys = Object.keys(parameters);

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

	// check parameters types
	}).then(() => {

		return checkExtractedParameters(parameters, paramsDoc, "url");

	});

};
