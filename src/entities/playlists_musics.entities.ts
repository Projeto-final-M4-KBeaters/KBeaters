import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Musics } from "./musics.entities";
import { Playlists } from "./playlists.entities";

@Entity("playlistsToMusics")
class PlaylistsToMusics{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToMany(() => Musics, musics => musics.playlistsToMusics)
    musics: Musics[]

    @ManyToOne(() => Playlists, playlists => playlists.playlistToMusics)
    playlists: Playlists

}

export {PlaylistsToMusics}