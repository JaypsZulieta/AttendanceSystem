import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { Guard } from "../Guard/Guard";
import { Student } from "../Student/Student";
import { StudentExit } from "./StudentExit";

export interface StudentExitRepository extends CRUDRepository<number, StudentExit>{
    findEntranceById(id: number): Promise<StudentEntrance>;
    findGuardById(id: number): Promise<Guard>;
    findStudentById(id: number): Promise<Student>;
}