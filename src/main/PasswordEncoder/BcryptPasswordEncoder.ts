import { PasswodEncoder } from "./PasswordEncoder";
import { hash, compare } from "bcrypt";


export class BcryptPasswordEncdoer implements PasswodEncoder{
    public async encode(password: string): Promise<string> {
        return hash(password, 10);
    }
    comparePasswords(data: { plainTextPassword: string; encodedPassword: string; }): Promise<boolean> {
        return compare(data.plainTextPassword, data.encodedPassword);
    }
}