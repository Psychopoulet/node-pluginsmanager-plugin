"use strict";

//  deps

	// locals
	import checkObject from "./../TypeError/checkObject";
	import checkInteger from "./../TypeError/checkInteger";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} _length: length to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _checkSync (dataName: string, data: any, _length: number): ReferenceError | TypeError | RangeError | null {

			let err: ReferenceError | TypeError | RangeError | null = checkObject(dataName, data, false) as ReferenceError | TypeError | null;

				if (!err) {
					err = checkInteger(dataName + "/length", _length, false) as ReferenceError | TypeError | null;
				}

				const { length }: { "length": number; } = Object.keys(data);

				if (!err && _length !== length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be equal to " + _length
					);

				}

			return err;

		}

// module

export default function checkObjectLength (dataName: string, data: any, length: number, async: boolean = true): ReferenceError | TypeError | RangeError | null | Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = _checkSync(dataName, data, length);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
