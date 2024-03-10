import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { StudentExit } from "../Exits/StudentExit";
import { PasswodEncoder } from "../PasswordEncoder/PasswordEncoder";
import { Guard } from "./Guard";
import { GuardRepository } from "./GuardRepository";
import { GuardService } from "./GuardService";

export class GuardServiceImpl implements GuardService{

    protected guardRepository: GuardRepository;
    protected passwordEncoder: PasswodEncoder;

    constructor(dependencies: {
        guardRepository: GuardRepository,
        passwordEncoder: PasswodEncoder
    }){
        this.guardRepository = dependencies.guardRepository;
        this.passwordEncoder = dependencies.passwordEncoder;
    }

    public async findById(id: string): Promise<Guard> {
        return await this.guardRepository.findByPk(id);
    }

    public async registerGuard(entity: Guard): Promise<Guard> {
        entity.id = undefined;
        entity.role = "guard";
        entity.password = await this.passwordEncoder.encode(entity.password);
        return await this.guardRepository.save(entity);
    }

    public async registerAdmin(entity: Guard): Promise<Guard> {
        entity.id = undefined;
        entity.role = "admin";
        entity.password = await this.passwordEncoder.encode(entity.password);
        return await this.guardRepository.save(entity);
    }

    public async findAllGuards(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>> {
        const { page, limit } = paginationOptions;
        return await this.guardRepository.findAll(page, limit);
    }

    public async findAllActiveGuards(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findActive(paginationOptions);
    }

    public async findAllDisabledGuards(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findDisabled(paginationOptions);
    }

    public async findGuardById(id: string): Promise<Guard> {
        return await this.guardRepository.findByPk(id);
    }

    public async findGuardByEmail(email: string): Promise<Guard> {
        return await this.guardRepository.findByEmail(email);
    }

    public async countAllGuards(): Promise<number> {
        return await this.guardRepository.count();
    }

    public async countAllActiveGuards(): Promise<number> {
        const { totalItems } = await this.guardRepository.findActive({ page:1, limit: 2});
        return totalItems;
    }

    public async findAllAdmins(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findByRole("admin", paginationOptions);
    }

    public async findAllNonAdmins(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findByRole("guard", paginationOptions);
    }

    public async countEntrancesCheckedByGuardId(guardId: string): Promise<number> {
        return await this.guardRepository.countEntrancesCheckedById(guardId);
    }

    public async countExitsCheckedByGuardId(guardId: string): Promise<number> {
        return await this.guardRepository.countExitsCheckedById(guardId);
    }

    public async findEntrancesCheckedByGuardId(
        guardId: string, 
        paginationOptions: PaginationOptions
    ): Promise<PaginatedContent<StudentEntrance>> {
        return await this.guardRepository.findEntrancesCheckedById(guardId, paginationOptions);
    }

    public async findExitsCheckedByGuardId(
        guardId: string, 
        paginationOptions: PaginationOptions
    ): Promise<PaginatedContent<StudentExit>> {
        return await this.guardRepository.findExitsCheckedById(guardId, paginationOptions);
    }

    public async existByEmail(email: string): Promise<boolean> {
        return await this.guardRepository.existByEmail(email);
    }

    public async findByEmail(email: string): Promise<Guard> {
        return await this.guardRepository.findByEmail(email);
    }

    public async findGuardByGender(
        gender: "male" | "female", 
        paginationOptions: PaginationOptions
    ): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findByGender(gender, paginationOptions);
    }

    public async findByGuardFirstname(
        firstname: string, 
        paginationOptions: PaginationOptions
    ): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findByFirstname(firstname, paginationOptions);
    }

    public async findByGuardMiddlename(
        middlename: string, 
        paginationOptions: PaginationOptions
    ): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findByMiddlename(middlename, paginationOptions);
    }

    public async findByGuardLastname(
        lastname: string, 
        paginationOptions: PaginationOptions
    ): Promise<PaginatedContent<Guard>> {
        return await this.guardRepository.findByLastname(lastname, paginationOptions);
    }
}