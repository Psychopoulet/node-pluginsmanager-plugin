"use strict";

// deps

	// natives
	import { lstat } from "fs";

	// locals
	import checkNonEmptyString from "../../checkers/RangeError/checkNonEmptyString";

// module

export default function isFile (file: string): Promise<boolean> {

	return (checkNonEmptyString("file", file) as Promise<void>).then((): Promise<boolean> => {

		return new Promise((resolve): void => {

			lstat(file, (err, stats): void => {
				return resolve(Boolean(!err && stats.isFile()));
			});

		});

	});

};
