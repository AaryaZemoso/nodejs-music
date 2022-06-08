import { ObjectID } from "bson";
import mongoose, { Model, Mongoose, Schema } from "mongoose";
import { IPlaylist } from "../model/playlist";
import { Song } from "../model/song";

/**
 * Delete this. Not used anywhere.
 */
class PlaylistDAO {

    private db: Mongoose;
    private collection: Model<IPlaylist>;
    private static collectionName: string = "Playlist";

    constructor(db: Mongoose) {
        this.db = db;
        this.collection = db.model(PlaylistDAO.collectionName, new Schema({
            _id: Object, 
            playlistID: String,
            songID: String,
            songName: String
        }));
        console.log(this.collection);
    }

    async save(playlistID: string, song: Song) {
        const listRecords = (await this.collection.find({ playlistID: playlistID, songID: song.id }));
        if (listRecords.length !== 0) {
           const result = (await this.collection.updateOne({
               _id: listRecords[0]._id
           }, {
               playlistID: playlistID,
               songID: song.id,
               songName: song.name,
           }));

           return result.acknowledged;
        } else {
           const result = (await this.collection.insertMany({
               playlistID: playlistID,
               songID: song.id,
               songName: song.name,
           }));

           return result.length !== 0;
        }
    }

}

export default PlaylistDAO;