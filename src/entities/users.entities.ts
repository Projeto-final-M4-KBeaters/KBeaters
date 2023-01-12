import { hashSync } from "bcryptjs";
import { Entity,PrimaryGeneratedColumn,Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeUpdate, BeforeInsert, JoinColumn} from "typeorm";
import { Likes } from "./likes.entities";
import { PerformersToAlbums } from "./performers_albums.entities";
import { PerformersToMusics } from "./performers_musics.entities";
import { Playlists } from "./playlists.entities";

@Entity("users")
class Users{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length: 50})
    name:string

    @Column({length: 150, unique:true})
    email:string

    @Column({length:150})
    password:string

    @Column({default: false})
    isPerformer: boolean

    @Column({default: false})
    isAdmin:boolean

    @Column({default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Playlists, userPlaylist => userPlaylist.user, {nullable:true})
    playlists: Playlists[]

    @OneToMany(() => PerformersToMusics, performerToMusic => performerToMusic.owner, {nullable:true})
    musics: PerformersToMusics[]

    @OneToMany(() => PerformersToMusics, performerToMusic => performerToMusic.feat, {nullable:true})
    featMusics: PerformersToMusics[]

    @OneToMany(() => PerformersToAlbums, performerToAlbum => performerToAlbum.owner, {nullable:true})
    performerToAlbums: PerformersToAlbums[]

    @OneToMany(() => PerformersToAlbums, performerToAlbum => performerToAlbum.feat, {nullable:true})
    performerToFeatAlbums: PerformersToAlbums[]

    @OneToOne(() => Likes, {nullable:true}) 
    @JoinColumn()
    likeMusic: Likes 
    
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
}

export {Users};
