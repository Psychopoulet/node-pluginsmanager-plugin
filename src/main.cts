"use strict";

// checkers

	// undefined
	import { checkExists, checkExistsSync } from "./checkers/ReferenceError/checkExists";

	// native
	import { checkBoolean, checkBooleanSync } from "./checkers/TypeError/checkBoolean";
	import { checkFunction, checkFunctionSync } from "./checkers/TypeError/checkFunction";
	import { checkNumber, checkNumberSync } from "./checkers/TypeError/checkNumber";
	import { checkObject, checkObjectSync } from "./checkers/TypeError/checkObject";
	import { checkString, checkStringSync } from "./checkers/TypeError/checkString";

	// abstract
	import { checkArray, checkArraySync } from "./checkers/TypeError/checkArray";
	import { checkInteger, checkIntegerSync } from "./checkers/TypeError/checkInteger";

	// empty
	import { checkNonEmptyArray, checkNonEmptyArraySync } from "./checkers/RangeError/checkNonEmptyArray";
	import { checkNonEmptyInteger, checkNonEmptyIntegerSync } from "./checkers/RangeError/checkNonEmptyInteger";
	import { checkNonEmptyNumber, checkNonEmptyNumberSync } from "./checkers/RangeError/checkNonEmptyNumber";
	import { checkNonEmptyObject, checkNonEmptyObjectSync } from "./checkers/RangeError/checkNonEmptyObject";
	import { checkNonEmptyString, checkNonEmptyStringSync } from "./checkers/RangeError/checkNonEmptyString";

	// range

		// native
		import { checkNumberBetween, checkNumberBetweenSync } from "./checkers/RangeError/checkNumberBetween";
		import { checkObjectLength, checkObjectLengthSync } from "./checkers/RangeError/checkObjectLength";
		import { checkObjectLengthBetween, checkObjectLengthBetweenSync } from "./checkers/RangeError/checkObjectLengthBetween";
		import { checkStringLength, checkStringLengthSync } from "./checkers/RangeError/checkStringLength";
		import { checkStringLengthBetween, checkStringLengthBetweenSync } from "./checkers/RangeError/checkStringLengthBetween";

		// abstract
		import { checkIntegerBetween, checkIntegerBetweenSync } from "./checkers/RangeError/checkIntegerBetween";
		import { checkArrayLength, checkArrayLengthSync } from "./checkers/RangeError/checkArrayLength";
		import { checkArrayLengthBetween, checkArrayLengthBetweenSync } from "./checkers/RangeError/checkArrayLengthBetween";

	export {

		// undefined
		checkExists, checkExistsSync,

		// native
		checkBoolean, checkBooleanSync,
		checkFunction, checkFunctionSync,
		checkNumber, checkNumberSync,
		checkObject, checkObjectSync,
		checkString, checkStringSync,

		// abstract
		checkArray, checkArraySync,
		checkInteger, checkIntegerSync,

		// empty
		checkNonEmptyArray, checkNonEmptyArraySync,
		checkNonEmptyInteger, checkNonEmptyIntegerSync,
		checkNonEmptyNumber, checkNonEmptyNumberSync,
		checkNonEmptyObject, checkNonEmptyObjectSync,
		checkNonEmptyString, checkNonEmptyStringSync,

		// range

			// native
			checkNumberBetween, checkNumberBetweenSync,
			checkObjectLength, checkObjectLengthSync,
			checkObjectLengthBetween, checkObjectLengthBetweenSync,
			checkStringLength, checkStringLengthSync,
			checkStringLengthBetween, checkStringLengthBetweenSync,

			// abstract
			checkIntegerBetween, checkIntegerBetweenSync,
			checkArrayLength, checkArrayLengthSync,
			checkArrayLengthBetween, checkArrayLengthBetweenSync

	};

// components

	import DescriptorUser, { iDescriptorUserOptions, tLogType, tLogger } from "./components/DescriptorUser";
	import Mediator, { iUrlParameters, iBodyParameters } from "./components/Mediator";
	import MediatorUser, { iMediatorUserOptions } from "./components/MediatorUser";
	import NotFoundError from "./components/NotFoundError";
	import Orchestrator, { iOrchestratorOptions } from "./components/Orchestrator";
	import Server, { iClient, iIncomingMessage, iServerResponse } from "./components/Server";

	export {
		tLogType, tLogger,
		iUrlParameters, iBodyParameters,
		iClient, iIncomingMessage, iServerResponse
	};

	export {
		DescriptorUser, iDescriptorUserOptions,
		Mediator,
		MediatorUser, iMediatorUserOptions,
		NotFoundError,
		Orchestrator, iOrchestratorOptions,
		Server
	};
