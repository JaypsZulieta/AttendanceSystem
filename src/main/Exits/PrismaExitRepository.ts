import { PrismaClient } from "@prisma/client";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { Guard } from "../Guard/Guard";
import { GuardRepository } from "../Guard/GuardRepository";
import { Student } from "../Student/Student";
import { StudentRepository } from "../Student/StudentRepository";
import { StudentExit } from "./StudentExit";
import { StudentExitRepository } from "./StudentExitRepository";
import { ExitDoesNotExistError } from "./ExitDoesNotExistError";

export class PrismaExitRepository extends PrismaRepository implements StudentExitRepository{

    protected guardRepository: GuardRepository;
    protected studentRepository: StudentRepository;

    constructor(dependencies: {
        guardRepository: GuardRepository,
        studentRepository: StudentRepository,
        prismaClient: PrismaClient
    }){
        super(dependencies.prismaClient);
        this.guardRepository = dependencies.guardRepository;
        this.studentRepository = dependencies.studentRepository;
    }

    public async findEntranceById(id: number): Promise<StudentEntrance> {
        if(!await this.existByPk(id))
            throw new ExitDoesNotExistError(id);
        const exit = await this.findByPk(id);
        return await this.prisma.studentEntrances.findUniqueOrThrow({ where: { id: exit.entranceId }});
    }

    public async findGuardById(id: number): Promise<Guard> {1
        if(!await this.existByPk(id))
            throw new ExitDoesNotExistError(id);
        const exit = await this.findByPk(id);
        return await this.guardRepository.findByPk(exit.guardId);
    }

    public async findStudentById(id: number): Promise<Student> {
        if(!await this.existByPk(id))
            throw new ExitDoesNotExistError(id);
        const exit = await this.findByPk(id);
        const entrance = await this.findEntranceById(exit.entranceId);
        return await this.studentRepository.findByPk(entrance.studentLrn);
    }

    public async save(entity: StudentExit): Promise<StudentExit> {
        if(entity.id && await this.existByPk(entity.id))
            return await this.prisma.studentExits.update({ data: entity, where: { id: entity.id } });
        return await this.prisma.studentExits.create({ data: entity });
    }

    public async findByPk(pk: number): Promise<StudentExit> {
        if(!await this.existByPk(pk))
            throw new ExitDoesNotExistError(pk);
        return await this.prisma.studentExits.findUniqueOrThrow({ where: { id: pk }});
    }

    public async findAll(page: number, limit: number): Promise<PaginatedContent<StudentExit>> {
        const totalItems = await this.count();
        const currentPage = page;
        const totalPages = Math.ceil(totalItems / limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * limit;
        const content = await this.prisma.studentExits.findMany({ skip, take: limit, orderBy: { timeExited: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.studentExits.count();
    }

    public async existByPk(pk: number): Promise<boolean> {
        return await this.prisma.studentExits.count() > 0;
    }

    public async deleteByPk(pk: number): Promise<void> {
        if(!await this.existByPk(pk))
            throw new ExitDoesNotExistError(pk);
        await this.prisma.studentExits.delete({ where:{ id: pk }});
    }

}