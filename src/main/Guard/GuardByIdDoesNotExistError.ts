export class GuardByIdDoesNotExistError extends Error{
    constructor(id: string){
        super(`guard with id ${id} does not exist`);
    }
}