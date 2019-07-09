/// <reference path="../../lib/index.d.ts" />

import { join } from 'path';
import { Mediator, Orchestrator, Server } from '../../lib/main.js';

console.log(Orchestrator);
console.log(Mediator);
console.log(Server);

const orchestrator = new Orchestrator({
	"packageFile": join(__dirname, "..", "..", "package.json"),
	"mediatorFile": join(__dirname, "..", "..", "lib", "components", "Mediator.js"),
	"serverFile": join(__dirname, "..", "..", "lib", "components", "Server.js")
});

console.log(orchestrator);

orchestrator.init().then(() => {

	console.log(orchestrator);

	return orchestrator.release();

}).then(() => {

	console.log(orchestrator);

	return orchestrator.destroy();

}).then(() => {

	console.log(orchestrator);

});
