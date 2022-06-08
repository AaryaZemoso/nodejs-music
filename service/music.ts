import { 
  createReadStream, 
  createWriteStream, 
  existsSync, 
  statSync 
} from "fs";

import path from "path/posix";

import { promisify } from "util";
import { finished } from "stream";

import ytdl from "ytdl-core";
import yts from "yt-search";

import { SongStream } from "../model/songstream";

const songPath = path.join("public", "songs");
const youtubePrefix = "https://www.youtube.com/watch?v=";

// Returns data related to the song.
// It returns the size of the file and stream of data.
export const streamSong = async (name: string): Promise<SongStream>  => {
    const id = await getYoutubeIdByName(name);
    const songFilename = path.join(songPath, id + ".mp3");
    if (!existsSync(songFilename)) {
        await downloadSong(id);
    }

    const songStat = statSync(songFilename)

    return Promise.resolve({
        contentLength: songStat.size,
        stream: createReadStream(songFilename),
    });
}

// Fetches the first youtube video and returns it's ID.
export const getYoutubeIdByName = async (name: string): Promise<string> => {
    const listOfVideos = await yts(name);
    const topVideo = listOfVideos.videos[0];
    return Promise.resolve(topVideo.videoId);
}

// Downloading the song into the public folder, so that if it already exists need not to create a new one.
export const downloadSong = async (id: string) => {
    const writer = createWriteStream(path.join(songPath, id + ".mp3"));
    ytdl(youtubePrefix + id, { filter: 'audioonly' })
        .pipe(writer);

    const finishedAsync = promisify(finished);
    await finishedAsync(writer);
}

export const searchYoutube = async (name: string): Promise<string[]> => {
  const listOfVideos = await yts(name);
  return listOfVideos.videos.map(value => value.title);
}