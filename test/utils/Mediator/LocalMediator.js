// deps

    // natives
    const { join } = require("node:path");

    // locals
    const { Mediator } = require(join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs"));

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
