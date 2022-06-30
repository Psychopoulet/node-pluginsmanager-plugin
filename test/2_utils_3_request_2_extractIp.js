"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const extractIp = require(join(__dirname, "..", "lib", "cjs", "utils", "request", "extractIp.js"));

// tests

describe("utils / request / extractIp", () => {

	it("should test with missing data", () => {
		strictEqual(extractIp.default(), "", "generated data is not as expected");
	});

	it("should test with missing data", () => {
		strictEqual(extractIp.default({}), "", "generated data is not as expected");
	});

	it("should test with wrong data", () => {
		strictEqual(extractIp.default("test"), "", "generated data is not as expected");
	});

	it("should test with valid ip", () => {

		strictEqual(extractIp.default({
			"ip": "192.168.0.1"
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid \"x-forwarded-for\" headers", () => {

		strictEqual(extractIp.default({
			"headers": {
				"x-forwarded-for": "192.168.0.1"
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid \"remoteAddress\" socket", () => {

		strictEqual(extractIp.default({
			"socket": {
				"remoteAddress": "192.168.0.1"
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with missing data connection", () => {

		strictEqual(extractIp.default({
			"connection": {}
		}), "", "generated data is not as expected");

	});

	it("should test with valid \"remoteAddress\" connection", () => {

		strictEqual(extractIp.default({
			"connection": {
				"remoteAddress": "192.168.0.1"
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid \"remoteAddress\" connection socket", () => {

		strictEqual(extractIp.default({
			"connection": {
				"socket": {
					"remoteAddress": "192.168.0.1"
				}
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid mutli Ips", () => {

		strictEqual(extractIp.default({
			"ip": "::ffff:127.0.0.1"
		}), "127.0.0.1", "generated data is not as expected");

	});

	it("should test with valid localhost origin", () => {

		strictEqual(extractIp.default({
			"ip": "localhost"
		}), "127.0.0.1", "generated data is not as expected");

	});

	it("should test with valid ::1 origin", () => {

		strictEqual(extractIp.default({
			"ip": "::1"
		}), "127.0.0.1", "generated data is not as expected");

	});

});
