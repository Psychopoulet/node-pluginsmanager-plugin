// deps

    // natives
    const { join } = require("node:path");

    // locals
    const { DescriptorUser } = require(join(__dirname, "..", "..", "..", "lib", "src", "main.cts"));

// module

module.exports = class LocalDescriptorUser extends DescriptorUser {

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

    init () {

        return Promise.resolve();

    }

    release () {

        this.removeAllListeners();

        return Promise.resolve();

    }

};
