export class GuardByEmailDoesNotExistError extends Error{
    constructor(email: string){
        super(`guard with ${email} does not exist`);
    }
}