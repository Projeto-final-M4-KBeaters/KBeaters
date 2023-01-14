import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn} from "typeorm";
import { Albums } from "./albuns.entities";
import { Genres } from "./genres.entities";
import { Likes } from "./likes.entities";
import { Playlists } from "./playlists.entities";
import { Users } from "./users.entities";
//import { PlaylistsToMusics } from "./playlists_musics.entities";

@Entity("musics")
class Musics{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 100})
    name: string

    @Column({length: 150})
    duration:string

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => Albums, albums => albums.musics)
    albums: Albums[]

    @ManyToOne(() => Genres, genres => genres.musics)
    genre: Genres

    @OneToMany(() => Likes, likes => likes.music)
    likes: Likes

    @ManyToMany(() => Playlists, playlists => playlists.musics)
    @JoinTable({
        name: "musicsToPlaylists"
    })
    playlists: Playlists

    @ManyToOne(() => Users, performer => performer.musics)
    performer: Users

    @ManyToMany(() => Users, performers => performers.feats)
    @JoinTable({
        name: "musicsFeats"
    })
    feats: Users[]
}

export {Musics};