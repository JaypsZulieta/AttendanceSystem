import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { StudentExit } from "../Exits/StudentExit";
import { Guard } from "./Guard";

export interface GuardService{
    registerGuard(entity: Guard): Promise<Guard>;
    registerRootAdmin(entity: Guard): Promise<Guard>;
    findAllGuards(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findAllActiveGuards(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findAllDisabledGuards(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findGuardById(id: string): Promise<Guard>;
    findGuardByEmail(email: string): Promise<Guard>;
    countAllGuards(): Promise<number>;
    countAllActiveGuards(): Promise<number>;
    updateGuard(entity: Guard): Promise<Guard>;
    findAllAdmins(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findAllNonAdmins(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    countEntrancesCheckedByGuardId(guardId: string): Promise<number>;
    countExitsCheckedByGuardId(guardId: string): Promise<number>
    findEntrancesCheckedByGuardId(guardId: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<StudentEntrance>>;
    findExitsCheckedByGuardId(guardId: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<StudentExit>>;
    existByEmail(email: string): Promise<boolean>;
    existById(id: string): Promise<boolean>;
    findById(id: string): Promise<Guard>;
    findByEmail(email: string): Promise<Guard>;
    findGuardByGender(gender: "male" | "female", paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByGuardFirstname(firstname: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByGuardMiddlename(middlename: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByGuardLastname(lastname: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
}