import { CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity("likes")
class Likes{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Musics, musics => musics.likes)
    musics: Musics

    @OneToOne(() => Users, user => user.likeMusic)
    user: Users
}

export {Likes};