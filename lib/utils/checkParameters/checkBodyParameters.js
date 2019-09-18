"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractBodyParams = require(join(__dirname, "..", "extractFromDescriptor", "extractBodyParams.js"));

// module

module.exports = function checkBodyParameters (params, docParameters, contentType) {

	// console.log("");
	// console.log("checkBodyParameters");
	// console.log("params", params);
	// console.log("docParameters", docParameters);
	// console.log("contentType", contentType);

	// extract & formate body parameters from doc
	const bodyParamsDoc = extractBodyParams(docParameters, contentType);
	// console.log("bodyParamsDoc", bodyParamsDoc);

	const paramsKeys = Object.keys(params);
	const paramsDocKeys = bodyParamsDoc.map((p) => {
		return p.name;
	});
	// console.log("paramsDocKeys", paramsDocKeys);

	// check missing params
	return Promise.resolve().then(() => {

		const missingParams = paramsDocKeys.filter((p) => {
			return !paramsKeys.includes(p);
		});
		// console.log("missingParams", missingParams);

		return missingParams.length ? Promise.reject(new ReferenceError(
			"Missing body parameters :" +
			" [ \"" + missingParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check unexpected params
	}).then(() => {

		const notWantedParams = paramsKeys.filter((p) => {
			return !paramsDocKeys.includes(p);
		});
		// console.log("notWantedParams", notWantedParams);

		return notWantedParams.length ? Promise.reject(new ReferenceError(
			"Not wanted body parameters :" +
			" [ \"" + notWantedParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	});

};
