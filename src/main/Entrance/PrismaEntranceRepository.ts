import { PrismaClient } from "@prisma/client";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { Guard } from "../Guard/Guard";
import { GuardRepository } from "../Guard/GuardRepository";
import { Student } from "../Student/Student";
import { StudentRepository } from "../Student/StudentRepository";
import { StudentEntrance } from "./StudentEntrance";
import { StudentEntranceRepository } from "./StudentEntranceRepository";
import { EntranceDoesNotExistError } from "./EntranceDoesNotExistError";

export class PrismaEntranceRepository extends PrismaRepository implements StudentEntranceRepository{

    protected guardRepository: GuardRepository;
    protected studenRepository: StudentRepository;

    constructor(dependencies: {
        guardRepository: GuardRepository,
        studentRepository: StudentRepository,
        prismaClient: PrismaClient
    }){
        super(dependencies.prismaClient);
        this.guardRepository = dependencies.guardRepository;
        this.studenRepository = dependencies.studentRepository;
    }

    public async findStudentById(id: number): Promise<Student> {
        if(!await this.existByPk(id))
            throw new EntranceDoesNotExistError(id);
        const entrance = await this.findByPk(id);
        return await this.studenRepository.findByPk(entrance.studentLrn);
    }

    public async findGuardById(id: number): Promise<Guard> {
        if(!await this.existByPk(id))
            throw new EntranceDoesNotExistError(id);
        const entrance = await this.findByPk(id);
        return await this.guardRepository.findByPk(entrance.guardId);
    }

    public async save(entity: StudentEntrance): Promise<StudentEntrance> {
        if(entity.id && await this.existByPk(entity.id))
            return await this.prisma.studentEntrances.update({ data: entity, where: { id: entity.id }});
        return await this.prisma.studentEntrances.create({ data: entity });
    }

    public async findByPk(pk: number): Promise<StudentEntrance> {
        if(!await this.existByPk(pk))
            throw new EntranceDoesNotExistError(pk);
        return await this.prisma.studentEntrances.findUniqueOrThrow({ where: { id: pk }});
    }

    public async findAll(page: number, limit: number): Promise<PaginatedContent<StudentEntrance>> {
        const totalItems = await this.count();
        const currentPage = page;
        const totalPages = Math.ceil(totalItems / limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * limit;
        const content = await this.prisma.studentEntrances.findMany({ skip, take: limit, orderBy: { timeEntered: 'desc'}});
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.studentEntrances.count();
    }

    public async existByPk(pk: number): Promise<boolean> {
        return await this.prisma.studentEntrances.count({ where: { id: pk }}) > 0;
    }

    public async deleteByPk(pk: number): Promise<void> {
        if(!await this.existByPk(pk))
            throw new EntranceDoesNotExistError(pk);
        await this.prisma.studentEntrances.delete({ where: { id: pk }});
    }
}