import { Context, Hono } from "hono";
import { Guard } from "../main/Guard/Guard";
import { guardAuthenticationService, guardAuthorizationService, guardService } from "../services";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export const guardRoute = new Hono();

guardRoute.post("/root", async (c) => {
    const entity = await c.req.json() as Guard;
    const password = entity.password;
    const { email } = await guardService.registerRootAdmin(entity);
    const authentication = await guardAuthenticationService.authentication({ email, password });
    const { user, ...tokens } = authentication;
    const { password: encodedPassword, ...guardPublicInfo } = user;
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

guardRoute.get("/", tokenMiddleware, async (c: Context) => {
    const token = c.get('token') as string;
    const isUser = await guardAuthorizationService.checkIfUser(token);
    if(!isUser) throw new UnauthorizedError();

    let page = 1;
    let limit = 10;
    const pageQuery = c.req.query('page');
    const limitQuery = c.req.query('limit');
    
    if(pageQuery && isNaN(Number(pageQuery)))
        page = 1;
    else if (pageQuery && !isNaN(Number(pageQuery)))
        page = Number(pageQuery);

    if(limitQuery && isNaN(Number(limitQuery)))
        limit = 10;
    else if (limitQuery && !isNaN(Number(limitQuery)))
        limit = Number(limitQuery);
    
    const { content, ...pageStats } = await guardService.findAllGuards({ page, limit });
    const guards = content.map(({ password, ...guard }) => guard);
    return c.json({ ...pageStats, guards });
});