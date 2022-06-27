"use strict";

// module

export default function cleanSendedError (data: any): string {

	if ("object" === typeof data) {

		if (data instanceof Error) {
			return data.message;
		}
		else if (data.message) {
			return data.message instanceof Error ? data.message.message : data.message;
		}
		else if (data.error) { // 1 level recursive for "error" data (avoid too deep recursive analyse)

			if (data.error instanceof Error) {
				return data.error.message;
			}
			else if (data.error.message) {
				return data.error.message instanceof Error ? data.error.message.message : data.error.message;
			}
			else {
				return data.error;
			}

		}
		else if (data.err) { // 1 level recursive for "err" data (avoid too deep recursive analyse)
			return data.err instanceof Error ? data.err.message : data.err;
		}
		else {
			return String(data);
		}

	}
	else {
		return data;
	}

};
