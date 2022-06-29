"use strict";

//  deps

	// locals
	import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkIntegerSync (dataName: string, data: any): ReferenceError | TypeError | null {

	let err: ReferenceError | null = checkExistsSync(dataName, data) as ReferenceError | null;

		if (!err && !Number.isInteger(data)) {

			err = new TypeError(
				"\"" + dataName + "\" is not an integer"
			);

		}

	return err;

};

export default function checkInteger (dataName: string, data: any): Promise<void> {

	const err: ReferenceError | TypeError | null = checkIntegerSync(dataName, data);

	return err ? Promise.reject(err) : Promise.resolve();

};
