"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkResponse (URL_API) {

	it("should test empty response", () => {

		return httpRequestTest(
			URL_API + "/empty-result", "post",
			null, 200,
			"OK"
		);

	});

	it("should test wrong response", () => {

		return httpRequestTest(
			URL_API + "/wrong-result", "post",
			null, 200,
			"OK", "test"
		);

	});

	describe("mime", () => {

		it("should test text/plain", () => {

			return httpRequestTest(
				URL_API + "/mime/text-plain", "get",
				null, 200,
				"OK", "test",
				"text/plain"
			);

		});

		it("should test text/html", () => {

			return httpRequestTest(
				URL_API + "/mime/text-html", "get",
				null, 200,
				"OK", "<!DOCTYPE html><html><body><h1>test</h1></body></html>",
				"text/html"
			);

		});

	});

};
