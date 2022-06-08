import express, { Application } from "express";
import http from "http";
import { router as songRouter } from './routes/songstream';
import { router as playlistRouter } from './routes/playlist';
import { router as authRouter } from './routes/auth';
import bodyParser from "body-parser";

// import { ObjectId } from "bson";
// import PlaylistDAO from "./dao/playlist";
import CreateMongoDBConnection from "./database/mongodb";
import { auth } from "./middleware/auth";
// import Playlist from "./model/playlist";
// import PlaylistService from "./service/playlist";


const main = async () => {

    await CreateMongoDBConnection({
        host: "localhost",
        port: "27017",
        database: "nodejs"
    });
    
    const app: Application = express();
    const jsonParser = bodyParser.json();

    app.use(jsonParser);

    app.use("/auth", authRouter);
    app.use("/song", auth ,songRouter);
    app.use("/playlist", auth, playlistRouter)
    
    const server = http.createServer(app);
    server.listen(3000);
}

main();

// (async () => {

//     console.log("Connection Started....")
//     // console.log(db.connection);

//     // new PlaylistDAO(db).save("1", { id: "1", name: "Another War"});
//     // const newPlaylist = new Playlist({_id: new ObjectId().toString(), playlistID: "1", songID: "2", songName: "ASDF"});
//     // await newPlaylist.save();
//     // const data = await Playlist.find();
//     // console.log(data);

//     const service = new PlaylistService();

//     // service.addNewSongToPlaylist("2", {id: "4", name: "STR"});
//     // console.log(await service.listAllSongsFromPlaylist("1"));
//     // service.deleteSongFromPlaylist("1", "4");
//     // console.log("After")
//     // console.log(await service.listAllSongsFromPlaylist("1"));
//     console.log(await service.listAllPlaylist());

// })();

