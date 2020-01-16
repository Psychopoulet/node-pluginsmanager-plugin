"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

		// undefined
		const checkExists = require(join(__dirname, "ReferenceError", "checkExists.js"));

		// native
		const checkBoolean = require(join(__dirname, "TypeError", "checkBoolean.js"));
		const checkFunction = require(join(__dirname, "TypeError", "checkFunction.js"));
		const checkNumber = require(join(__dirname, "TypeError", "checkNumber.js"));
		const checkObject = require(join(__dirname, "TypeError", "checkObject.js"));
		const checkString = require(join(__dirname, "TypeError", "checkString.js"));

		// abstract
		const checkArray = require(join(__dirname, "TypeError", "checkArray.js"));
		const checkInteger = require(join(__dirname, "TypeError", "checkInteger.js"));

		// empty
		const checkNonEmptyArray = require(join(__dirname, "RangeError", "checkNonEmptyArray.js"));
		const checkNonEmptyInteger = require(join(__dirname, "RangeError", "checkNonEmptyInteger.js"));
		const checkNonEmptyNumber = require(join(__dirname, "RangeError", "checkNonEmptyNumber.js"));
		const checkNonEmptyObject = require(join(__dirname, "RangeError", "checkNonEmptyObject.js"));
		const checkNonEmptyString = require(join(__dirname, "RangeError", "checkNonEmptyString.js"));

		// range
		const checkArrayLength = require(join(__dirname, "RangeError", "checkArrayLength.js"));
		const checkArrayLengthBetween = require(join(__dirname, "RangeError", "checkArrayLengthBetween.js"));
		const checkIntegerBetween = require(join(__dirname, "RangeError", "checkIntegerBetween.js"));
		const checkNumberBetween = require(join(__dirname, "RangeError", "checkNumberBetween.js"));
		const checkObjectLength = require(join(__dirname, "RangeError", "checkObjectLength.js"));
		const checkObjectLengthBetween = require(join(__dirname, "RangeError", "checkObjectLengthBetween.js"));
		const checkStringLength = require(join(__dirname, "RangeError", "checkStringLength.js"));
		const checkStringLengthBetween = require(join(__dirname, "RangeError", "checkStringLengthBetween.js"));

// module

module.exports = {

	// undefined
	checkExists,

	// native
	checkBoolean,
	checkFunction,
	checkNumber,
	checkObject,
	checkString,

	// abstract
	checkArray,
	checkInteger,

	// empty
	checkNonEmptyArray,
	checkNonEmptyInteger,
	checkNonEmptyNumber,
	checkNonEmptyObject,
	checkNonEmptyString,

	// range
	checkArrayLength,
	checkArrayLengthBetween,
	checkIntegerBetween,
	checkNumberBetween,
	checkObjectLength,
	checkObjectLengthBetween,
	checkStringLength,
	checkStringLengthBetween

};
