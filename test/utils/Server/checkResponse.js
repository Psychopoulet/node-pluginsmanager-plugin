"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkResponse (URL_API) {

	it("should test wrong response", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/api/wrong-result", "post", null, 200, "OK", "test");

	});

};
