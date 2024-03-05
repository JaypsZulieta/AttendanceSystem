export class EmailUnavailableError extends Error{
    constructor(email: string){
        super(`${email} is unavailable`);
    }
}