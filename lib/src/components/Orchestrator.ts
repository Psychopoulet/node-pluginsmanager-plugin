/*
    eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-dynamic-delete, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
*/
// => @typescript-eslint/no-unused-vars is disabled to allow inheritance with proper signature
// => @typescript-eslint/no-dynamic-delete is disabled to allow data release
// => @typescript-eslint/no-require-imports is disabled to allow dynamic Mediator import on plugin load
// => @typescript-eslint/no-var-requires is disabled for the same reason as @typescript-eslint/no-require-imports

// deps

    // natives
    import { join } from "node:path";

    // locals

    import { checkObject } from "../checkers/TypeError/checkObject";

    import MediatorUser from "./MediatorUser";
    import Server from "./Server";

    import checkFile from "../utils/file/checkFile";
    import readJSONFile from "../utils/file/readJSONFile";

// types & interfaces

    // natives
    import type { IncomingMessage } from "node:http";

    // externals

    import type { OpenApiDocument } from "express-openapi-validate";
    import type { OpenAPI } from "openapi-types";
    import type { Server as SocketIOServer } from "socket.io";
    import type { Server as SocketIOServerV2 } from "socket.io-v2";
    import type { Server as WebSocketServer } from "ws";

    // locals

    import type { iServerResponse } from "./Server";

    import type Mediator from "./Mediator";
    import type { tLogger, tEventMap, iEventsMinimal } from "./DescriptorUser";

    import type SwaggerParser from "@apidevtools/swagger-parser";

    export interface iOrchestratorOptions {
        "externalResourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
        "packageFile": string; // package file used by the plugin (absolute path)
        "descriptorFile": string; // descriptor file used by the plugin (absolute path)
        "mediatorFile": string; // mediator file used by the plugin (absolute path)
        "serverFile": string; // server file used by the plugin (absolute path)
        "logger"?: tLogger;
    }

// module

export default class Orchestrator<T extends iEventsMinimal & tEventMap<T> = iEventsMinimal> extends MediatorUser<T> {

    // attributes

        // protected

            protected _Server: Server | null;
            protected _socketServer: WebSocketServer | SocketIOServer | SocketIOServerV2 | null;
            protected _checkParameters: boolean;
            protected _checkResponse: boolean;

            // params
            protected _packageFile: string;
            protected _descriptorFile: string;
            protected _mediatorFile: string;
            protected _serverFile: string;

            protected _extended: string[];

        // public

            public enabled: boolean;

            // native
            public authors: string[];
            public description: string;
            public dependencies: object | null;
            public devDependencies: object | null;
            public engines: object | null;
            public license: string;
            public main: string;
            public name: string;
            public scripts: object | null;
            public version: string;

    // constructor

    public constructor (options: iOrchestratorOptions) {

        super(options);

        // protected

            this._Server = null;
            this._socketServer = null; // to delay socketMiddleware if necessary
            this._checkParameters = true; // to delay checkParameters if necessary
            this._checkResponse = true; // to delay checkResponse if necessary

            // params
            this._packageFile = options?.packageFile ?? "";
            this._descriptorFile = options?.descriptorFile ?? "";
            this._mediatorFile = options?.mediatorFile ?? "";
            this._serverFile = options?.serverFile ?? "";

            // extended
            this._extended = [];

        // public

            this.enabled = true;

            // native
            this.authors = [];
            this.description = "";
            this.dependencies = null;
            this.devDependencies = null;
            this.engines = null;
            this.license = "";
            this.main = "";
            this.name = "";
            this.scripts = null;
            this.version = "";

    }

    // public

        // checkers

            public checkConf (): Promise<void> {
                return Promise.resolve();
            }

            public isEnable (): Promise<void> {

                this.enabled = true;

                return Promise.resolve();

            }

