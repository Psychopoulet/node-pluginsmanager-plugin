"use strict";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|null} check result
		*/
		function _checkSync (dataName: string, data: any): ReferenceError | null {

			let err: ReferenceError | null = null;

				if ("undefined" === typeof data) {

					err = new ReferenceError(
						"\"" + dataName + "\" does not exist"
					);

				}

			return err;

		}

// module

export default function checkExists (dataName: string, data: any, async: boolean = true): ReferenceError | null | Promise<void> {

	const err: ReferenceError | null = _checkSync(dataName, data);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
