import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryColumn()
    name: string;

    @Column()
    password: string;

    @Column()
    role: string;
}
