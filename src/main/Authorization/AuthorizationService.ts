export interface AuthorizationService{
    authorizeAsAdmin(token: string): Promise<boolean>;
    authorizeAsResourseOwner(token: string, resourceOwnerId: string): Promise<boolean>;
}