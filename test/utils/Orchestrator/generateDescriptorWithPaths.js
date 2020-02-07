"use strict";

// deps

	// natives
	const { join } = require("path");
	const { writeFile } = require("fs");

	// locals
	const { readJSONFile } = require(join(__dirname, "..", "..", "..", "lib", "utils", "file", "main.js"));

// consts

	const DESCRIPTOR = join(__dirname, "..", "DescriptorUser", "Descriptor.json");

// module

// module

module.exports = function generateTmpDescriptorWithPaths (paths, targetedFile, logs = false) {

	return readJSONFile(DESCRIPTOR).then((descriptor) => {

		return new Promise((resolve, reject) => {

			descriptor.paths = paths;

			if (logs) {
				(0, console).log(JSON.stringify(descriptor));
			}

			writeFile(targetedFile, JSON.stringify(descriptor), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		});

	});

};
