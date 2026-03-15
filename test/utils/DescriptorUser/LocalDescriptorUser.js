// deps

    // natives
    const { join } = require("node:path");

    // locals
    const { DescriptorUser } = require(join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs"));

// module

module.exports = class LocalDescriptorUser extends DescriptorUser {

    constructor (options) {

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
