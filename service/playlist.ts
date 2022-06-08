import Playlist from "../model/playlist";
import { Song } from "../model/song";

class PlaylistService {

    async addNewSongToPlaylist(playlistID: string, song: Song) {
        const newPlaylist = new Playlist({
            playlistID: playlistID,
            songID: song.id,
            songName: song.name
        });

        await newPlaylist.save(); 
    }

    async deleteSongFromPlaylist(playlistID: string, songID: string) {
        await Playlist.deleteOne({playlistID: playlistID, songID: songID});
    }

    async listAllSongsFromPlaylist(playlistID: string) {
        return await Playlist.find({playlistID: playlistID});
    }

    async listAllPlaylist() {
        return await Playlist.find();
    }
}

export default PlaylistService;