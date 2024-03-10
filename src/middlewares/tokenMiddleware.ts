import { Context } from "hono";
import { AuthHeaderMissingError } from "./AuthHeaderMissingError";

export const tokenMiddleware = async (c: Context, next: Function) => {
    const authHeader = c.req.header("Authorization");
    if(!authHeader) throw new AuthHeaderMissingError();
    const token = (authHeader as string).split("Bearer ")[1];
    c.set("token", token);
    await next();
}