"use strict";

// deps

	// natives
	const { join } = require("path");
	const { writeFile } = require("fs");

	// locals
	const readJSONFile = require(join(__dirname, "..", "..", "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

// consts

	const DESCRIPTOR = join(__dirname, "..", "DescriptorUser", "Descriptor.json");

// module

// module

module.exports = function generateDescriptorWithSchemas (schemas, targetedFile, logs = false) {

	return readJSONFile.default(DESCRIPTOR).then((descriptor) => {

		return new Promise((resolve, reject) => {

			descriptor.paths = {};
			delete descriptor.components.parameters;
			descriptor.components.schemas = schemas;

			if (logs) {
				(0, console).log(JSON.stringify(descriptor));
			}

			writeFile(targetedFile, JSON.stringify(descriptor), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		});

	});

};
