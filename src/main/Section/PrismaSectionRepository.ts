import { PrismaClient } from "@prisma/client/extension";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { Strand } from "../Strand/Strand";
import { Student } from "../Student/Student";
import { Section } from "./Section";
import { SectionRepository } from "./SectionRepository";
import { SectionBySectionNameDoesNotExistError } from "./SectionBySectionNameDoesNotExistError";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { SectionBySectionIdDoesNotExistError } from "./SectionBySectionIdDoesNotExistError";
import { SectionNameUnavailableError } from "./SectionNameUnavailableError";

export class PrismaSectionRepository extends PrismaRepository implements SectionRepository{

    constructor(prismaClient: PrismaClient){
        super(prismaClient);
    }

    public async findBySectionName(sectionName: string): Promise<Section> {
        if(!await this.existBySectionName(sectionName))
            throw new SectionBySectionNameDoesNotExistError(sectionName);
        return await this.prisma.sections.findUniqueOrThrow({ where: { sectionName }});
    }

    public async existBySectionName(sectionName: string): Promise<boolean> {
        return await this.prisma.sections.count({ where: { sectionName }}) > 0;
    }

    public async findByGradeLevel(
        gradeLevel: "G11" | "G12", 
        paganationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<Section>> {
        const totalItems = await this.prisma.sections.count({ where: { gradeLevel }});
        const currentPage = paganationOptions.page;
        const totalPages = Math.ceil(totalItems / paganationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (paganationOptions.page - 1) * paganationOptions.limit;
        const content = await this.prisma.sections.findMany({ where: { gradeLevel }, take: paganationOptions.limit, skip });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findStrandById(id: number): Promise<Strand> {
        if(!await this.existByPk(id))
            throw new SectionBySectionIdDoesNotExistError(id);
        const section = await this.findByPk(id);
        return await this.prisma.strands.findUniqueOrThrow({ where: { id: section.strandId }});
    }

    public async findStudentsById(
        id: number, 
        paganationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Student>> {
        if(!await this.existByPk(id))
            throw new SectionBySectionIdDoesNotExistError(id);
        const totalItems = await this.prisma.students.count({ where: { section: { id }}});
        const currentPage = paganationOptions.page;
        const totalPages = Math.ceil(totalItems / paganationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paganationOptions.limit;
        const content = await this.prisma.students.findMany({ where: { section: { id }}, skip, take: paganationOptions.limit });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async save(entity: Section): Promise<Section> {
        if(await this.existBySectionName(entity.sectionName)){
            const existingSection = await this.findBySectionName(entity.sectionName);
            if(existingSection.id !== entity.id)
                throw new SectionNameUnavailableError(entity.sectionName);
        }
        if(entity.id && await this.existByPk(entity.id))
            return await this.prisma.sections.update({ data:entity, where: { id: entity.id }});
        if(await this.existBySectionName(entity.sectionName))
            throw new SectionNameUnavailableError(entity.sectionName);
        return await this.prisma.sections.create({ data: entity });
    }

    public async findByPk(pk: number): Promise<Section> {
        if(!await this.existByPk(pk))
            throw new SectionBySectionIdDoesNotExistError(pk);
        return await this.prisma.sections.findUniqueOrThrow({ where: { id: pk }});
    }

    public async findAll(page: number = 1, limit: number = 10): Promise<PaginatedContent<Section>> {
        const totalItems = await this.count();
        const currentPage = page;
        const totalPages = Math.ceil(totalItems / limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = ( currentPage - 1) * limit;
        const content = await this.prisma.sections.findMany({ skip, take: limit, orderBy: [
            {strandId: 'desc'}, { gradeLevel: 'desc'},{ timeAdded: 'desc'}
        ] });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.sections.count();
    }

    public async existByPk(pk: number): Promise<boolean> {
        return await this.prisma.sections.count() > 0;
    }
    
    public async deleteByPk(pk: number): Promise<void> {
        if(!await this.existByPk(pk))
            throw new SectionBySectionIdDoesNotExistError(pk);
        await this.prisma.sections.delete({ where: { id: pk }});
    }
}