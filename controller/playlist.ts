import { NextFunction, Request, Response } from "express"
import { Song } from "../model/song";
import PlaylistService from "../service/playlist"

const playlistService = new PlaylistService();

export const addNewSongToPlaylist = (req: Request, res: Response, _next: NextFunction) => {
    const song = req.body as Song;
    const playlistID = req.params["playlistID"]
    playlistService.addNewSongToPlaylist(playlistID, song);
    res.status(201).json({
        status: "Success",
        message: "Added new song to the playlist",
    });
}

export const deleteSongFromPlaylist = (req: Request, res: Response, _next: NextFunction) => {
    const songID = req.params["songID"];
    const playlistID = req.params["playlistID"];
    playlistService.deleteSongFromPlaylist(playlistID, songID);
    res.status(200).json({
        status: "Success",
        message: "Deleted new song to the playlist",
    });
}

export const listPlaylistByID = async (req: Request, res: Response, _next: NextFunction) => {
    const playlistID = req.params["playlistID"];
    const data = await playlistService.listAllSongsFromPlaylist(playlistID);
    res.json(data);
}