import { PrismaClient } from "@prisma/client";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { Section } from "../Section/Section";
import { Strand } from "../Strand/Strand";
import { Student } from "./Student";
import { StudentRepository } from "./StudentRepository";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { StudentByLRNDoesNotExistError } from "./StudentByLRNDoesNotExistError";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { StudentExit } from "../Exits/StudentExit";

export class PrismaStudentRepository extends PrismaRepository implements StudentRepository{

    constructor(prismaClient: PrismaClient){
        super(prismaClient);
    }

    public async findLatestEntry(lrn: string): Promise<StudentEntrance | null> {
        if(!await this.existByPk(lrn))
            throw new StudentByLRNDoesNotExistError(lrn);
        return await this.prisma.studentEntrances.findFirst({ where: { student: { lrn }}, orderBy: { timeEntered: 'desc'}});
    }

    public async findExitsByLrn(
        lrn: string, 
        paganationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<StudentExit>> {
        if(!await this.existByPk(lrn))
            throw new StudentByLRNDoesNotExistError(lrn);
        const totalItems = await this.prisma.studentExits.count({ where: { studentEntrance: { student: { lrn }}}});
        const currentPage = paganationOptions.page;
        const totalPages = Math.ceil(totalItems / paganationOptions.limit);
        const hasPreviousPages = totalItems > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paganationOptions.limit
        const content = await this.prisma.studentExits.findMany(
            { where: { studentEntrance: { student: { lrn }}}, skip, take: paganationOptions.limit, orderBy: { timeExited: 'desc'} }
        );
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findEntrancesByLrn(
        lrn: string, 
        paganationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<StudentEntrance>> {
        const totalItems = await this.prisma.studentEntrances.count({ where: { student: { lrn }}});
        const currentPage = paganationOptions.page;
        const totalPages = Math.ceil(totalItems / paganationOptions.limit);
        const hasPreviousPages = totalItems > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paganationOptions.limit;
        const content = await this.prisma.studentEntrances.findMany({
            where: { student: { lrn }}, skip, take: paganationOptions.limit, orderBy: { timeEntered: 'desc'}
        });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByGuardianPhonenumber(
        phonenumber: string, 
        paganationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<Student>> {
        const totalItems = await this.prisma.students.count({ where: { guardianPhonenumber: phonenumber }});
        const currentPage = paganationOptions.page;
        const totalPages = Math.ceil(totalItems / paganationOptions.page);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = ( currentPage - 1) * paganationOptions.limit;
        const content = await this.prisma.students.findMany(
            { where: { guardianPhonenumber: phonenumber }, skip, take: paganationOptions.limit, orderBy: { timeAdded: 'desc'}}
        );
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByFirstName(
        firstname: string,
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Student>> {
        const totalItems = await this.prisma.students.count({ where: { firstname }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.students.findMany({ where: { firstname }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByMiddleName(
        middlename: string,
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Student>> {
        const totalItems = await this.prisma.students.count({ where: { middlename }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems/ paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.students.findMany({ where: { middlename}, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByLastname(
        lastname: string,
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Student>> {
        const totalItems = await this.prisma.students.count({ where: { lastname }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.students.findMany({ where: { lastname }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'}});
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByGender(
        sex: "female" | "male",
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Student>> {
        const totalItems = await this.prisma.students.count({ where: { sex }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.students.findMany({ where: { sex }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByGradeLevel(
        gradeLevel: "G11" | "G12",
        paginationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<Student>> {
        const totalItems = await this.prisma.students.count({ where: { section: { gradeLevel } }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.students.findMany(
            { where: { section: { gradeLevel }}, skip, take: paginationOptions.limit, orderBy: 
            { section: { strand: { timeAdded: 'desc'}, timeAdded: 'desc'}, timeAdded: 'desc'}
        });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findSectionByLRN(lrn: string): Promise<Section> {
        if(!await this.existByPk(lrn))
            throw new StudentByLRNDoesNotExistError(lrn);
        const student = await this.prisma.students.findUniqueOrThrow({ where: { lrn }});
        return await this.prisma.sections.findUniqueOrThrow({ where: { id: student.sectionId }});
    }

    public async findStrandByLrn(lrn: string): Promise<Strand> {
        if(!await this.existByPk(lrn))
            throw new StudentByLRNDoesNotExistError(lrn);
        const student = await this.prisma.students.findUniqueOrThrow({ where: { lrn }});
        const section = await this.prisma.sections.findUniqueOrThrow({ where: { id: student.sectionId }});
        return await this.prisma.strands.findUniqueOrThrow({ where: { id: section.strandId }});
    }

    public async save(entity: Student): Promise<Student> {
        if(await this.existByPk(entity.lrn))
            return await this.prisma.students.update({ data: entity, where: { lrn: entity.lrn }});
        return await this.prisma.students.create({ data: entity });
    }

    public async findByPk(pk: string): Promise<Student> {
        if(!await this.existByPk(pk))
            throw new StudentByLRNDoesNotExistError(pk);
        return await this.prisma.students.findUniqueOrThrow({ where: { lrn: pk }});
    }

    public async findAll(page: number = 1, limit: number = 10): Promise<PaginatedContent<Student>> {
        const totalItems = await this.count();
        const currentPage = page;
        const totalPages = Math.ceil(totalItems / limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * limit;
        const content = await this.prisma.students.findMany({ skip, take: limit, orderBy: {
            section: { strand: { timeAdded: 'desc'}, gradeLevel: 'desc', sectionName: 'desc', timeAdded: 'desc'},
            timeAdded: 'desc'
        } });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.students.count();
    }

    public async existByPk(pk: string): Promise<boolean> {
        return await this.prisma.students.count({ where: { lrn: pk }}) > 0;
    }

    public async deleteByPk(pk: string): Promise<void> {
        if(!await this.existByPk(pk))
            throw new StudentByLRNDoesNotExistError(pk);
        await this.prisma.students.delete({ where: { lrn: pk }});
    }
}