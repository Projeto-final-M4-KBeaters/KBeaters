import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { Musics } from "../../entities/musics.entities"
import { IAlbumRequest, IAlbumResponse,IlistAlbumResponse } from "../../interfaces/albums"


const addMusicsToAlbumService = async(albumID:string,musicID:string) => {

    const albumRepository = AppDataSource.getRepository(Albums)
    const musicRepository = AppDataSource.getRepository(Musics)
    

    const findMusic = await musicRepository.findOne({
        where:{
            id: musicID
        },
        relations:{
            performer:true,
            feats:true
        }
    })

    const findAlbum = await albumRepository.findOne({
        where: {
            id: albumID
        },
        relations:{
            musics: true,
            performer: true
        }
    })
    
   const {id,name,duration,musics,performer,createdAt} = findAlbum as IlistAlbumResponse

   
    musics.push(findMusic!)


    const addMusic  =  albumRepository.create({
        id,
        name,
        duration,
        musics,
        performer,
        createdAt
    })

    await albumRepository.save(addMusic)

    return addMusic
}

export default addMusicsToAlbumService