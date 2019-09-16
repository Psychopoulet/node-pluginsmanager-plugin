"use strict";

// module

module.exports = function pathsStart (descriptor) {

	return Promise.resolve().then(() => {

		let err = null;

			for (let i = 0, paths = Object.keys(descriptor.paths); i < paths.length; ++i) {

				const path = paths[i];

				if ("/" !== path[0]) {

					err = new Error(
						"The path must start with a slash" +
						" in the request path \"" + path + "\""
					);

					break;

				}
				else {

					const [ firstPath ] = path.substr(1, path.length).split("/");

					if (firstPath !== descriptor.info.title) {

						err = new Error(
							"The path must start with the descriptor title (\"/" + descriptor.info.title + "\")" +
							" in the request path \"" + path + "\""
						);

						break;

					}

				}

			}

		return err ? Promise.reject(err) : Promise.resolve();

	});

};
