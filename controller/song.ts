import { NextFunction, Request, Response } from "express";
import { searchYoutube, streamSong } from "../service/music";

export const streamYoutubeSong = (req: Request, res: Response, _next: NextFunction) => {
    const songName = req.query["name"]?.toString();
    if (songName) {

        const songStreamer = streamSong(songName);

        songStreamer.then((data) => {
            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': data.contentLength,
            });

            data.stream.pipe(res);
        });

    } else {
        res.status(400);
        res.json({ status: "Give song name" });
    }
};

export const searchYoutubeSong = async (req: Request, res: Response, _next: NextFunction) => {
    const searchText = req.query["name"]?.toString();
    console.log(searchText);
    if (searchText) {
        const data = await searchYoutube(searchText);
        res.json(data);
    }
    else {
        res.status(400).json({status: 400, message: "use '?name=' to search for songs"});
    }
}
