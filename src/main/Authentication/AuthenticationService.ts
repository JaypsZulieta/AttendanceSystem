export interface AuthenticationService<TCredentials, TAuthentication>{
    authentication(credentials: TCredentials): Promise<TAuthentication>;
} 

