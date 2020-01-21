"use strict";

// module

module.exports = function extractPath (paths, pathname) {

	// no paths in this Descriptor
	if ("object" !== typeof paths || null === paths) {
		return "";
	}
	else {

		const path = "undefined" !== typeof paths[pathname] ? pathname : "";

		// pathname without path parameters
		if (path) {
			return path;
		}

		// pathname with path parameters
		else {

			const pathnamePaths = pathname.substr(1, pathname.length).split("/");

			return Object.keys(paths).find((p) => {

				const pathPaths = p.split("/").filter((d) => {
					return "" !== d;
				});

				if (pathPaths.length !== pathnamePaths.length) {
					return false;
				}
				else {

					for (let i = 0; i < pathPaths.length; ++i) {

						if (pathPaths[i] !== pathnamePaths[i] && !pathPaths[i].includes("{")) {
							return false;
						}

					}

					return true;

				}

			}) || "";

		}

	}

};
