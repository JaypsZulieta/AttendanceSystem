export class IncorrectEmailOrPasswordError extends Error{
    constructor(){
        super("incorrect email or password");
    }
}