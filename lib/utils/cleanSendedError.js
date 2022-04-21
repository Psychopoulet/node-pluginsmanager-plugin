"use strict";

// module

module.exports = function cleanSendedError (data) {

	if ("object" === typeof data) {

		if (data instanceof Error) {
			return data.message ? data.message : data;
		}
		else if (data.message && data.message instanceof Error) {

			data.message = data.message.message ? data.message.message : data.message;

			return data;

		}
		else if (data.error) { // 1 level recursive for "error" data (avoid too deep recursive analyse)

			if (data.error instanceof Error) {
				data.error = data.error.message ? data.error.message : data.error;
			}
			else if (data.error.message && data.error.message instanceof Error) {
				data.error.message = data.error.message.message ? data.error.message.message : data.error.message;
			}

			return data;

		}
		else if (data.err && data.err instanceof Error) { // 1 level recursive for "err" data (avoid too deep recursive analyse)

			data.err = data.err.message ? data.err.message : data.err;

			return data;

		}
		else {
			return data;
		}

	}
	else {
		return data;
	}

};
