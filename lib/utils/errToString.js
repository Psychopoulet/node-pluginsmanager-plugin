"use strict";

// module

module.exports = function errToString (err) {

	if ("string" === typeof err) {
		return err;
	}
	else if ("object" === typeof err && err.message) {
		return err.message;
	}
	else {
		return "";
	}

};
