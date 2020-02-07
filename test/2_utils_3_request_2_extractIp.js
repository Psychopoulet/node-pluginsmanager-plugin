"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { extractIp } = require(join(__dirname, "..", "lib", "utils", "request", "main.js"));

// tests

describe("utils / request / extractIp", () => {

	it("should test with missing data", () => {
		strictEqual(extractIp(), "", "generated data is not as expected");
	});

	it("should test with missing data", () => {
		strictEqual(extractIp({}), "", "generated data is not as expected");
	});

	it("should test with wrong data", () => {
		strictEqual(extractIp("test"), "", "generated data is not as expected");
	});

	it("should test with valid ip", () => {

		strictEqual(extractIp({
			"ip": "192.168.0.1"
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid \"x-forwarded-for\" headers", () => {

		strictEqual(extractIp({
			"headers": {
				"x-forwarded-for": "192.168.0.1"
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid \"remoteAddress\" socket", () => {

		strictEqual(extractIp({
			"socket": {
				"remoteAddress": "192.168.0.1"
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with missing data connection", () => {

		strictEqual(extractIp({
			"connection": {}
		}), "", "generated data is not as expected");

	});

	it("should test with valid \"remoteAddress\" connection", () => {

		strictEqual(extractIp({
			"connection": {
				"remoteAddress": "192.168.0.1"
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid \"remoteAddress\" connection socket", () => {

		strictEqual(extractIp({
			"connection": {
				"socket": {
					"remoteAddress": "192.168.0.1"
				}
			}
		}), "192.168.0.1", "generated data is not as expected");

	});

	it("should test with valid mutli Ips", () => {

		strictEqual(extractIp({
			"ip": "::ffff:127.0.0.1"
		}), "127.0.0.1", "generated data is not as expected");

	});

	it("should test with valid localhost origin", () => {

		strictEqual(extractIp({
			"ip": "localhost"
		}), "127.0.0.1", "generated data is not as expected");

	});

	it("should test with valid ::1 origin", () => {

		strictEqual(extractIp({
			"ip": "::1"
		}), "127.0.0.1", "generated data is not as expected");

	});

});
