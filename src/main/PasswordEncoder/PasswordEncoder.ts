export interface PasswodEncoder{
    encode(password: string): Promise<string>;
    comparePasswords(data: { plainTextPassword: string, encodedPassword: string }): Promise<boolean>;
}