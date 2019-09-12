"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// tests

describe("Orchestrator / write", () => {

	it("should test install", () => {
		return new LocalOrchestrator().install();
	});

	it("should test update", () => {
		return new LocalOrchestrator().update();
	});

	it("should test uninstall", () => {
		return new LocalOrchestrator().uninstall();
	});

});
