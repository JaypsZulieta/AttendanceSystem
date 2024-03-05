export class StrandNameUnavailableError extends Error{
    constructor(strandName: string){
        super(`${strandName} is unavailable`);
    }
}