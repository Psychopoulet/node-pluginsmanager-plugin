// deps

    // natives
    const { join } = require("node:path");

    // locals
    const { MediatorUser } = require(join(__dirname, "..", "..", "..", "lib", "src", "main.cts"));

// module

module.exports = class LocalMediatorUser extends MediatorUser {

    constructor (options = {}) {

        super({
            "externalResourcesDirectory": "",
            ...options
        });

    }

    init () {

        return Promise.resolve();

    }

    release () {

        this.removeAllListeners();

        return Promise.resolve();

    }

};
