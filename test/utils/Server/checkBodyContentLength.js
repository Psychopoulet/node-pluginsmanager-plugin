"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestWithWrongHeader = require(join(__dirname, "..", "..", "utils", "httpRequestWithWrongHeader.js"));

// module

module.exports = function checkBodyContentLength (URL_API) {

	describe("content-type", () => {

		it("should test request with missing data", () => {

			return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, null, 400, "Bad Request", {
				"code": "MISSING_HEADER",
				"message": "No \"Content-Type\" header found"
			});

		});

		it("should test request with wrong data", () => {

			return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, "test", 400, "Bad Request", {
				"code": "MISSING_HEADER",
				"message": "No \"Content-Type\" header found"
			});

		});

		it("should test request with missing content-length", () => {

			return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, {}, 400, "Bad Request", {
				"code": "MISSING_HEADER",
				"message": "No \"Content-Type\" header found"
			});

		});

	});

};
