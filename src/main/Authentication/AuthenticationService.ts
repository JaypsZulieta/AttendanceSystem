export interface AuthenticationService<TCred, TAuth>{
    authenticate(credentials: TCred): Promise<TAuth>;
}