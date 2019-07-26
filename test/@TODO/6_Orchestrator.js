/*
	eslint-disable max-statements, no-sync, max-lines
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");
	const Events = require("events");
	const { createServer } = require("http");

	// externals
	const express = require("express");

	// locals

		// plugin
		const readJSONFile = require(join(__dirname, "..", "lib", "utils", "readJSONFile.js"));
		const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
			const Mediator = require(join(__dirname, "..", "lib", "components", "Mediator.js"));
			const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));
				const Server = require(join(__dirname, "..", "lib", "components", "Server.js"));
				const Orchestrator = require(join(__dirname, "..", "lib", "components", "Orchestrator.js"));

		// utils
		const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));
		const NonEnabledOrchestrator = require(join(__dirname, "utils", "Orchestrator", "NonEnabledOrchestrator.js"));

// consts

	const EMPTY_CLASS_TEST = join(__dirname, "utils", "EmptyClassTest.js");

	const GOOD_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
	};

	const PORT = "3000";
	const RESPONSE_CONTENT = "Hello World";

// tests

describe("Orchestrator", () => {

	it("should test constructor", () => {

		const orchestrator = new LocalOrchestrator({
			"packageFile": "packageFile",
			"mediatorFile": "mediatorFile",
			"serverFile": "serverFile"
		});

		strictEqual(typeof orchestrator, "object", "Generated orchestrator is not an object");
		strictEqual(orchestrator instanceof Events, true, "Generated orchestrator is not a Events instance");
		strictEqual(orchestrator instanceof Bootable, true, "Generated orchestrator is not a Bootable instance");
		strictEqual(orchestrator instanceof MediatorUser, true, "Generated orchestrator is not a MediatorUser instance");
		strictEqual(orchestrator instanceof Orchestrator, true, "Generated orchestrator is not a Orchestrator instance");
		strictEqual(orchestrator instanceof LocalOrchestrator, true, "Generated orchestrator is not a LocalOrchestrator instance");

		strictEqual(typeof orchestrator._Server, "object", "Generated orchestrator _Server is not an object");
		strictEqual(orchestrator._Server, null, "Generated orchestrator _Server is not as expected");

		// params

		strictEqual(typeof orchestrator._packageFile, "string", "Generated orchestrator _packageFile is not a string");
		strictEqual(orchestrator._packageFile, "packageFile", "Generated orchestrator _packageFile is not as expected");

		strictEqual(typeof orchestrator._mediatorFile, "string", "Generated orchestrator _mediatorFile is not a string");
		strictEqual(orchestrator._mediatorFile, "mediatorFile", "Generated orchestrator _mediatorFile is not as expected");

		strictEqual(typeof orchestrator._serverFile, "string", "Generated orchestrator _serverFile is not a string");
		strictEqual(orchestrator._serverFile, "serverFile", "Generated orchestrator _serverFile is not as expected");

		// native

		strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
		strictEqual(orchestrator.authors instanceof Array, true, "Generated orchestrator authors is not an Array");
		deepStrictEqual(orchestrator.authors, [], "Generated orchestrator authors is not as expected");

		strictEqual(typeof orchestrator.description, "string", "Generated orchestrator description is not a string");
		strictEqual(orchestrator.description, "", "Generated orchestrator description is not as expected");

		strictEqual(typeof orchestrator.dependencies, "object", "Generated orchestrator dependencies is not an object");
		deepStrictEqual(orchestrator.dependencies, {}, "Generated orchestrator dependencies is not as expected");

		strictEqual(typeof orchestrator.devDependencies, "object", "Generated orchestrator devDependencies is not an object");
		deepStrictEqual(orchestrator.devDependencies, {}, "Generated orchestrator devDependencies is not as expected");

		strictEqual(typeof orchestrator.engines, "object", "Generated orchestrator engines is not an object");
		deepStrictEqual(orchestrator.engines, {
			"node": ">=6.0.0"
		}, "Generated orchestrator engines is not as expected");

		strictEqual(typeof orchestrator.license, "string", "Generated orchestrator license is not a string");
		strictEqual(orchestrator.license, "MIT", "Generated orchestrator license is not as expected");

		strictEqual(typeof orchestrator.main, "string", "Generated orchestrator main is not a string");
		strictEqual(orchestrator.main, "lib/main.js", "Generated orchestrator main is not as expected");

		strictEqual(typeof orchestrator.name, "string", "Generated orchestrator name is not a string");
		strictEqual(orchestrator.name, "", "Generated orchestrator name is not as expected");

		strictEqual(typeof orchestrator.scripts, "object", "Generated orchestrator scripts is not an object");
		deepStrictEqual(orchestrator.scripts, {}, "Generated orchestrator scripts is not as expected");

		strictEqual(typeof orchestrator.version, "string", "Generated orchestrator version is not a string");
		strictEqual(orchestrator.version, "", "Generated orchestrator version is not as expected");

		return Promise.resolve();

	});

	it("should test event", () => {

		const orchestrator = new LocalOrchestrator();

		return new Promise((resolve, reject) => {

			orchestrator
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		}).then(() => {
			return orchestrator.release();
		});

	});

	it("should test install", () => {
		return new LocalOrchestrator().install();
	});

	it("should test update", () => {
		return new LocalOrchestrator().update();
	});

	it("should test uninstall", () => {
		return new LocalOrchestrator().uninstall();
	});

	describe("checkServer", () => {

		it("should check without server", (done) => {

			const orchestrator = new LocalOrchestrator();
			delete orchestrator._Server;

			orchestrator.checkServer().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with null server", (done) => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = null;

			orchestrator.checkServer().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with wrong server (string)", (done) => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = "test";

			orchestrator.checkServer().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with wrong server (object)", (done) => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = {};

			orchestrator.checkServer().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with right server", () => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = new Server();

			return orchestrator.checkServer();

		});

	});

	describe("checkServerSync", () => {

		it("should check without server", () => {

			const orchestrator = new LocalOrchestrator();
			delete orchestrator._Server;

			const res = orchestrator.checkServerSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with null server", () => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = null;

			const res = orchestrator.checkServerSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with wrong server (string)", () => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = "test";

			const res = new LocalOrchestrator().checkServerSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with wrong server (object)", () => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = {};

			const res = new LocalOrchestrator().checkServerSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with right server", () => {

			const orchestrator = new LocalOrchestrator();
			orchestrator._Server = new Server();

			const res = orchestrator.checkServerSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, true, "Generated result is not as expected");

		});

	});

	describe("checkFiles", () => {

		describe("packageFile", () => {

			it("should check without file", (done) => {

				new LocalOrchestrator().checkFiles().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

			it("should check with inexistant file", (done) => {

				new LocalOrchestrator({
					"packageFile": "ezsorfnzlmefnzmùe"
				}).checkFiles().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

		});

		describe("mediatorFile", () => {

			it("should check without file", (done) => {

				new LocalOrchestrator({
					"packageFile": join(__dirname, "..", "package.json")
				}).checkFiles().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

			it("should check with inexistant file", (done) => {

				new LocalOrchestrator({
					"packageFile": join(__dirname, "..", "package.json"),
					"mediatorFile": "ezsorfnzlmefnzmùe"
				}).checkFiles().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

		});

		describe("serverFile", () => {

			it("should check without file", (done) => {

				new LocalOrchestrator({
					"packageFile": join(__dirname, "..", "package.json"),
					"mediatorFile": join(__dirname, "..", "lib", "components", "Mediator.json")
				}).checkFiles().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

			it("should check with inexistant file", (done) => {

				new LocalOrchestrator({
					"packageFile": join(__dirname, "..", "package.json"),
					"mediatorFile": join(__dirname, "..", "lib", "components", "Mediator.json"),
					"serverFile": "ezsorfnzlmefnzmùe"
				}).checkFiles().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

		});

		it("should check with existant files", () => {

			return new LocalOrchestrator(GOOD_OPTIONS).checkFiles();

		});

	});

	it("should test package file loader", () => {

		const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

		return orchestrator._loadDataFromPackageFile().then(() => {

			strictEqual(typeof orchestrator._Mediator, "object", "Generated orchestrator _Mediator is not an object");
			strictEqual(orchestrator._Mediator, null, "Generated orchestrator _Mediator is not as expected");

			strictEqual(typeof orchestrator._Server, "object", "Generated orchestrator _Server is not an object");
			strictEqual(orchestrator._Server, null, "Generated orchestrator _Server is not as expected");

			// params

			strictEqual(typeof orchestrator._packageFile, "string", "Generated orchestrator _packageFile is not a string");
			strictEqual(orchestrator._packageFile, GOOD_OPTIONS.packageFile, "Generated orchestrator _packageFile is not as expected");

			strictEqual(typeof orchestrator._mediatorFile, "string", "Generated orchestrator _mediatorFile is not a string");
			strictEqual(orchestrator._mediatorFile, GOOD_OPTIONS.mediatorFile, "Generated orchestrator _mediatorFile is not as expected");

			strictEqual(typeof orchestrator._serverFile, "string", "Generated orchestrator _serverFile is not a string");
			strictEqual(orchestrator._serverFile, GOOD_OPTIONS.serverFile, "Generated orchestrator _serverFile is not as expected");

			return readJSONFile(GOOD_OPTIONS.packageFile);

		}).then((data) => {

			// native

			strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
			strictEqual(orchestrator.authors instanceof Array, true, "Generated orchestrator authors is not an Array");
			deepStrictEqual(orchestrator.authors, [ data.author ], "Generated orchestrator authors is not as expected");

			strictEqual(typeof orchestrator.description, "string", "Generated orchestrator description is not a string");
			strictEqual(orchestrator.description, data.description, "Generated orchestrator description is not as expected");

			strictEqual(typeof orchestrator.dependencies, "object", "Generated orchestrator dependencies is not an object");
			deepStrictEqual(orchestrator.dependencies, data.dependencies, "Generated orchestrator dependencies is not as expected");

			strictEqual(typeof orchestrator.devDependencies, "object", "Generated orchestrator devDependencies is not an object");
			deepStrictEqual(orchestrator.devDependencies, data.devDependencies, "Generated orchestrator devDependencies is not as expected");

			strictEqual(typeof orchestrator.engines, "object", "Generated orchestrator engines is not an object");
			deepStrictEqual(orchestrator.engines, data.engines, "Generated orchestrator engines is not as expected");

			strictEqual(typeof orchestrator.license, "string", "Generated orchestrator license is not a string");
			strictEqual(orchestrator.license, data.license, "Generated orchestrator license is not as expected");

			strictEqual(typeof orchestrator.main, "string", "Generated orchestrator main is not a string");
			strictEqual(orchestrator.main, data.main, "Generated orchestrator main is not as expected");

			strictEqual(typeof orchestrator.name, "string", "Generated orchestrator name is not a string");
			strictEqual(orchestrator.name, data.name, "Generated orchestrator name is not as expected");

			strictEqual(typeof orchestrator.scripts, "object", "Generated orchestrator scripts is not an object");
			deepStrictEqual(orchestrator.scripts, data.scripts, "Generated orchestrator scripts is not as expected");

			strictEqual(typeof orchestrator.version, "string", "Generated orchestrator version is not a string");
			strictEqual(orchestrator.version, data.version, "Generated orchestrator version is not as expected");

			return Promise.resolve();

		}).then(() => {

			orchestrator._packageFile = join(__dirname, "utils", "packageWithMultipleAuthors.json");

			return orchestrator._loadDataFromPackageFile().then(() => {

				strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
				strictEqual(orchestrator.authors instanceof Array, true, "Generated orchestrator authors is not an Array");
				deepStrictEqual(orchestrator.authors, [ "Sébastien VIDAL" ], "Generated orchestrator authors is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test http middleware without Server", () => {

		const res = new LocalOrchestrator(GOOD_OPTIONS).httpMiddleware(null, null);

		strictEqual(typeof res, "boolean", "Generated result is not an object");
		strictEqual(res, false, "Generated result is not as expected");

	});

	it("should test app middleware without Server", () => {

		const res = new LocalOrchestrator(GOOD_OPTIONS).appMiddleware(null, null, () => {
			return false;
		});

		strictEqual(typeof res, "boolean", "Generated result is not an object");
		strictEqual(res, false, "Generated result is not as expected");

	});

	describe("init", () => {

		it("should init orchestrator with wrong Mediator", (done) => {

			const opt = JSON.parse(JSON.stringify(GOOD_OPTIONS));
			opt.mediatorFile = EMPTY_CLASS_TEST;

			new LocalOrchestrator(opt).init().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should init orchestrator with wrong Server", (done) => {

			const opt = JSON.parse(JSON.stringify(GOOD_OPTIONS));
			opt.serverFile = EMPTY_CLASS_TEST;

			new LocalOrchestrator(opt).init().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should init orchestrator", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return new Promise((resolve, reject) => {

				orchestrator
					.once("initialized", resolve)
					.once("error", reject);

				orchestrator.init().catch(reject);

			}).then(() => {

				strictEqual(typeof orchestrator._Mediator, "object", "Generated orchestrator _Mediator is not an object");
				strictEqual(orchestrator._Mediator instanceof Mediator, true, "Generated orchestrator _Mediator is not as expected");

				strictEqual(typeof orchestrator._Server, "object", "Generated orchestrator _Server is not an object");
				strictEqual(orchestrator._Server instanceof Server, true, "Generated orchestrator _Mediator is not as expected");

				strictEqual(typeof orchestrator.initialized, "boolean", "Generated orchestrator initialized is not a boolean");
				strictEqual(orchestrator.initialized, true, "Generated orchestrator initialized is not as expected");

				return Promise.resolve();

			});

		});

		it("should init non enabled orchestrator", () => {

			const orchestrator = new NonEnabledOrchestrator(GOOD_OPTIONS);

			return new Promise((resolve, reject) => {

				orchestrator
					.once("initialized", resolve)
					.once("error", reject);

				orchestrator.init().then(() => {

					strictEqual(typeof orchestrator.initialized, "boolean", "Generated orchestrator initialized is not a boolean");
					strictEqual(orchestrator.initialized, false, "Generated orchestrator initialized is not as expected");

					resolve();

				}).catch(reject);

			});

		});

		it("should init delayed mediator", () => {

			const opts = JSON.parse(JSON.stringify(GOOD_OPTIONS));

				opts.mediatorFile = join(__dirname, "utils", "Mediator", "DelayedMediator.js");

			return new LocalOrchestrator(opts).init();

		});

		it("should init delayed server", () => {

			const opts = JSON.parse(JSON.stringify(GOOD_OPTIONS));

				opts.serverFile = join(__dirname, "utils", "Server", "DelayedServer.js");

			return new LocalOrchestrator(opts).init();

		});

		it("should test non-herited _initWorkSpace", (done) => {

			const nonHerited = new Orchestrator();

			nonHerited
				.once("initialized", () => {
					done(new Error("There is no generated Error"));
				})
				.once("error", (err) => {

					strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof Error, true, "Generated Error is not as expected");

					done();

				});

			nonHerited.init().catch(done);

		});

	});

	it("should release orchestrator", () => {

		const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

		return orchestrator.init().then(() => {
			return orchestrator.release("test release");
		});

	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new Orchestrator();

		nonHerited
			.once("released", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.release().catch(done);

	});

	it("should destroy orchestrator", () => {

		return new LocalOrchestrator().destroy();

	});

	describe("fullstack", () => {

		it("should test with full stack http", () => {

			const opt = JSON.parse(JSON.stringify(GOOD_OPTIONS));
			opt.mediatorFile = join(__dirname, "utils", "Mediator", "HeritedMediator.js");
			opt.serverFile = join(__dirname, "utils", "Server", "HeritedServer.js");

			const orchestrator = new LocalOrchestrator(opt);
			let runningServer = null;

			return orchestrator.init().then(() => {

				return new Promise((resolve) => {

					runningServer = createServer((req, res) => {

						if (!orchestrator.httpMiddleware(req, res)) {

							res.writeHead(200, {
								"Content-Type": "text/html; charset=utf-8"
							});

							res.write(RESPONSE_CONTENT);

							res.end();

						}

					}).listen(PORT, resolve);

				});

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			}).then(() => {

				return httpRequestTest("/fullstack", 201, "Created");

			}).then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						runningServer = null;
						resolve();
					});

				}) : Promise.resolve();

			});

		});

		it("should test with full stack app", () => {

			const opt = JSON.parse(JSON.stringify(GOOD_OPTIONS));
			opt.mediatorFile = join(__dirname, "utils", "Mediator", "HeritedMediator.js");
			opt.serverFile = join(__dirname, "utils", "Server", "HeritedServer.js");

			const orchestrator = new LocalOrchestrator(opt);
			let runningServer = null;

			return orchestrator.init().then(() => {

				return new Promise((resolve) => {

					runningServer = express()
						.use((req, res, next) => {
							orchestrator.appMiddleware(req, res, next);
						})
						.get("/", (req, res) => {
							res.send(RESPONSE_CONTENT);
						})
						.listen(PORT, resolve);

				});

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			}).then(() => {

				return httpRequestTest("/fullstack", 201, "Created");

			}).then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						runningServer = null;
						resolve();
					});

				}) : Promise.resolve();

			});

		});

	});

});
