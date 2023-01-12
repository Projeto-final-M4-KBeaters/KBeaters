import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, OneToMany} from "typeorm";
import { Musics } from "./musics.entities";
import { PerformersToAlbums } from "./performers_albums.entities";

@Entity('albums')
class Albums{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({length: 100})
    name: string

    @Column({length: 150})
    duration:string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Musics, musics => musics.albums)
    musics: Musics[]

    @OneToMany(() => PerformersToAlbums, performersToAlbums => performersToAlbums.albums)
    performerToAlbums: PerformersToAlbums[]
}

export {Albums}