export class TrackByTrackNameDoseNotExistError extends Error{
    constructor(trackName: string){
        super(`${trackName} does not exist`);
    }
}