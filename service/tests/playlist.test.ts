import assert from "assert";
import { MockMongoose } from "mock-mongoose";
import mongoose, { Mongoose } from "mongoose";
import CreateMongoDBConnection from "../../database/mongodb";
import Playlist from "../../model/playlist";
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

    beforeEach(async () => {
        await Playlist.remove({});
    });

    afterAll(async () => {
        mongoose.disconnect();
    });

    it("test - add new song to playlist", async () => {
        const listOfSongs = await service.listAllSongsFromPlaylist("a");
        await service.addNewSongToPlaylist("a", {
            id: "a",
            name: "asd"
        });
        const listOfSongsAfterInsert = await service.listAllSongsFromPlaylist("a");
        assert.equal(listOfSongs.length, listOfSongsAfterInsert.length - 1);
    });

    it("test - delete song from playlist", async () => {

        await service.addNewSongToPlaylist("a", {
            id: "b",
            name: "ASD",
        });

        let listOfSongs = await service.listAllSongsFromPlaylist("a");
        listOfSongs = listOfSongs.filter(value => value["songID"] === "b");

        assert.equal(listOfSongs.length, 1);
        
        await service.deleteSongFromPlaylist("a", "b");

        listOfSongs = await service.listAllSongsFromPlaylist("a");
        listOfSongs = listOfSongs.filter(value => value["songID"] === "b");

        assert.equal(listOfSongs.length, 0);
    });

    it("test - list all songs of a playlist", async () => {
        
        await service.addNewSongToPlaylist("a", { id: "b", name: "ASD"});
        await service.addNewSongToPlaylist("a", { id: "c", name: "ASD"});
        
        const listOfSongs = await service.listAllSongsFromPlaylist("a");

        assert.equal(listOfSongs.length, 2);
    });

    it("test - list all playlist", async () => {

        await service.addNewSongToPlaylist("a", { id: "b", name: "ASD"})
        await service.addNewSongToPlaylist("b", { id: "b", name: "ASD"})
        await service.addNewSongToPlaylist("b", { id: "a", name: "ASD"})
        await service.addNewSongToPlaylist("c", { id: "a", name: "ASD"})

        const listOfPlaylist = await service.listAllPlaylist();

        assert.equal(listOfPlaylist.length, 3);
    });
});