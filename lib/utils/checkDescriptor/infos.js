"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkObject,
		checkNonEmptyString
	} = require(join(__dirname, "..", "..", "checkers", "main.js"));

// module

module.exports = function infos (descriptor) {

	return checkObject("Descriptor.info", descriptor.info).then(() => {
		return checkNonEmptyString("Descriptor.info.title", descriptor.info.title);
	}).then(() => {
		return checkNonEmptyString("Descriptor.info.version", descriptor.info.version);
	});

};
