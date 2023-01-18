import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";
import { Playlists } from "../../entities/playlists.entities";
import { AppError } from "../../errors";
import { listAllPlaylistsSerializer } from "../../serializers/playlists";

const addMusicsToPlaylistService = async (req: Request, res: Response) => {
    const musicId = req.body.id;
    const userId = req.user.id;
    const playlist = req.providedPlaylist;
    const musicsRepo = AppDataSource.getRepository(Musics);
    const playlistsRepo = AppDataSource.getRepository(Playlists);

    const findMusic = await musicsRepo.findOne({
        where: {
            id: musicId,
            isActive: true
        }
    })

    const findMusicOnPlaylist = await playlistsRepo.findOne({
        where: {
            isActive: true,
            id: playlist.id,
            musics: {
                id: musicId
            }

        }
    })
    if(!findMusic) {
        throw new AppError("Music not found.", 403);
    }
    if(findMusicOnPlaylist){
        throw new AppError("Music already added before", 409)
    }

    const sumTime = findMusic!.duration.split(":");
    const time = playlist.duration.split(":");
    const dateTime = new Date();
    dateTime.setHours(0);
    dateTime.setHours(Number(time[0]) + Number(sumTime[0]));
    dateTime.setMinutes(Number(time[1]) + Number(sumTime[1]));
    dateTime.setSeconds(Number(time[2]) + Number(sumTime[2]));
    const durationStr = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    playlist.musics = [...playlist.musics, findMusic];
    playlist.duration = durationStr;
    playlistsRepo.save(playlist);

    const response = await listAllPlaylistsSerializer.validate(playlist, {
        stripUnknown: true
    })
    console.log(playlist)
    return response;
}

export default addMusicsToPlaylistService;