/// <reference path="../../lib/index.d.ts" />

import Plugin from "../../lib/main.js";

console.log(Plugin);

const plugin = new Plugin();

console.log(plugin);

console.log(plugin.directory);

plugin.load().then(() => {
	return plugin.unload();
});
