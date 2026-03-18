// deps

    // natives
    const { join } = require("node:path");

    // locals
    const { Orchestrator } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// private

    function _getOrchestrator () {

        return new Orchestrator({
            "externalResourcesDirectory": "",
            "packageFile": "",
            "descriptorFile": "",
            "mediatorFile": "",
            "serverFile": ""
        });

    }

// tests

describe("Orchestrator / write", () => {

    describe("native", () => {

        it("should test install", () => {
            return _getOrchestrator().install();
        });

        it("should test update", () => {
            return _getOrchestrator().update();
        });

        it("should test uninstall", () => {
            return _getOrchestrator().uninstall();
        });

    });

    describe("inherited", () => {

        it("should test install", () => {
            return _getOrchestrator().install();
        });

        it("should test update", () => {
            return _getOrchestrator().update();
        });

        it("should test uninstall", () => {
            return _getOrchestrator().uninstall();
        });

    });

});
