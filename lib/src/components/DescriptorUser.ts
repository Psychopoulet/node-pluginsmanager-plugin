/*
    eslint-disable @typescript-eslint/no-unused-vars
*/
// => @typescript-eslint/no-unused-vars is disabled to allow inheritance with proper signature

//  deps

    // natives
    import { EventEmitter } from "node:events";

    // locals
    import { checkObject } from "../checkers/TypeError/checkObject";
    import { checkNonEmptyObject } from "../checkers/RangeError/checkNonEmptyObject";
    import { checkNonEmptyString } from "../checkers/RangeError/checkNonEmptyString";

// types & interfaces

    // externals
    import type { OpenApiDocument } from "express-openapi-validate";

    // locals
    import type { tMethod } from "../openAPITypes";

    export type tLogType = "data" | "debug" | "log" | "info" | "success" | "warning" | "error";
    export type tLogger = (type: tLogType, message: string | Error, bold?: boolean, pluginName?: string) => void;

    export interface iDescriptorUserOptions {
        "externalResourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
        "descriptor"?: OpenApiDocument; // not sent by Orchestrator
        "logger"?: tLogger;
    }

    export type tEventMap<T> = Record<keyof T, unknown[]>;
    export type tEventsNoEvent = {};
    export interface iEventsMinimal {
        "error": [ Error ];
        "initialized": [ unknown ];
        "released": [ unknown ];
    }

// consts

    const LOG_TYPES_ALLOWED: tLogType[] = [
        "log",
        "info",
        "success",
        "warning",
        "error"
    ];

// module

// Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-written in Mediator class, and not in MediatorUser childs.
// Please note the fact that "init" and "release" method MUST NOT be re-written. Each child has its own init logic.
export default class DescriptorUser<T extends tEventMap<T> = tEventsNoEvent> extends EventEmitter<T> {

    // attributes

        // public

            public initialized: boolean;

        // protected

            protected _descriptorValidated: boolean;
            protected _externalResourcesDirectory: string;
            protected _Descriptor: OpenApiDocument | null;
            protected _Logger: tLogger | null;

    // constructor

    public constructor (options: iDescriptorUserOptions) {

        super();

        // public

            this.initialized = false;

        // protected

            this._descriptorValidated = false;

            // mandatory props

            if ("object" !== typeof options) {
                throw new ReferenceError("\"options\" must be a non-null object");
            }
            if ("string" !== typeof options.externalResourcesDirectory) {
                throw new ReferenceError("\"options.externalResourcesDirectory\" must be a string");
            }

            // optional props

            this._externalResourcesDirectory = options.externalResourcesDirectory;
            this._Descriptor = options.descriptor ?? null;
            this._Logger = options.logger ?? null;

    }

    // protected

        // must be inherited
        protected _initWorkSpace (...data: unknown[]): Promise<void> {

            return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));

        }

        // must be inherited
        protected _releaseWorkSpace (...data: unknown[]): Promise<void> {

            return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));

        }

        protected _log (type: tLogType, message: string | Error, bold?: boolean): this {

            if (Boolean(message) && "function" === typeof this._Logger && LOG_TYPES_ALLOWED.includes(type)) {
                this._Logger(type, message, bold, this.getPluginName());
            }

            return this;

        }

    // public

        public getPluginName (): string {
            return this._Descriptor?.info.title ?? "";
        }

        public getPluginVersion (): string {
            return this._Descriptor?.info.version ?? "";
        }

        public getPluginDescription (): string {
            return this._Descriptor?.info.description ?? "";
        }

        // must be inherited
        public init (...data: unknown[]): Promise<void> {

            return Promise.reject(new Error("\"init\" method must be inherited"));

        }

        // must be inherited
        public release (...data: unknown[]): Promise<void> {

            return Promise.reject(new Error("\"release\" method must be inherited"));

        }

        // must be inherited
        public checkDescriptor (): Promise<void> {

            if (this._descriptorValidated) {
                return Promise.resolve();
            }

            // check Descriptor object
            return checkNonEmptyObject("Descriptor", this._Descriptor).then((): Promise<void> => {

                // check info object
                return checkNonEmptyObject("Descriptor.info", (this._Descriptor as OpenApiDocument).info).then((): Promise<void> => {

                    const { title, version } = (this._Descriptor as OpenApiDocument).info;

                    // check title
                    return checkNonEmptyString("Descriptor.info.title", title).then((): Promise<void> => {

                        return title !== title.toLowerCase()
                            ? Promise.reject(new Error(
                                "The descriptor's title (\"" + title + "\") "
                                + "is not equals in lower case (package.json convention)"
                            ))
                            : Promise.resolve();

                    // check version
                    }).then((): Promise<void> => {
                        return checkNonEmptyString("Descriptor.info.version", version);
                    });

                });

            }).then((): Promise<void> => {

                const { paths } = this._Descriptor as OpenApiDocument;

                // check paths object
                return checkObject("Descriptor.paths", paths).then((): Promise<void> => {

                    // check multiple operationIds
                    return Promise.resolve().then((): Promise<void> => {

                        const operationIds: string[] = [];
                        Object.keys(paths).forEach((pathname: string): void => {

                            const path = paths[pathname];

                            Object.keys(path).forEach((method: string): void => {

                                const operation = path[method as tMethod];

                                if ("string" === typeof operation?.operationId) {
                                    operationIds.push(operation.operationId);
                                }

                            });

                        });

                        let multiple: boolean = false;

                            const seen: Set<string> = new Set();

                            for (let i: number = 0; i < operationIds.length; ++i) {

                                if (seen.has(operationIds[i])) {
                                    multiple = true;
                                    break;
                                }

                                seen.add(operationIds[i]);

                            }

                        return multiple ? Promise.reject(new Error(
                            "There is multiple operationIds in [\" " + operationIds.join("\", ") + " \"]"
                        )) : Promise.resolve();

                    });

                });

            }).then((): void => {
                this._descriptorValidated = true;
            });

        }

}
