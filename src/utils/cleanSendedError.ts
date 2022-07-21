"use strict";

// module

export default function cleanSendedError (data: any): string {

	if ("object" === typeof data) {

		if (data instanceof Error) {
			return data.message;
		}
		else {

			Object.keys(data).forEach((key): void => {
				data[key] = cleanSendedError(data[key]);
			});

			return data;
		
		}

	}
	else {
		return data;
	}

};
