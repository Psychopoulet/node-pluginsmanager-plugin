//  deps

    // locals
    import DescriptorUser, { type iDescriptorUserOptions } from "./DescriptorUser";
    import Mediator from "./Mediator";

// types & interfaces

    export interface iMediatorUserOptions extends iDescriptorUserOptions {
        "mediator"?: Mediator; // not sended by Orchestrator
    }

// module

// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic
export default class MediatorUser extends DescriptorUser {

    // attributes

        // protected

            protected _Mediator: Mediator | null; // provided by "mediator" option, sent by the [Orchestrator](./Orchestrator.md)

    // constructor

    public constructor (options: iMediatorUserOptions) {

        super(options);

        this._Mediator = options && "undefined" !== typeof options.mediator
            ? options.mediator
            : null;

    }

    // protected

        protected _initWorkSpace (...data: any): Promise<void> {

            return Promise.resolve();

        }

        protected _releaseWorkSpace (...data: any): Promise<void> {

            return Promise.resolve();

        }

    // public

        public checkMediator (): Promise<void> {

            if ("undefined" === typeof this._Mediator || null === this._Mediator) {

                return Promise.reject(new ReferenceError("Mediator not registered"));

            }
            else if ("object" !== typeof this._Mediator || !(this._Mediator instanceof Mediator)) {

                return Promise.reject(new TypeError(
                    "The plugin has an invalid Mediator which is not an instance (or a child) of the official Mediator class"
                ));

            }
            else {

                return Promise.resolve();

            }

        }

}
