import { hashSync } from "bcryptjs"
import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { PlaylistsToMusics } from "./playlists_musics.entities";
import { Users } from "./users.entities";

@Entity('playlists')
class Playlists{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({length: 80})
    name:string

    @Column({length: 150})
    duration:string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Users, users => users.playlists)
    user: Users

    @OneToMany(()=> PlaylistsToMusics, playlistsToMusics => playlistsToMusics.playlists)
    playlistToMusics: PlaylistsToMusics
}

export {Playlists}