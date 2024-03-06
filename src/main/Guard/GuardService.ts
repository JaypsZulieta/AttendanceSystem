import { Guard } from "./Guard";

export interface GuardService{
    registerRootAdmin(entity: Guard): Promise<Guard>;
}