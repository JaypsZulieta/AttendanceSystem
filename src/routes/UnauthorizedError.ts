export class UnauthorizedError extends Error{
    constructor(){
        super("You are unauthorized");
    }
}