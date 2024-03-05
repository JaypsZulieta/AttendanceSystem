export class SectionBySectionNameDoesNotExistError extends Error{
    constructor(sectionName: string){
        super(`${sectionName} does not exist`)
    }
}