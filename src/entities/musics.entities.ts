import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, ManyToMany, OneToMany} from "typeorm";
import { Albums } from "./albuns.entities";
import { Genres } from "./genres.entities";
import { Likes } from "./likes.entities";
import { PerformersToMusics } from "./performers_musics.entities";
import { PlaylistsToMusics } from "./playlists_musics.entities";

@Entity('musics')
class Musics{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({length: 100})
    name: string

    @Column({length: 150})
    duration:string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Albums, albums => albums.musics)
    albums: Albums

    @ManyToOne(() => Genres, genres => genres.musics)
    genres: Genres

    @ManyToOne(() => Likes, likes => likes.musics)
    likes: Likes

    @ManyToMany(() => PlaylistsToMusics, playlistsToMusics => playlistsToMusics.musics)
    playlistsToMusics:PlaylistsToMusics

    @OneToMany(() => PerformersToMusics, performersToMusics => performersToMusics.musics)
    performerToMusics: PerformersToMusics
}

export {Musics}