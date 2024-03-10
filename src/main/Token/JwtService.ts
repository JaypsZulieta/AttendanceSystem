import { SignOptions, sign, verify } from "jsonwebtoken";
import { GuardPayload } from "./GuardPayload";
import { TokenService } from "./TokenService";

export class JwtService implements TokenService<GuardPayload>{
    public signToken(payload: GuardPayload, secretKey: string, signOptions: SignOptions): string {
        return sign(payload, secretKey, signOptions);
    }
    public validateAndDecodeToken(token: string, secretKey: string): GuardPayload {
        const { id, email } = verify(token, secretKey) as GuardPayload;
        return { id, email };
    }
}