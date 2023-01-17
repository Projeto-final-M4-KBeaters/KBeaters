import { hashSync } from "bcryptjs"
import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, UpdateDateColumn} from "typeorm";
import { Musics } from "./musics.entities";
//import { PlaylistsToMusics } from "./playlists_musics.entities";
import { Users } from "./users.entities";

@Entity("playlists")
class Playlists{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 80})
    name:string

    @Column({length: 150})
    duration:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Users, users => users.playlists)
    user: Users

    @ManyToMany(()=> Musics, musics => musics.playlists)
    @JoinTable({
        name: "musicsToPlaylists"
    })
    musics: Musics
}

export {Playlists};