import { PrismaClient } from "@prisma/client";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { Track } from "./Track";
import { TrackRepository } from "./TrackRepository";
import { Strand } from "../Strand/Strand";
import { TrackByTrackNameDoseNotExistError } from "./TrackByTrackNameDoesNotExistError";
import { TrackNameIsUnavailableError } from "./TrackNameIsUnavailableError";
import { TrackByIdDoesNotExistError } from "./TrackByIdDoesNotExistError";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";

export class PrismaTrackRepository extends PrismaRepository implements TrackRepository{

    constructor(prismaClient: PrismaClient){
        super(prismaClient);
    }

    public async findByTrackName(trackName: string): Promise<Track> {
        if(!await this.existByTrackName(trackName))
            throw new TrackByTrackNameDoseNotExistError(trackName);
        return await this.prisma.tracks.findUniqueOrThrow({ where: { trackName }});
    }

    public async existByTrackName(trackName: string): Promise<boolean> {
        return await this.prisma.tracks.count({ where: { trackName }}) > 0;
    }

    public async findStrandsById(
        id: number, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<Strand>> {
        const totalItems = await this.prisma.strands.count({ where: { track: { id }} });
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = ( currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.strands.findMany({ where: { trackId: id }, take: paginationOptions.limit, skip, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content  }
    }

    public async save(entity: Track): Promise<Track> {
        if(await this.existByTrackName(entity.trackName)){
            const existingTrack = await this.findByTrackName(entity.trackName);
            if(entity.id !== existingTrack.id)
                throw new TrackNameIsUnavailableError(entity.trackName);
        }
        if(entity.id && await this.existByPk(entity.id))
            return await this.prisma.tracks.update({ data: entity, where: { id: entity.id }});
        if(await this.existByTrackName(entity.trackName))
            throw new TrackNameIsUnavailableError(entity.trackName);
        return await this.prisma.tracks.create({ data: entity });
    }

    public async findByPk(pk: number): Promise<Track> {
        if(!await this.existByPk(pk))
            throw new TrackByIdDoesNotExistError(pk);
        return await this.prisma.tracks.findUniqueOrThrow({ where: { id: pk }});
    }

    public async findAll(page: number = 1, limit: number = 10): Promise<PaginatedContent<Track>> {
        const totalItems = await this.count();
        const currentPage = page;
        const totalPages = Math.ceil(totalItems / limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * limit;
        const content = await this.prisma.tracks.findMany({ take: limit, skip, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.tracks.count();
    }

    public async existByPk(pk: number): Promise<boolean> {
        return await this.prisma.tracks.count({ where: { id: pk }}) > 0;
    }

    public async deleteByPk(pk: number): Promise<void> {
        if(!await this.existByPk(pk))
            throw new TrackByIdDoesNotExistError(pk);
        await this.prisma.tracks.delete({ where: { id: pk }});
    }
}