import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { StudentExit } from "../Exits/StudentExit";
import { Guard } from "./Guard";

export interface GuardRepository extends CRUDRepository<string, Guard>{
    findByRole(role: "admin" | "guard", paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByGender(gender: "male" | "female", paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByFirstname(firstname: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByMiddlename(middlename: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findByLastname(lastname: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findActive(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    findDisabled(paginationOptions: PaginationOptions): Promise<PaginatedContent<Guard>>;
    countEntrancesCheckedById(id: string): Promise<number>;
    countExitsCheckedById(id: string): Promise<number>;
    findEntrancesCheckedById(id: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<StudentEntrance>>;
    findExitsCheckedById(id: string, paginationOptions: PaginationOptions): Promise<PaginatedContent<StudentExit>>;
    existByEmail(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<Guard>;
}