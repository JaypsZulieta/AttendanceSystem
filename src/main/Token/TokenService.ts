import { SignOptions } from "jsonwebtoken";

export interface TokenService<TPayload> {
    signToken(payload: TPayload, signOptions: SignOptions): string;
    validateAndDecodeToken(token: string): Promise<TPayload>;
}