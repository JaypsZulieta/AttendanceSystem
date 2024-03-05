import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { Strand } from "../Strand/Strand";
import { Student } from "../Student/Student";
import { Section } from "./Section";

export interface SectionRepository extends CRUDRepository<number, Section>{
    findBySectionName(sectionName: string): Promise<Section>;
    existBySectionName(sectionName: string): Promise<boolean>;
    findByGradeLevel(gradeLevel: "G11" | "G12", paginationOptions: PaginationOptions): Promise<PaginatedContent<Section>>;
    findStrandById(id: number): Promise<Strand>;
    findStudentsById(id: number, paginationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
}