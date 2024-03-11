import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { guardRoute } from "./routes/GuardRoute";
import { UnauthorizedError } from "./errors/UnauthorizedError";
import { IncorrectEmailOrPasswordError } from "./main/Authentication/IncorrectEmailOrPasswordError";
import { authRoute } from "./routes/AuthRoute";
import { EmailUnavailableError } from "./main/Guard/EmailUnavailableError";
import { JsonWebTokenError } from "jsonwebtoken";
import { AuthHeaderMissingError } from "./middlewares/AuthHeaderMissingError";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const app = new Hono();




app.route("/api/v1/guards", guardRoute);
app.route("/api/v1/auth", authRoute);

app.onError(async (err, c) => {
    const { message } = err;
    switch(true){
        case err instanceof PrismaClientValidationError:
            c.status(400);
            return c.json({ message: 'bad request'});
        case err instanceof UnauthorizedError:
            c.status(401);
            return c.json({ message });
        case err instanceof IncorrectEmailOrPasswordError:
            c.status(401);
            return c.json({ message });
        case err instanceof EmailUnavailableError:
            c.status(409);
            return c.json({ message });
        case err instanceof SyntaxError:
            c.status(400);
            return c.json({ message: 'bad request'});
        case err instanceof JsonWebTokenError:
            c.status(401);
            return c.json({ message: 'You are unauthorized'});
        case err instanceof AuthHeaderMissingError:
            c.status(400);
            return c.json({ message });
        default:
            console.error(err);
            c.status(500);
            return c.json({ message: 'server error'});
    }
});


console.log("server started on port 8080");
serve({ fetch: app.fetch, port: 8080});