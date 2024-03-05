export class StudentByLRNDoesNotExistError extends Error{
    constructor(lrn: string){
        super(`student with lrn '${lrn}' does not exist`);
    }
}