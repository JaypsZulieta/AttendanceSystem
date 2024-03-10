export class AuthHeaderMissingError extends Error{
    constructor(){
        super("Authorization header is missing");
    }
}