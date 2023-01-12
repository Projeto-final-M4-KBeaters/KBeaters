import { CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { Musics } from "./musics.entities";
import { Users } from "./users.entities";

@Entity("likes")
class Likes{
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