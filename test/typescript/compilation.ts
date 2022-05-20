/// <reference path="../../lib/index.d.ts" />

"use strict";

// deps

	// natives
	import { join } from 'path';

	// locals
	import { Orchestrator, Mediator, Server } from "../../lib/main.js";

	console.log(Orchestrator);
	console.log(Mediator);
	console.log(Server);

// consts

	class OrchestratorTest extends Orchestrator {

		_initWorkspace () {
			return Promise.resolve();
		}

	}

	const orchestrator = new OrchestratorTest({
		"externalRessourcesDirectory": ".",
		"packageFile": join(__dirname, "..", "..", "package.json"),
		"descriptorFile": join(__dirname, "..", "utils", "DescriptorUser", "Descriptor.json"),
		"mediatorFile": join(__dirname, "..", "..", "lib", "components", "Mediator.js"),
		"serverFile": join(__dirname, "..", "..", "lib", "components", "Server.js")
	});

// module

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
