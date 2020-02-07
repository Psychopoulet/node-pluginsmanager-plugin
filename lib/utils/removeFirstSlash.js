"use strict";

// module

module.exports = function removeFirstSlash (path) {
	return "string" === typeof path && "/" === path[0] ? path.substring(1, path.length) : String(path);
};
