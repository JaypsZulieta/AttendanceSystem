export class SectionNameUnavailableError extends Error{
    constructor(sectionName: string){
        super(`${sectionName} is unavailable`);
    }
}