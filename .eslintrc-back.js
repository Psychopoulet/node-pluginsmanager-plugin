// deps

    // externals
    const { defineConfig } = require("eslint/config");
    const personnallinter = require("eslint-plugin-personnallinter");

// module

module.exports = defineConfig({

    "plugins": {
        personnallinter
    },
    "extends": [ personnallinter.configs["ts-back"] ],

    "rules": {

        // specific to this package
        "n/no-sync": "off",

        // API stuff
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off"

    }

});
