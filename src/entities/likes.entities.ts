import { CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity("likes")
class Likes{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Musics, musics => musics.id)
    musics: Musics

    @OneToOne(() => Users, user => user.id)
    user: Users
}

export {Likes}