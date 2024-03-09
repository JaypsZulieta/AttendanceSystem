export interface AuthenticationService<TCredentials, TAuthentication, TRefreshAuthentication>{
    authentication(credentials: TCredentials): Promise<TAuthentication>;
    refreshAuthentication(token: string): Promise<TRefreshAuthentication>;
} 

