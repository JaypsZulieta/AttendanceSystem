export class StrandByStrandNameDoesNotExistError extends Error{
    constructor(strandName: string){
        super(`${strandName} does not exist`);
    }
}