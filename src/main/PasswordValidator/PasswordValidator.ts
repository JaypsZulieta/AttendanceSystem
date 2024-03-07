type Passwords = {
    plainTextPassword: string,
    encodedPassword: string,
}

export interface PasswordValidator{
    validatePassword(passwods: Passwords): Promise<boolean>;
}