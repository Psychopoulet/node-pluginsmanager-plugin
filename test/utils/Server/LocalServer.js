// deps

    // natives
    const { join } = require("path");

    // locals
    const MAIN = (0, process).env.PLUGIN_COMPILED_MAIN
        ? join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs")
        : join(__dirname, "..", "..", "..", "lib", "src", "main.cts");
    const { Server } = require(MAIN);

// module

module.exports = class LocalServer extends Server {

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
