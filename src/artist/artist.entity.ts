import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    stage_name: string

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[]
}