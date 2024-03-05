import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { Section } from "../Section/Section";
import { Student } from "../Student/Student";
import { Track } from "../Track/Track";
import { Strand } from "./Strand";

export interface StrandRepository extends CRUDRepository<number, Strand>{
    findByStrandName(strandName: string): Promise<Strand>;
    existByStrandName(strandName: string): Promise<boolean>;
    findTrackById(id: number): Promise<Track>;
    findStudentsById(id: number, paginationOptions: PaginationOptions): Promise<PaginatedContent<Student>>;
    findSectionsById(id: number, paganationOptions: PaginationOptions): Promise<PaginatedContent<Section>>;
}