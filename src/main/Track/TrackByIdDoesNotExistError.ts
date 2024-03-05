export class TrackByIdDoesNotExistError extends Error{
    constructor(id: number){
        super(`track with id '${id}' does not exist`);
    }
}