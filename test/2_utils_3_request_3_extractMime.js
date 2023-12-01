"use strict";

// deps

	// natives
	const { deepStrictEqual, throws } = require("assert");
	const { join } = require("path");

	// locals
	const extractMime = require(join(__dirname, "..", "lib", "cjs", "utils", "request", "extractMime.js"));

// tests

describe("utils / request / extractMime", () => {

	describe("params", () => {

		it("should test with missing contentType", () => {

			throws(() => {
				extractMime.default();
			});

		});

		it("should test with missing code", () => {

			throws(() => {
				extractMime.default("application/json");
			});

		});

		it("should test with missing responses", () => {

			throws(() => {
				extractMime.default("application/json", 200);
			});

		});

		it("should test with missing valid response key", () => {

			throws(() => {
				extractMime.default("application/json", 200, null);
			});

		});

	});

	describe("execute", () => {

		it("should test with empty content-type request, unknown response key and without default response key", () => {

			deepStrictEqual(extractMime.default("", 200, {
				"300": {
					"content": {
						"application/json": {}
					}
				}
			}), "text/plain");

		});

		it("should test with unexpected empty response key", () => {

			deepStrictEqual(extractMime.default("", 200, {
				"200": {}
			}), "text/plain");

		});

		it("should test without response", () => {

			deepStrictEqual(extractMime.default("text/plain", 200, {}), "text/plain");

		});

		it("should test without content (PUT=>201)", () => {

			deepStrictEqual(extractMime.default("", 201, {}), "text/plain");

			deepStrictEqual(extractMime.default("text/html", 201, {}), "text/html");

			deepStrictEqual(extractMime.default("", 201, {
				"201": {}
			}), "text/plain");

			deepStrictEqual(extractMime.default("text/html", 201, {
				"201": {}
			}), "text/html");

			deepStrictEqual(extractMime.default("", 201, {
				"201": {
					"content": {}
				}
			}), "text/plain");

			deepStrictEqual(extractMime.default("text/html", 201, {
				"201": {
					"content": {}
				}
			}), "text/html");

		});

		it("should test without content (NOT PUT=>204)", () => {

			deepStrictEqual(extractMime.default("text/plain", 204, {
				"204": {
					"content": {}
				}
			}), "text/plain");

			deepStrictEqual(extractMime.default("", 204, {
				"204": {
					"content": {}
				}
			}), "text/plain");

		});

		it("should test with only one response key", () => {

			deepStrictEqual(extractMime.default("text/plain", 200, {
				"200": {
					"content": {
						"application/json": {}
					}
				}
			}), "application/json");

			deepStrictEqual(extractMime.default("text/plain", 200, {
				"default": {
					"content": {
						"application/json": {}
					}
				}
			}), "application/json");

		});

		it("should test with \"200\" response key", () => {

			deepStrictEqual(extractMime.default("application/json", 200, {
				"200": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				}
			}), "application/json");

		});

		it("should test with \"200\" response key with charset", () => {

			deepStrictEqual(extractMime.default("application/json; charset=utf8", 200, {
				"200": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				}
			}), "application/json; charset=utf8");

		});

		it("should test with \"default\" response key", () => {

			deepStrictEqual(extractMime.default("application/json", 200, {
				"300": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				},
				"default": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				}
			}), "application/json");

		});

		it("should test with empty content-type request", () => {

			deepStrictEqual(extractMime.default("", 200, {
				"200": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				}
			}), "text/plain");

		});

		it("should test with unknown response key", () => {

			deepStrictEqual(extractMime.default("text/css", 200, {
				"300": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				}
			}), "text/css");

			deepStrictEqual(extractMime.default("application/json", 200, {
				"300": {
					"content": {
						"application/json": {},
						"text/html": {}
					}
				}
			}), "application/json");

		});

	});

});
