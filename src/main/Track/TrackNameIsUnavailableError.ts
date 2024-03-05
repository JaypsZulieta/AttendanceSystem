export class TrackNameIsUnavailableError extends Error{
    constructor(trackName: string){
        super(`'${trackName}' is unavailable`);
    }
}