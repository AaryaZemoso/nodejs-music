import { Router } from "express";
import { addNewSongToPlaylist, deleteSongFromPlaylist, listPlaylistByID } from "../controller/playlist";

export const router = Router();

router.get("/:playlistID", listPlaylistByID);
router.post("/:playlistID/songs", addNewSongToPlaylist);
router.delete("/:playlistID/songs/:songID", deleteSongFromPlaylist);
