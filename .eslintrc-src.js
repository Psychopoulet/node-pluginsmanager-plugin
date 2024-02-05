module.exports = {

    "extends": [ "plugin:eslint-plugin-personnallinter/ts-back" ],

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

};