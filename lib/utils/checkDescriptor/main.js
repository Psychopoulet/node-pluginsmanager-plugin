"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const infos = require(join(__dirname, "..", "checkDescriptor", "infos.js"));
	const pathsSpaces = require(join(__dirname, "..", "checkDescriptor", "pathsSpaces.js"));
	const pathsStart = require(join(__dirname, "..", "checkDescriptor", "pathsStart.js"));
	const pathsParameters = require(join(__dirname, "..", "checkDescriptor", "pathsParameters.js"));
	const pathsParametersIn = require(join(__dirname, "..", "checkDescriptor", "pathsParametersIn.js"));
	const multiplesOperationId = require(join(__dirname, "..", "checkDescriptor", "multiplesOperationId.js"));
	const multiplesParameters = require(join(__dirname, "..", "checkDescriptor", "multiplesParameters.js"));

// module

module.exports = {
	"checkDescriptorInfos": infos,
	"checkDescriptorPathsSpaces": pathsSpaces,
	"checkDescriptorPathsStart": pathsStart,
	"checkDescriptorPathsParameters": pathsParameters,
	"checkDescriptorPathsParametersIn": pathsParametersIn,
	"checkDescriptorMultiplesOperationId": multiplesOperationId,
	"checkDescriptorMultiplesParameters": multiplesParameters
};
