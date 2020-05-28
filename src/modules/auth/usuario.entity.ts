import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { compareSync } from 'bcrypt';

@Entity('usuario')
@Unique(['usuario'])
export default class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    usuario:string;

    @Column()
    password:string;

    compararPasswords(password:string){
        return compareSync(password,this.password);
    }
}