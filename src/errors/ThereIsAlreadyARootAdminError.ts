export class ThereIsAlreadyARootAdminError extends Error{
    constructor(){
        super("There is already a root admin");
    }
}