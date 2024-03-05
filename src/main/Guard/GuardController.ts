import { Controller } from "../../lib/controllers/Controller";
import { Context, Hono } from "hono";

export class GuardController extends Controller{

    constructor(dependencies: {
        rootPath: string,
        hono: Hono
    }){
        super(dependencies.hono);
        this.hono.get(`${dependencies.rootPath}/guards`, this.getGuard);
    }


    protected getGuard(c: Context) {
        return c.json({ message: 'this route is suppose to make guards'})
    }

}