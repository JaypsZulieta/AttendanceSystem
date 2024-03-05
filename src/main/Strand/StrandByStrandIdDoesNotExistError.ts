export class StrandByStrandIdDoesNotExistError extends Error{
    constructor(id: number){
        super(`strand by id '${id}' does not exist`);
    }
}