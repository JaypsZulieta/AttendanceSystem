import { SignOptions } from "jsonwebtoken";

export interface TokenService<TPayload> {
    signToken(payload: TPayload, secretKey: string, signOptions: SignOptions): string;
    validateAndDecodeToken(token: string): Promise<TPayload>;
}