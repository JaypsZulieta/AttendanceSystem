import { Guard } from "./Guard";
import { GuardService } from "./GuardService";
import { PasswodEncoder } from "../PasswordEncoder/PasswordEncoder";
import { GuardRepository } from "./GuardRepository";
import { IllegalStateError } from "./IllegalStateError";

export class GuardServiceImpl implements GuardService{

    protected passwordEncoder: PasswodEncoder;
    protected guardRepository: GuardRepository;

    constructor(dependencies: {
        passwordEncoder: PasswodEncoder,
        guardRepository: GuardRepository
    }){
        this.passwordEncoder = dependencies.passwordEncoder;
        this.guardRepository = dependencies.guardRepository;
    }

    public async registerRootAdmin(entity: Guard): Promise<Guard> {
        if(await this.guardRepository.count() > 0)
            throw new IllegalStateError("There is already a root admin");
        entity.role = "admin";
        entity.encodedPassword = await this.passwordEncoder.encode(entity.encodedPassword);
        return await this.guardRepository.save(entity);
    }

}