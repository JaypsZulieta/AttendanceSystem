import { PasswordValidator } from "./PasswordValidator";
import { compare } from "bcrypt";

export class BcrptPasswordValidator implements PasswordValidator{
    public async validatePassword(passwods: { plainTextPassword: string; encodedPassword: string; }): Promise<boolean> {
        const {  plainTextPassword, encodedPassword } = passwods;
        return compare(plainTextPassword, encodedPassword);
    }
}