import { Readable } from "stream";

// Model related to a particular song.
export interface SongStream{
    contentLength: number;
    stream: Readable;
}
