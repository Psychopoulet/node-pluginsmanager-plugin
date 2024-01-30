module.exports = {
    "extends": [ "plugin:eslint-plugin-personnallinter/ts-back" ],
    "rules": {
        "n/no-sync": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn"
    }
};