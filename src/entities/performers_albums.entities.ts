import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, ManyToMany, ManyToOne} from "typeorm";
import { Albums } from "./albuns.entities";
import { Genres } from "./genres.entities";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity('performersToAlbums')
class PerformersToAlbums{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(() => Albums, albums => albums.performerToAlbums)
    albums: Albums

    @ManyToOne(() => Users, owner => owner.performerToAlbums)
    owner: Users

    @ManyToOne(() => Users, feat => feat.performerToFeatAlbums)
    feat: Users[]

}

export {PerformersToAlbums}