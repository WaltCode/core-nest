import { Exclude } from "class-transformer";
import { Artist } from "src/artist/artist.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string
}