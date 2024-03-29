import { PasswodEncoder } from "./PasswordEncoder";
import { hash } from "bcrypt";


export class BcryptPasswordEncoder implements PasswodEncoder{
    public async encode(password: string): Promise<string> {
        return hash(password, 10);
    }
}