"use strict";

//  deps

	// natives
	import Events from "events";

	// locals
	import { OpenApiDocument } from "express-openapi-validate";
	import checkObject from "../checkers/TypeError/checkObject";
	import checkNonEmptyObject from "../checkers/RangeError/checkNonEmptyObject";
	import checkNonEmptyString from "../checkers/RangeError/checkNonEmptyString";

// types & interfaces

	export type tLogType = "log" | "info" | "success" | "warning" | "error";
	export type tLogger = (type: tLogType, message: string, bold?: boolean, pluginName?: string) => void;

	export interface iDescriptorUserOptions {
		"descriptor": OpenApiDocument;
		"externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
		"logger"?: tLogger;
	};

// consts

	const LOG_TYPES_ALLOWED: Array<tLogType> = [ "log", "info", "success", "warning", "error" ];

// module

export default class DescriptorUser extends Events {

	// attributes

		// public

		public initialized: boolean;

		// protected

		protected _descriptorValidated: boolean;
		protected _externalRessourcesDirectory: string;
		protected _Descriptor: OpenApiDocument | null;
		protected _Logger: tLogger | null;

	// constructor

	public constructor (options: iDescriptorUserOptions) {

		super();

		// public

			this.initialized = false;

		// protected

			this._descriptorValidated = false;

			this._externalRessourcesDirectory = options && "string" === typeof options.externalRessourcesDirectory ?
				options.externalRessourcesDirectory : "";

			this._Descriptor = options && "object" === typeof options.descriptor ?
				options.descriptor : null;

			this._Logger = options && "function" === typeof options.logger ?
				options.logger : null;

	}

	// protected

		// must be inherited
		protected _initWorkSpace (data?: any): Promise<void> {

			return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));

		}

		// must be inherited
		protected _releaseWorkSpace (data?: any): Promise<void> {

			return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));

		}

		protected _log(type: tLogType, message: string, bold?: boolean): this {

			if (message && "function" === typeof this._Logger && LOG_TYPES_ALLOWED.includes(type)) {
				(this._Logger as tLogger)(type, message, bold, this.getPluginName());
			}

			return this;

		}

	// public

		getPluginName (): string {
			return this._Descriptor && this._Descriptor.info && this._Descriptor.info.title ? this._Descriptor.info.title : "";
		}

		getPluginVersion (): string {
			return this._Descriptor && this._Descriptor.info && this._Descriptor.info.version ? this._Descriptor.info.version : "";
		}

		getPluginDescription (): string {
			return this._Descriptor && this._Descriptor.info && this._Descriptor.info.description ? this._Descriptor.info.description : "";
		}

		// must be inherited
		init (): Promise<void> {

			return Promise.reject(new Error("\"init\" method must be inherited"));

		}

		// must be inherited
		release (): Promise<void> {

			return Promise.reject(new Error("\"release\" method must be inherited"));

		}

		// must be inherited
		checkDescriptor (): Promise<void> {

			// check Descriptor object
			return this._descriptorValidated ? Promise.resolve() : (checkNonEmptyObject("Descriptor", this._Descriptor) as Promise<void>).then((): Promise<void> => {

				// check info object
				return (checkNonEmptyObject("Descriptor.info", (this._Descriptor as OpenApiDocument).info) as Promise<void>).then((): Promise<void> => {

					// check title
					return (checkNonEmptyString("Descriptor.info.title", (this._Descriptor as OpenApiDocument).info.title) as Promise<void>).then((): Promise<void> => {

						return (this._Descriptor as OpenApiDocument).info.title !== (this._Descriptor as OpenApiDocument).info.title.toLowerCase() ?
						Promise.reject(new Error(
							"The descriptor's title (\"" + (this._Descriptor as OpenApiDocument).info.title + "\") " +
							"is not equals in lower case (package.json convention)"
						)) : Promise.resolve();

					// check version
					}).then((): Promise<void> => {
						return (checkNonEmptyString("Descriptor.info.version", (this._Descriptor as OpenApiDocument).info.version) as Promise<void>);
					});

				});

			}).then((): Promise<void> => {

				// check paths object
				return (checkObject("Descriptor.paths", (this._Descriptor as OpenApiDocument).paths) as Promise<void>).then((): Promise<void> => {

					// check multiple operationIds
					return Promise.resolve().then((): Promise<void> => {

						const operationIds: Array<string> = [];
						Object.keys((this._Descriptor as OpenApiDocument).paths).forEach((p): void => {

							Object.keys((this._Descriptor as OpenApiDocument).paths[p]).forEach((m: string): void => {

								if ((this._Descriptor as OpenApiDocument).paths[p][m].operationId) {
									operationIds.push((this._Descriptor as OpenApiDocument).paths[p][m].operationId);
								}

							});

						});

						let multiple: boolean = false;
						for (let i: number = 0; i < operationIds.length - 1; ++i) {

							for (let j: number = i + 1; j < operationIds.length; ++j) {

								if (operationIds[i] === operationIds[j]) {
									multiple = true; break;
								}

							}

							if (multiple) {
								break;
							}

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

};
