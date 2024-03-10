import { Context, Hono } from "hono";
import { Guard } from "../main/Guard/Guard";
import { guardAuthenticationService, guardAuthorizationService, guardService } from "../services";
import { ThereIsAlreadyARootAdminError } from "./ThereIsAlreadyARootAdminError";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { UnauthorizedError } from "./UnauthorizedError";

export const guardRoute = new Hono();

guardRoute.post("/root", async (c) => {
    const entity = await c.req.json() as Guard;
    const plainTextPassword = entity.password;
    const { email } = await guardService.registerRootAdmin(entity);
    const authentication = await guardAuthenticationService.authentication({
        email: email,
        password: plainTextPassword
    });
    const { user, ...tokens } = authentication;
    const { password, ...guardPublicInfo } = user;
    c.status(201);
    return c.json({ user: guardPublicInfo, ...tokens });
});

guardRoute.post("/", tokenMiddleware, async (c: Context) => {
    const token = c.get('token') as string;
    const entity = await c.req.json() as Guard;
    const isAdmin = await guardAuthorizationService.checkIfAdmin(token);
    if(!isAdmin) throw new UnauthorizedError();
    const { password, ...guard } = await guardService.registerGuard(entity);
    c.status(201);
    return c.json(guard);
});