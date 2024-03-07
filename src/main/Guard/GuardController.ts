import { Context } from "hono";

export interface GuardController{
    registerRootAdmin(c: Context): Promise<Response>;
    registerGuard(c: Context): Promise<Response>;
    activateGuard(c: Context): Promise<Response>;
    findGuard(c: Context): Promise<Response>;
    findGuards(c: Context): Promise<Response>;
    updateGuard(c: Context): Promise<Response>;
    updateGuardProfilePic(c: Context): Promise<Response>;
    deactivateGuard(c: Context): Promise<Response>;
}