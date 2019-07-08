/// <reference path="../../lib/index.d.ts" />

import { Mediator, Orchestrator, Server } from '../../lib/main.js';

console.log(Mediator);

const mediator = new Mediator();

console.log(mediator);

mediator.init().then(() => {
	return mediator.release();
});
