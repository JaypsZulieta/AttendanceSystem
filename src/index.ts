import { Hono } from "hono";
import { serve } from "@hono/node-server";


export class AttendanceSystem{

    protected port: number;
    protected hono: Hono;

    constructor(dependencies: {
        port: number,
        hono: Hono
    }){
        this.hono = dependencies.hono;
        this.port = dependencies.port;
    }

    public startServer(): void{
        console.log(`server started on port ${this.port}`);
        serve({ fetch: this.hono.fetch, port: this.port});
    }
}