"use strict";

//  deps

	// locals
	import checkObject from "./../TypeError/checkObject";
	import checkInteger from "./../TypeError/checkInteger";
	import checkNonEmptyInteger from "./checkNonEmptyInteger";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} min: min to check
		* @param {number} max: max to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _checkSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

			let err: ReferenceError | TypeError | RangeError | null = checkObject(dataName, data, false) as ReferenceError | TypeError | null;

				if (!err) {
					err = checkInteger(dataName + "/min", min, false) as ReferenceError | TypeError | null;
				}

				if (!err) {
					err = checkNonEmptyInteger(dataName + "/max", max, false) as ReferenceError | TypeError | RangeError | null;
				}

				const { length }: { "length": number; } = Object.keys(data);

				if (!err && min > length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be higher than " + min
					);

				}

				if (!err && max < length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be lower than " + max
					);

				}

			return err;

		}

// module

export default function checkObjectLengthBetween (dataName: string, data: any, min: number, max: number, async: boolean = true): ReferenceError | TypeError | RangeError | null | Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = _checkSync(dataName, data, min, max);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
