import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, ManyToMany, ManyToOne} from "typeorm";
import { Albums } from "./albuns.entities";
import { Genres } from "./genres.entities";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity('performersToMusics')
class PerformersToMusics{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(() => Musics, musics => musics.performerToMusics)
    musics: Musics

    @ManyToOne(() => Users, owner => owner.musics)
    owner: Users

    @ManyToOne(() => Users, feat => feat.featMusics, {nullable:true})
    feat: Users[]

}

export {PerformersToMusics}