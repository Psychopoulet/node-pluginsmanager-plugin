"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const infos = require(join(__dirname, "..", "checkDescriptor", "infos.js"));
	const multiplesOperationId = require(join(__dirname, "..", "checkDescriptor", "multiplesOperationId.js"));
	const parameters = require(join(__dirname, "..", "checkDescriptor", "parameters.js"));

// module

module.exports = {
	"checkDescriptorInfos": infos,
	"checkDescriptorMultiplesOperationId": multiplesOperationId,
	"checkDescriptorParameters": parameters
};
