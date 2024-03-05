import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { Guard } from "../Guard/Guard";
import { Student } from "../Student/Student";
import { StudentEntrance } from "./StudentEntrance";

export interface StudentEntranceRepository extends CRUDRepository<number, StudentEntrance>{
    findStudentById(id: number): Promise<Student>;
    findGuardById(id: number): Promise<Guard>;
}