import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity("albums")
class Albums{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 100})
    name: string

    @Column({type:"time", default:"00:00:00"})
    duration:string

    @Column({ default: false})
    isActive: boolean

    @ManyToMany(() => Musics, musics => musics.albums)
    @JoinTable({
        name: "albumsToMusics"
    })
    musics: Musics[]

    @ManyToOne(() => Users, performer => performer.albums)
    performer: Users

    @CreateDateColumn()
    createdAt: Date
}

export {Albums};