export interface AuthorizationService{
    checkIfAdmin(token: string): Promise<boolean>;
    checkIfResourseOwner(token: string, resourceOwnerId: string): Promise<boolean>;
}