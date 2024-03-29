/// <reference path="../../lib/cjs/main.d.cts" />

"use strict";

// deps

	// natives
	import { join } from 'path';

	// locals
	import { Orchestrator, Mediator, Server } from "../../lib/cjs/main.cjs";

// classes

	class OrchestratorTest extends Orchestrator {

		public _initWorkspace (): Promise<void> {
			return Promise.resolve();
		}

	}

// consts

	const orchestrator: OrchestratorTest = new OrchestratorTest({
		"externalRessourcesDirectory": ".",
		"packageFile": join(__dirname, "..", "..", "package.json"),
		"descriptorFile": join(__dirname, "..", "utils", "DescriptorUser", "Descriptor.json"),
		"mediatorFile": join(__dirname, "..", "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "..", "utils", "Server", "LocalServer.js")
	});

// module

console.log(Orchestrator);
console.log(Mediator);
console.log(Server);

console.log(orchestrator);

orchestrator.load().then((): Promise<void> => {

	console.log(orchestrator);

	return orchestrator.init();

}).then((): Promise<void> => {

	console.log(orchestrator);

	return orchestrator.release();

}).then((): Promise<void> => {

	console.log(orchestrator);

	return orchestrator.destroy();

}).then((): void => {

	console.log(orchestrator);

	process.exit(0);

}).catch((err: Error): void => {

	console.error(err);

	process.exitCode = 1;
	process.exit(1);

});
