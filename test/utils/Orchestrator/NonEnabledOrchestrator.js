// deps

    // natives
    const { join } = require("node:path");

    // locals
    const LocalOrchestrator = require(join(__dirname, "LocalOrchestrator.js"));

// module

module.exports = class NonEnabledOrchestrator extends LocalOrchestrator {

    isEnable () {

        this.enabled = false;

        return Promise.resolve();

    }

};
