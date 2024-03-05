export class StudentLRNUnavailableError extends Error{
    constructor(lrn: string){
        super(`lrn '${lrn}' is unavailable`);
    }
}