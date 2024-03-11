import { Hono } from "hono";
import { EmailPasswordCredentials } from "../main/Authentication/EmailPasswordCredentials";
import { guardAuthenticationService } from "../services";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { Context } from "hono";

export const authRoute = new Hono();

authRoute.post('/', async (c) => {
    const credentials = await c.req.json() as EmailPasswordCredentials;
    const authentication = await guardAuthenticationService.authentication(credentials);
    const { user, ...tokens } = authentication;
    const { password, ...guard } = user;
    return c.json({ guard, ...tokens });
});

authRoute.put('/', tokenMiddleware, async (c: Context) => {
    const token = c.get('token') as string;
    const refreshAuthentication = await guardAuthenticationService.refreshAuthentication(token);
    return c.json(refreshAuthentication);
});