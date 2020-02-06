"use strict";

// deps

	// natives
	const { deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { extractCookies } = require(join(__dirname, "..", "lib", "utils", "request", "main.js"));

// tests

describe("utils / request / extractCookies", () => {

	it("should test with missing data", () => {
		deepStrictEqual(extractCookies(), {}, "generated data is not as expected");
	});

	it("should test with wrong data", () => {
		deepStrictEqual(extractCookies("test"), {}, "generated data is not as expected");
	});

	it("should test with empty data", () => {
		deepStrictEqual(extractCookies({}), {}, "generated data is not as expected");
	});

	describe("cookies", () => {

		it("should test with missing data", () => {

			deepStrictEqual(extractCookies({
				"test": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			deepStrictEqual(extractCookies({
				"cookies": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with empty data", () => {

			deepStrictEqual(extractCookies({
				"cookies": {}
			}), {}, "generated data is not as expected");

		});

		it("should test with valid data", () => {

			deepStrictEqual(extractCookies({
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

			deepStrictEqual(extractCookies({
				"test": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			deepStrictEqual(extractCookies({
				"headers": "test"
			}), {}, "generated data is not as expected");

		});

		it("should test with empty data", () => {

			deepStrictEqual(extractCookies({
				"headers": {}
			}), {}, "generated data is not as expected");

		});

		it("should test with one cookie data", () => {

			deepStrictEqual(extractCookies({
				"headers": {
					"cookie": "test1=test1"
				}
			}), {
				"test1": "test1"
			}, "generated data is not as expected");

		});

		it("should test with two cookie data", () => {

			deepStrictEqual(extractCookies({
				"headers": {
					"cookie": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

		it("should test with cookie data", () => {

			deepStrictEqual(extractCookies({
				"headers": {
					"Cookie": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

		it("should test with cookies data", () => {

			deepStrictEqual(extractCookies({
				"headers": {
					"cookies": "test1=test1;test2=test2"
				}
			}), {
				"test1": "test1",
				"test2": "test2"
			}, "generated data is not as expected");

		});

		it("should test with Cookies data", () => {

			deepStrictEqual(extractCookies({
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
