"use strict";

// module

module.exports = function pathsSpaces (descriptor) {

	return Promise.resolve().then(() => {

		let err = null;

			for (let i = 0, paths = Object.keys(descriptor.paths); i < paths.length; ++i) {

				if (paths[i].includes(" ")) {

					err = new Error(
						"There must be no space" +
						" in the request path \"" + paths[i] + "\""
					);

					break;

				}

			}

		return err ? Promise.reject(err) : Promise.resolve();

	});

};
