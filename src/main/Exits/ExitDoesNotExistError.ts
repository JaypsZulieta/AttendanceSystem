export class ExitDoesNotExistError extends Error{
    constructor(id: number){
        super(`exit with id ${id} does not exist`);
    }
}