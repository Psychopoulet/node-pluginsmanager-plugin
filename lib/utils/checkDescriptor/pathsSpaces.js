"use strict";

// module

module.exports = function pathsSpaces (descriptor) {

	return Object.keys(descriptor.paths).filter((path) => {
		return -1 < path.indexOf(" ");
	}).length ? Promise.reject(new Error("Paths must not have spaces")) : Promise.resolve();

};
