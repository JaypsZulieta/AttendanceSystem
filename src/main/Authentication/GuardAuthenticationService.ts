import { JsonWebTokenError } from "jsonwebtoken";
import { Guard } from "../Guard/Guard";
import { GuardService } from "../Guard/GuardService";
import { PasswordValidator } from "../PasswordValidator/PasswordValidator";
import { GuardPayload } from "../Token/GuardPayload";
import { TokenService } from "../Token/TokenService";
import { Authentication } from "./Authentication";
import { AuthenticationService } from "./AuthenticationService";
import { EmailPasswordCredentials } from "./EmailPasswordCredentials";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";
import { RefreshAuthentication } from "./RefreshAuthentication";

export class GuardAuthenticationService implements AuthenticationService<
    EmailPasswordCredentials,
    Authentication<Guard>,
    RefreshAuthentication
>{

    protected jwtSecretKey: string;
    protected refreshTokenSecretKey: string;
    protected tokenService: TokenService<GuardPayload>;
    protected guardService: GuardService;
    protected passwordValidator: PasswordValidator;

    constructor(dependencies: {
        jwtSecretKey: string,
        refreshTokenSecretKey: string,
        tokenService: TokenService<GuardPayload>;
        guardService: GuardService;
        passwordValidator: PasswordValidator;
    }){
        this.jwtSecretKey = dependencies.jwtSecretKey;
        this.refreshTokenSecretKey = dependencies.refreshTokenSecretKey;
        this.tokenService = dependencies.tokenService;
        this.guardService = dependencies.guardService;
        this.passwordValidator = dependencies.passwordValidator;
    }
    
    public async authentication(credentials: EmailPasswordCredentials): Promise<Authentication<Guard>> {
        const guard = await this.guardService.findByEmail(credentials.email);
        const passwordIsIncorrect = !await this.passwordValidator.validatePassword({
            plainTextPassword: credentials.password,
            encodedPassword: guard.encodedPassword
        });
        if(passwordIsIncorrect) 
            throw new IncorrectEmailOrPasswordError();
        const guardPayload = ({ id: guard.id as string, email: guard.email }) satisfies GuardPayload;
        const accessToken = this.tokenService.signToken(guardPayload, this.jwtSecretKey, { expiresIn: '10mins'});
        const refreshToken = this.tokenService.signToken(guardPayload, this.refreshTokenSecretKey, { expiresIn: '8hrs'});
        return { user: guard, accessToken, refreshToken };
    }

    public async refreshAuthentication(token: string): Promise<RefreshAuthentication> {
        const guardPayload = this.tokenService.validateAndDecodeToken(token, this.refreshTokenSecretKey);
        if(!await this.guardService.existByEmail(guardPayload.email)) 
            new JsonWebTokenError("Invalid token");
        const accessToken = this.tokenService.signToken(guardPayload, this.jwtSecretKey, { expiresIn: '10mins'});
        const refreshToken = this.tokenService.signToken(guardPayload, this.refreshTokenSecretKey, { expiresIn: '8hrs'});
        return { accessToken, refreshToken };
    }
}