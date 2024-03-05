import { Hono } from "hono";

export abstract class Controller{
    protected hono: Hono;
    constructor(hono: Hono){
        this.hono = hono;
    }
    public getRoute(): Hono{
        return this.hono;
    }
}