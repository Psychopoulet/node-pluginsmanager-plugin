"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const infos = require(join(__dirname, "..", "checkDescriptor", "infos.js"));
	const pathsSpaces = require(join(__dirname, "..", "checkDescriptor", "pathsSpaces.js"));
	const pathsStart = require(join(__dirname, "..", "checkDescriptor", "pathsStart.js"));
	const multiplesOperationId = require(join(__dirname, "..", "checkDescriptor", "multiplesOperationId.js"));
	const parameters = require(join(__dirname, "..", "checkDescriptor", "parameters.js"));

// module

module.exports = {
	"checkDescriptorInfos": infos,
	"checkDescriptorPathsSpaces": pathsSpaces,
	"checkDescriptorPathsStart": pathsStart,
	"checkDescriptorMultiplesOperationId": multiplesOperationId,
	"checkDescriptorParameters": parameters
};
