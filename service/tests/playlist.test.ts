import { MockMongoose } from "mock-mongoose";
import { Mongoose } from "mongoose";
import CreateMongoDBConnection from "../../database/mongodb";
import PlaylistService from "../playlist";

describe("Test Suite - Playlist Service", () => {

    const service = new PlaylistService();

    beforeAll(async () => {
        await CreateMongoDBConnection({
            database: "test-nodejs",
            port: "27017",
            host: "localhost"
        })
    });

    it("test - add new song to playlist", async () => {
        service.addNewSongToPlaylist("a", {
            id: "a",
            name: "asd"
        });
    });

    it("test - delete song from playlist", async () => {
        service.deleteSongFromPlaylist("a", "b");
    });

    it("test - list all songs of a playlist", async () => {
        service.listAllSongsFromPlaylist("a");
    });

    it("test - list all playlist", async () => {
        service.listAllPlaylist();
    });
        
});