import { PrismaClient } from "@prisma/client";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { Student } from "../Student/Student";
import { Track } from "../Track/Track";
import { Strand } from "./Strand";
import { StrandRepository } from "./StrandRepository";
import { StrandByStrandNameDoesNotExistError } from "./StrandByStrandNameDoesNotExistError";
import { StrandByStrandIdDoesNotExistError } from "./StrandByStrandIdDoesNotExistError";
import { StrandNameUnavailableError } from "./StrandNameUnavailableError";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { Section } from "../Section/Section";
import { SectionBySectionIdDoesNotExistError } from "../Section/SectionBySectionIdDoesNotExistError";

export class PrismaStrandRepository extends PrismaRepository implements StrandRepository{

    constructor(prismaClient: PrismaClient){
        super(prismaClient);
    }

    public async findSectionsById(
        id: number, 
        paganationOptions: PaginationOptions = {page: 1, limit: 10}
    ): Promise<PaginatedContent<Section>> {
        if(!await this.existByPk(id))
            throw new SectionBySectionIdDoesNotExistError(id);
        const totalItems = await this.prisma.sections.count({ where: { strand: { id }}});
        const currentPage = paganationOptions.page;
        const totalPages = Math.ceil(totalItems / paganationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paganationOptions.limit;
        const content = await this.prisma.sections.findMany({ where: { strand: { id }}, take: paganationOptions.limit, skip, orderBy: { timeAdded: 'desc'}});
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content }
    }

    public async findByStrandName(strandName: string): Promise<Strand> {
        if(!await this.existByStrandName(strandName))
            throw new StrandByStrandNameDoesNotExistError(strandName);
        return await this.prisma.strands.findUniqueOrThrow({ where: { strandName }});
    }

    public async existByStrandName(strandName: string): Promise<boolean> {
        return await this.prisma.strands.count({ where: { strandName }}) > 0;
    }

    public async findTrackById(id: number): Promise<Track> {
        if(!await this.existByPk(id))
            throw new StrandByStrandIdDoesNotExistError(id);
        const strand = await this.findByPk(id);
        return await this.prisma.tracks.findUniqueOrThrow({ where: { id: strand.trackId }});
    }

    public async findStudentsById(
        id: number, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Student>> {
        if(!await this.existByPk(id))
            throw new StrandByStrandIdDoesNotExistError(id);
        const totalItems = await this.prisma.students.count({ where: { section: { strand: { id }}}});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const content = await this.prisma.students.findMany({ where: { section: { strand: { id }}}});
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async save(entity: Strand): Promise<Strand> {
        if(await this.existByStrandName(entity.strandName)){
            const existingStrand = await this.findByStrandName(entity.strandName);
            if(existingStrand.id !== entity.id)
                throw new StrandNameUnavailableError(entity.strandName);
        }
        if(entity.id && await this.existByPk(entity.id))
            return await this.prisma.strands.update({ data: entity, where: { id: entity.id }});
        if(await this.existByStrandName(entity.strandName))
            throw new StrandNameUnavailableError(entity.strandName);
        return await this.prisma.strands.create({ data: entity });
    }

    public async findByPk(pk: number): Promise<Strand> {
        if(!await this.existByPk(pk))
            throw new StrandByStrandIdDoesNotExistError(pk);
        return await this.prisma.strands.findUniqueOrThrow({ where: { id: pk }});
    }

    public async findAll(page: number = 1, limit: number = 10): Promise<PaginatedContent<Strand>> {
       const totalItems = await this.count();
       const currentPage = page;
       const totalPages = Math.ceil(totalItems / limit);
       const hasPreviousPages = currentPage > 1;
       const hasNextPage = currentPage < totalPages;
       const skip = (currentPage - 1) * limit;
       const content = await this.prisma.strands.findMany({ take: limit, skip, orderBy: { timeAdded: 'desc'} });
       return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.strands.count();
    }

    public async existByPk(pk: number): Promise<boolean> {
        return await this.prisma.strands.count({ where:{ id: pk }}) > 0;
    }

    public async deleteByPk(pk: number): Promise<void> {
        if(!await this.existByPk(pk))
            throw new StrandByStrandIdDoesNotExistError(pk);
        await this.prisma.strands.delete({ where: { id: pk }});
    }
}