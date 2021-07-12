"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkResponse (URL_API, checkResponseWanted) {

	it("should test wrong response", () => {

		return checkResponseWanted ? httpRequestTest("/node-pluginsmanager-plugin/api/wrong-result", "post", null, 200, "OK", "test") : Promise.resolve();

	});

};
