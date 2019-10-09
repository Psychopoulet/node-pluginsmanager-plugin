"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Orchestrator = require(join(__dirname, "..", "lib", "components", "Orchestrator.js"));
	const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// tests

describe("Orchestrator / write", () => {

	describe("native", () => {

		it("should test install", () => {
			return new Orchestrator().install();
		});

		it("should test update", () => {
			return new Orchestrator().update();
		});

		it("should test uninstall", () => {
			return new Orchestrator().uninstall();
		});

	});

	describe("inherited", () => {

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

});
