import { CRUDRepository } from "../../lib/repositories/CRUDRepository";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { Strand } from "../Strand/Strand";
import { Track } from "./Track";

export interface TrackRepository extends CRUDRepository<number, Track>{
    findByTrackName(trackName: string): Promise<Track>;
    existByTrackName(trackName: string): Promise<boolean>;
    findStrandsById(id: number, pagination: PaginationOptions): Promise<PaginatedContent<Strand>>;
}