export class SectionBySectionIdDoesNotExistError extends Error{
    constructor(id: number){
        super(`section with id ${id} does not exist`); 
    }
}