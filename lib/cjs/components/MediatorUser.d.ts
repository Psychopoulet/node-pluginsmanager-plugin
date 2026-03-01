import DescriptorUser from "./DescriptorUser";
import Mediator from "./Mediator";
import type { iDescriptorUserOptions, tEventMap, iEventsNoEvent } from "./DescriptorUser";
export interface iMediatorUserOptions extends iDescriptorUserOptions {
    "mediator"?: Mediator;
}
export default class MediatorUser<T extends tEventMap<T> = iEventsNoEvent> extends DescriptorUser<T> {
    protected _Mediator: Mediator | null;
    constructor(options: iMediatorUserOptions);
    protected _initWorkSpace(...data: unknown[]): Promise<void>;
    protected _releaseWorkSpace(...data: unknown[]): Promise<void>;
    checkMediator(): Promise<void>;
}
