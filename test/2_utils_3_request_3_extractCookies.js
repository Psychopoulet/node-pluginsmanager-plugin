"use strict";

// deps

	// natives
	const { deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const extractCookies = require(join(__dirname, "..", "lib", "cjs", "utils", "request", "extractCookies.js"));

// tests

describe("utils / request / extractCookies", () => {

	it("should test with missing data", () => {
		deepStrictEqual(extractCookies.default(), {}, "generated data is not as expected");
	});

	it("should test with wrong data", () => {
		deepStrictEqual(extractCookies.default("test"), {}, "generated data is not as expected");
	});

	it("should test with empty data", () => {
		deepStrictEqual(extractCookies.default({}), {}, "generated data is not as expected");
	});

	describe("cookies", () => {

		it("should test with missing data", () => {

			deepStrictEqual(extractCookies.default({
				"test": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			deepStrictEqual(extractCookies.default({
				"cookies": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with empty data", () => {

			deepStrictEqual(extractCookies.default({
				"cookies": {}
			}), {}, "generated data is not as expected");

		});

		it("should test with valid data", () => {

			deepStrictEqual(extractCookies.default({
				"cookies": {
					"test": "test2"
				}
			}), {
				"test": "test2"
			}, "generated data is not as expected");

		});

	});

	describe("headers", () => {

		it("should test with missing data", () => {

			deepStrictEqual(extractCookies.default({
				"test": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with empty data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {}
			}), {}, "generated data is not as expected");

		});

		it("should test with wrong cookie data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {
					"cookie": true
				}
			}), {}, "generated data is not as expected");

		});

		it("should test with one cookie data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {
					"cookie": "test1=test1"
				}
			}), {
				"test1": "test1"
			}, "generated data is not as expected");

		});

		it("should test with two cookie data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {
					"cookie": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

		it("should test with cookie data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {
					"Cookie": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

		it("should test with cookies data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {
					"cookies": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

		it("should test with Cookies data", () => {

			deepStrictEqual(extractCookies.default({
				"headers": {
					"Cookies": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

	});

});
