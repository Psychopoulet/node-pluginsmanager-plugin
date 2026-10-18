// deps

    // natives
    const { join } = require("node:path");

    // locals
    const MAIN = (0, process).env.PLUGIN_COMPILED_MAIN
        ? join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs")
        : join(__dirname, "..", "..", "..", "lib", "src", "main.cts");
    const { Mediator } = require(MAIN);

// module

module.exports = class LocalMediator extends Mediator {

    constructor (options = {}) {

        super({
            "externalResourcesDirectory": "",
            ...options
        });

    }

    _initWorkSpace () {

        return Promise.resolve();

    }

    _releaseWorkSpace () {

        return Promise.resolve();

    }

};
