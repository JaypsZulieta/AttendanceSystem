import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { guardRoute } from "./routes/GuardRoute";

const app = new Hono();




app.route("/api/v1/guards", guardRoute);




console.log("server started on port 8080");
serve({ fetch: app.fetch, port: 8080});