import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";

export interface IPlaylist {
    _id: ObjectId
    playlistID: string
    songID: string
    songName: string
}

const Playlist = mongoose.model("Playlist", new Schema({
    playlistID: String,
    songID: String,
    songName: String,
}));

export default Playlist;