            public checkFiles (): Promise<void> {

                // check package
                return Promise.resolve().then((): Promise<void> => {

                    return checkFile(this._packageFile).catch((err: Error): Promise<void> => {

                        err.message = "package : " + err.message;

                        return Promise.reject(err);

                    });

                // check Descriptor
                }).then((): Promise<void> => {

                    return checkFile(this._descriptorFile).catch((err: Error): Promise<void> => {

                        err.message = "descriptor : " + err.message;

                        return Promise.reject(err);

                    });

                // check Mediator
                }).then((): Promise<void> => {

                    return checkFile(this._mediatorFile).catch((err: Error): Promise<void> => {

                        err.message = "mediator : " + err.message;

                        return Promise.reject(err);

                    });

                // check Server
                }).then((): Promise<void> => {

                    return checkFile(this._serverFile).catch((err: Error): Promise<void> => {

                        err.message = "server : " + err.message;

                        return Promise.reject(err);

                    });

                });

            }

            public checkServer (): Promise<void> {

                return checkObject("Server", this._Server).then((): Promise<void> => {

                    return this._Server instanceof Server ? Promise.resolve() : Promise.reject(new TypeError(
                        "The plugin has an invalid Server which is not an instance (or a child) of the official Server class"
                    ));

                });

            }

        // middlewares

