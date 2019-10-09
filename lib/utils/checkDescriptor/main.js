"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const infos = require(join(__dirname, "..", "checkDescriptor", "infos.js"));
	const paths = require(join(__dirname, "..", "checkDescriptor", "parameters.js"));

// module

module.exports = {
	"checkDescriptorInfos": infos,
	"checkDescriptorPaths": paths
};
