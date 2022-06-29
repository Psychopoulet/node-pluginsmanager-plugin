"use strict";

//  deps

	// locals
	import { checkIntegerSync } from "./../TypeError/checkInteger";
	import { checkNonEmptyIntegerSync } from "./checkNonEmptyInteger";

// module

export function checkIntegerBetweenSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

	let err: ReferenceError | TypeError | RangeError | null = checkIntegerSync(dataName, data) as ReferenceError | TypeError | null;

		if (!err) {
			err = checkIntegerSync(dataName + "/min", min) as ReferenceError | TypeError | null;
		}

		if (!err) {
			err = checkNonEmptyIntegerSync(dataName + "/max", max) as ReferenceError | TypeError | RangeError | null;
		}

		if (!err && min > (data as number)) {

			err = new RangeError(
				"\"" + dataName + "\" must be higher than " + min
			);

		}

		if (!err && max <  (data as number)) {

			err = new RangeError(
				"\"" + dataName + "\" must be lower than " + max
			);

		}

	return err;

};

export default function checkIntegerBetween (dataName: string, data: any, min: number, max: number): Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = checkIntegerBetweenSync(dataName, data, min, max);

	return err ? Promise.reject(err) : Promise.resolve();

};
