import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, ManyToMany, ManyToOne} from "typeorm";
import { Albums } from "./albuns.entities";
import { Genres } from "./genres.entities";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity('performersToAlbums')
class PerformersToAlbums{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(() => Albums, albums => albums.id)
    albums: Albums

    @ManyToOne(() => Users, owner => owner.id)
    owner: Users

    @ManyToOne(() => Users, feat => feat.id)
    feat: Users[]

}

export {PerformersToAlbums}