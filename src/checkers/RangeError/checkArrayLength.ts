"use strict";

//  deps

	// locals
	import { checkArraySync } from "./../TypeError/checkArray";
	import { checkIntegerSync } from "./../TypeError/checkInteger";

// module

export function checkArrayLengthSync (dataName: string, data: any, length: number): ReferenceError | TypeError | RangeError | null {

	let err: ReferenceError | TypeError | RangeError | null = checkArraySync(dataName, data) as ReferenceError | TypeError | null;

		if (!err) {
			err = checkIntegerSync(dataName + "/length", length) as ReferenceError | TypeError | null;
		}

		if (!err && length !== (data as Array<any>).length) {

			err = new RangeError(
				"\"" + dataName + "\" length must be equal to " + length
			);

		}

	return err;

};

export default function checkArrayLength (dataName: string, data: any, length: number): Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = checkArrayLengthSync(dataName, data, length);

	return err ? Promise.reject(err) : Promise.resolve();

};
