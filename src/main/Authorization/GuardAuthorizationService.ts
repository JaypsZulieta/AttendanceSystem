import { GuardService } from "../Guard/GuardService";
import { GuardPayload } from "../Token/GuardPayload";
import { TokenService } from "../Token/TokenService";
import { AuthorizationService } from "./AuthorizationService";

export class GuardAuthorizationService implements AuthorizationService{

    protected guardService: GuardService;
    protected tokenService: TokenService<GuardPayload>;
    protected jwtSecretKey: string;

    constructor(dependencies: {
        guardService: GuardService,
        tokenService: TokenService<GuardPayload>
        jwtSecretKey: string
    }){
        this.guardService = dependencies.guardService;
        this.tokenService = dependencies.tokenService;
        this.jwtSecretKey = dependencies.jwtSecretKey;
    }

    public async checkIfAdmin(token: string): Promise<boolean> {
        try{
            const guardPayload = this.tokenService.validateAndDecodeToken(token, this.jwtSecretKey);
            const guard = await this.guardService.findById(guardPayload.id);
            return guard.role === "admin";
        }
        catch(err){
            return false;
        }
    }

    public async checkIfResourseOwner(token: string, resourceOwnerId: string): Promise<boolean> {
        try{
            const guardPayload = this.tokenService.validateAndDecodeToken(token, this.jwtSecretKey);
            const guard = await this.guardService.findById(guardPayload.id);
            return guard.id === resourceOwnerId;
        }
        catch(err){
            return false;
        }
    }
}