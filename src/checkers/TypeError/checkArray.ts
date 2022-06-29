"use strict";

//  deps

	// locals
	import { checkObjectSync } from "../TypeError/checkObject";

// module

export function checkArraySync (dataName: string, data: any): ReferenceError | TypeError | null {

	let err: ReferenceError | TypeError | null = checkObjectSync(dataName, data) as ReferenceError | TypeError | null;

		if (!err && !(data instanceof Array)) {

			err = new TypeError(
				"\"" + dataName + "\" is not an Array"
			);

		}

	return err;

};

export default function checkArray (dataName: string, data: any): Promise<void> {

	const err: ReferenceError | TypeError | null = checkArraySync(dataName, data);

	return err ? Promise.reject(err) : Promise.resolve();

};
