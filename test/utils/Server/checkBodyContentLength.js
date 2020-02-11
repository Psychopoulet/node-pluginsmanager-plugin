"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// utils
		const httpRequestWithWrongHeader = require(join(__dirname, "..", "..", "utils", "httpRequestWithWrongHeader.js"));

// module

module.exports = function checkBodyContentType (URL_API) {

	describe("content-length", () => {

		it("should test request with missing data", () => {

			return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, {
				"Content-Type": "application/json"
			}, 411, "Length Required", {
				"code": "MISSING_HEADER",
				"message": "No valid \"Content-Length\" header found"
			});

		});

		// must crash request body parsing
		it("should test request with wrong content-length", (done) => {

			httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, {
				"Content-Type": "application/json",
				"Content-Length": "test"
			}, 411, "Length Required").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "generated error is not as expected");
				strictEqual(err instanceof Error, true, "generated error is not as expected");

				done();

			});

		});

		// must interrupt request body parsing before the end and generate a socket error
		it("should test request with inexact content-length", (done) => {

			httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, {
				"Content-Type": "application/json",
				"Content-Length": 2
			}, 411, "Length Required").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "generated error is not as expected");
				strictEqual(err instanceof Error, true, "generated error is not as expected");

				done();

			});

		});

		it("should test valid request", () => {

			const params = {
				"body-param": "test"
			};

			return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", params, {
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(JSON.stringify(params))
			}, 201, "Created");

		});

	});

};
