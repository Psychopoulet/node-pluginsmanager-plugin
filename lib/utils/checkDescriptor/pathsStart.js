"use strict";

// module

module.exports = function pathsStart (descriptor) {

	let err = "";

		Object.keys(descriptor.paths).map((path) => {
			return "/" === path[0] ? path.substr(1, path.length) : path;
		}).map((path) => {
			return path.split("/")[0] || "";
		}).forEach((firstPath) => {

			if (!firstPath || firstPath !== descriptor.info.title) {
				err = "All paths must start with descriptor title (\"/" + descriptor.info.title + "\")";
			}

		});

	return err ? Promise.reject(new Error(err)) : Promise.resolve();

};
