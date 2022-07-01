import DescriptorUser, { iDescriptorUserOptions } from "./DescriptorUser";
import Mediator from "./Mediator";
export interface iMediatorUserOptions extends iDescriptorUserOptions {
    "mediator"?: Mediator;
}
export default class MediatorUser extends DescriptorUser {
    protected _Mediator: Mediator | null;
    constructor(options: iMediatorUserOptions);
    _initWorkSpace(...data: any): Promise<void>;
    _releaseWorkSpace(...data: any): Promise<void>;
    checkMediator(): Promise<void>;
}
