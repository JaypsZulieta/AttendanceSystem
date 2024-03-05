import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { StudentExit } from "../Exits/StudentExit";
import { Section } from "../Section/Section";
import { Strand } from "../Strand/Strand";
import { Student } from "./Student";

export interface StudentRepository extends CRUDRepository<string, Student>{
    findExitsByLrn(lrn: string, paganationOptions: PaginationOptions): Promise<PaginatedContent<StudentExit>>;
    findEntrancesByLrn(lrn: string, paganationOptions: PaginationOptions): Promise<PaginatedContent<StudentEntrance>>;
    findByFirstName(firstname: string, paganationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findByMiddleName(middlename: string, paganationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findByLastname(lastname: string, paganationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findByGender(sex: "male" | "female", paganationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findByGradeLevel(gradeLevel: "G11" | "G12", paganationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findByGuardianPhonenumber(phonenumber: string, paganationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findSectionByLRN(lrn: string): Promise<Section>;
    findStrandByLrn(lrn: string): Promise<Strand>;
    findLatestEntry(lrn: string): Promise<StudentEntrance | null>;
}