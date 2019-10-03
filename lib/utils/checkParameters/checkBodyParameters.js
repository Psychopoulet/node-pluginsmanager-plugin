"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractBodyParams = require(join(__dirname, "extractFromDescriptor", "extractBodyParams.js"));

// module

module.exports = function checkBodyParameters (params, docParameters, contentType) {

	// console.log("");
	// console.log("checkBodyParameters");
	// console.log("params", params);
	// console.log("docParameters", docParameters);
	// console.log("contentType", contentType);

	// extract & formate body parameters from doc
	const paramsDoc = extractBodyParams(docParameters, contentType);
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
			"Missing body parameters :" +
			" [ \"" + missingParams.join("\", \"") + "\" ]"
		)) : Promise.resolve();

	// check unexpected params
	}).then(() => {

		const paramsDocKeys = paramsDoc.map((p) => {
			return p.name;
		});
		// console.log("paramsDocKeys", paramsDocKeys);

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