            public disableCheckParameters (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).disableCheckParameters();

                }).catch((): void => {

                    this._checkParameters = false; // delay checkParameters if necessary

                });

                return this;

            }

            public enableCheckParameters (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).enableCheckParameters();

                }).catch((): void => {

                    this._checkParameters = true; // delay checkParameters if necessary

                });

                return this;

            }

            public disableCheckResponse (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).disableCheckResponse();

                }).catch((): void => {

                    this._checkResponse = false; // delay checkResponse if necessary

                });

                return this;

            }

            public enableCheckResponse (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).enableCheckResponse();

                }).catch((): void => {

                    this._checkResponse = true; // delay checkResponse if necessary

                });

                return this;

            }

            public disableCors (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).disableCors();

                }).catch((err: Error): void => {
                    (this.emit as (event: "error", err: Error) => boolean)("error", err);
                });

                return this;

            }

            public enableCors (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).enableCors();

                }).catch((err: Error): void => {
                    (this.emit as (event: "error", err: Error) => boolean)("error", err);
                });

                return this;

            }

            public appMiddleware (req: IncomingMessage, res: iServerResponse, next: () => void): void {

                if (!this.enabled) {
                    next();
                    return;
                }
                else if (!this.initialized) {
                    next();
                    return;
                }

                this.checkServer().then((): void => {

                    (this._Server as Server).appMiddleware(req, res, next);

                }).catch((): void => {

                    next();

                });

            }

            public socketMiddleware (server: WebSocketServer | SocketIOServer): void {

                if (!this.enabled) {

                    this._socketServer = server; // delay socketMiddleware if necessary

                }
                else {

                    this.checkServer().then((): void => {

                        (this._Server as Server).socketMiddleware(server);

                    }).catch((): void => {

                        this._socketServer = server; // delay socketMiddleware if necessary

                    });

                }

            }

        // load / destroy

            public load (...data: unknown[]): Promise<void> {

                return this.checkFiles().then((): Promise<{ "engines": { "node": string; }; }> => {
                    return readJSONFile(join(__dirname, "..", "..", "..", "package.json")) as Promise<{ "engines": { "node": string; }; }>; // enforce current core engine version
                }).then(({ engines }: { "engines": { "node": string; }; }): Promise<Record<string, unknown>> => {

                    // native
                    this.authors = [];
                    this.description = "";
                    this.dependencies = {};
                    this.devDependencies = {};
                    this.engines = engines;
                    this.license = "MIT";
                    this.main = "lib/main.js";
                    this.name = "";
                    this.scripts = {};
                    this.version = "";

                    return readJSONFile(this._packageFile) as Promise<Record<string, unknown>>;

                // formate authors
                }).then((packageData: Record<string, unknown>): Record<string, unknown> => {

                    if ("undefined" !== typeof packageData.authors) {

                        if (Array.isArray(packageData.authors)) {

                            this.authors = packageData.authors as string[];
                            delete packageData.authors;

                            if ("string" === typeof packageData.author) {

                                const { author } = packageData;

                                if (!this.authors.includes(author)) {
                                    this.authors.push(author);
                                }

                                delete packageData.author;

                            }

                        }

                        delete packageData.authors;

                    }
                    else if ("string" === typeof packageData.author) {

                        this.authors = [ packageData.author ];
                        delete packageData.author;

                    }

                    return packageData;

                // formate other data
                }).then((packageData: Record<string, unknown>): void => {

                    Object.keys(packageData).forEach((key: string): void => {

                        if ("__proto__" === key || "constructor" === key || "prototype" === key) {
                            return;
                        }
                        if ("function" === typeof (this as Record<string, unknown>)[key]) {
                            return;
                        }

                        if ("undefined" === typeof (this as Record<string, unknown>)[key]) {
                            this._extended.push(key);
                        }

                        (this as Record<string, unknown>)[key] = packageData[key];

                    });

                });

            }

            public destroy (...data: unknown[]): Promise<void> {

                return Promise.resolve().then((): void => {

                    // protected

                        // params
                        this._packageFile = "";
                        this._descriptorFile = "";
                        this._mediatorFile = "";
                        this._serverFile = "";

                        // extended

                        this._extended.forEach((key: string): void => {
                            delete (this as Record<string, unknown>)[key];
                        });

                        this._extended = [];

                    // public

                        // native
                        this.authors = [];
                        this.description = "";
                        this.dependencies = null;
                        this.devDependencies = null;
                        this.engines = null;
                        this.license = "";
                        this.main = "";
                        this.name = "";
                        this.scripts = null;
                        this.version = "";

                }).then((): void => {

                    this.removeAllListeners();

                });

            }

        // init / release

            public init (...data: unknown[]): Promise<void> {

                // ensure conf validity
                return Promise.resolve().then((): Promise<void> => {

                    return this.checkConf();

                // get enable status
                }).then((): Promise<void> => {

                    return this.isEnable();

                }).then((): Promise<void> => {

                    if (!this.enabled) {
                        return Promise.resolve();
                    }

                    const SwaggerParser = require("@apidevtools/swagger-parser") as SwaggerParser;

                    // generate descriptor
                    return SwaggerParser.bundle(this._descriptorFile).then((bundledDescriptor: OpenAPI.Document): Promise<OpenApiDocument> => {

                        // force validate because of stupid malformatted references
                        return SwaggerParser.validate(bundledDescriptor).then((validatedDescriptor: OpenApiDocument): void => {

                            this._Descriptor = validatedDescriptor;
                            this._Descriptor.servers ??= [];

                        });

                    }).then((): Promise<void> => {

                        return this.checkDescriptor().then((): void => {

                            const { info } = this._Descriptor as OpenApiDocument;

                            // check title
                            if (info.title !== this.name) {

                                throw new Error(
                                    "The descriptor's title (\"" + info.title + "\") "
                                    + "is not equals to "
                                    + "the package's name (\"" + this.name + "\")"
                                );

                            }

                            // compare version to package version
                            if (info.version !== this.version) {

                                throw new Error(
                                    "The descriptor's version (\"" + info.version + "\") "
                                    + "is not equals to "
                                    + "the package's version (\"" + this.version + "\")"
                                );

                            }

                        }).catch((err: Error): Promise<void> => {

                            this._Descriptor = null;

                            return Promise.reject(err);

                        });

                    // create Mediator
                    }).then((): Promise<void> => {

                        // load
                        return new Promise((resolve: (value: typeof Mediator) => void, reject: (err: Error) => void): void => {

                            try {

                                const val: typeof Mediator | { "default": typeof Mediator } = require(this._mediatorFile) as typeof Mediator | { "default": typeof Mediator };

                                if ("object" === typeof val && "function" === typeof val.default) {
                                    resolve(val.default);
                                }
                                else if ("function" === typeof val) {
                                    resolve(val);
                                }
                                else {
                                    reject(new Error("Mediator file loaded (\"" + this._mediatorFile + "\") does not contain a valid Mediator"));
                                }

                            }
                            catch (e) {
                                reject(e instanceof Error ? e : new Error(String(e)));
                            }

                        // init
                        }).then((PluginMediator: typeof Mediator): void => {

                            this._Mediator = new PluginMediator({
                                "descriptor": this._Descriptor as OpenApiDocument,
                                "externalResourcesDirectory": this._externalResourcesDirectory,
                                "logger": this._Logger as tLogger
                            });

                        // check
                        }).then((): Promise<void> => {

                            return this.checkMediator().then((): void => {

                                // intercept errors to avoid non-catched ones
                                (this._Mediator as Mediator).on("error", (err: Error): void => {
                                    (this.emit as (event: "error", err: Error) => boolean)("error", err);
                                });

                            });

                        });

                    // create Server
                    }).then((): Promise<void> => {

                        // load
                        return new Promise((resolve: (value: typeof Server) => void, reject: (err: Error) => void) => {

                            try {

                                const val: typeof Server | { "default": typeof Server } = require(this._serverFile) as typeof Server | { "default": typeof Server };

                                if ("object" === typeof val && "function" === typeof val.default) {
                                    resolve(val.default);
                                }
                                else if ("function" === typeof val) {
                                    resolve(val);
                                }
                                else {
                                    reject(new Error("Server file loaded (\"" + this._serverFile + "\") does not contain a valid Server"));
                                }

                            }
                            catch (e) {
                                reject(e instanceof Error ? e : new Error(String(e)));
                            }

                        // init
                        }).then((PluginServer: typeof Server): void => {

                            this._Server = new PluginServer({
                                "descriptor": this._Descriptor as OpenApiDocument,
                                "mediator": this._Mediator as Mediator,
                                "externalResourcesDirectory": this._externalResourcesDirectory,
                                "logger": this._Logger as tLogger
                            });

                        // check
                        }).then((): Promise<void> => {

                            return this.checkServer().then((): void => {

                                // intercept errors to avoid non-catched ones
                                (this._Server as Server).on("error", (err: Error): void => {
                                    (this.emit as (event: "error", err: Error) => boolean)("error", err);
                                });

                            });

                        });

                    }).then((): Promise<void> => {

                        return this._initWorkSpace(...data);

                    // init Server (before Mediator)
                    }).then((): Promise<void> => {

                        return (this._Server as Server).init(...data).then((): void => {

                            if (this._socketServer) { // delayed socketMiddleware
                                (this._Server as Server).socketMiddleware(this._socketServer);
                            }

                            if (!this._checkParameters) { // delayed checkParameters
                                (this._Server as Server).disableCheckParameters();
                            }

                            if (!this._checkResponse) { // delayed checkResponse
                                (this._Server as Server).disableCheckResponse();
                            }

                        });

                    // init Mediator
                    }).then((): Promise<void> => {

                        return (this._Mediator as Mediator).init(...data);

                    }).then((): void => {

                        this.initialized = true;
                        (this.emit as (event: "initialized", ...args: unknown[]) => boolean)("initialized", ...data);

                    });

                });

            }

            public release (...data: unknown[]): Promise<void> {

                return Promise.resolve().then((): Promise<void> => {

                    return this._Mediator ? this._Mediator.release(...data).then((): void => {
                        this._Mediator = null;
                    }) : Promise.resolve();

                }).then((): Promise<void> => {

                    return this._Server ? this._Server.release(...data).then((): void => {
                        this._Server = null;
                    }) : Promise.resolve();

                }).then((): Promise<void> => {

                    return this._releaseWorkSpace(...data);

                }).then((): void => {

                    this._Descriptor = null;

                    this.initialized = false;
                    (this.emit as (event: "released", ...args: unknown[]) => boolean)("released", ...data);

                });

            }

        // write

            public install (...data: unknown[]): Promise<void> {

                return Promise.resolve();

            }

            public update (...data: unknown[]): Promise<void> {

                return Promise.resolve();

            }

            public uninstall (...data: unknown[]): Promise<void> {

                return Promise.resolve();

            }

}
