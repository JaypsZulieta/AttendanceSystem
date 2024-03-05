export class EntranceDoesNotExistError extends Error{
    constructor(id: number){
        super(`entrance with id ${id} does not exist`);
    }
}