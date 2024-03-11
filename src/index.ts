import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { guardRoute } from "./routes/GuardRoute";
import { UnauthorizedError } from "./errors/UnauthorizedError";
import { IncorrectEmailOrPasswordError } from "./main/Authentication/IncorrectEmailOrPasswordError";

const app = new Hono();




app.route("/api/v1/guards", guardRoute);

app.onError(async (err, c) => {
    const { message } = err;
    switch(true){
        case err instanceof UnauthorizedError:
            c.status(401);
            return c.json({ message });
        case err instanceof IncorrectEmailOrPasswordError:
            c.status(401);
            return c.json({ message });
        default:
            console.error(err);
            c.status(500);
            return c.json({ message: 'server error'});
    }
});


console.log("server started on port 8080");
serve({ fetch: app.fetch, port: 8080});