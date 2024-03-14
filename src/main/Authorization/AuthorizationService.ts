export interface AuthorizationService{
    checkIfUser(token: string): Promise<boolean>;
    checkIfAdmin(token: string): Promise<boolean>;
    checkIfResourseOwner(token: string, resourceOwnerId: string): Promise<boolean>;
}