"use strict";

// module

module.exports = function pathsStart (descriptor) {

	if (Object.keys(descriptor.paths).filter((path) => {
		return "/" !== path[0];
	}).length) {
		return Promise.reject(new Error("All paths must start with a slash"));
	}
	else {

		return Object.keys(descriptor.paths).map((path) => {
			return path.substr(1, path.length); // remove first slash
		}).map((path) => {
			return path.split("/")[0]; // get first part of the path
		}).filter((firstPath) => {
			return !firstPath || firstPath !== descriptor.info.title; // first part of the path must be equal to descriptor.info.title
		}).length ? Promise.reject(new Error(
			"All paths must start with a slash and descriptor title (\"/" + descriptor.info.title + "\")"
		)) : Promise.resolve();

	}

};
