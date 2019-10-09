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

		return descriptor.info.title !== descriptor.info.title.toLowerCase() ? Promise.reject(new Error(
			"Info title of descriptor (\"" + descriptor.info.title + "\") must be in lower case (package.json convention)"
		)) : Promise.resolve();

	}).then(() => {
		return checkNonEmptyString("Descriptor.info.version", descriptor.info.version);
	});

};
