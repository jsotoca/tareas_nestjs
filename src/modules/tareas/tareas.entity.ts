import { EstadoTarea } from './tareas.estados';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tarea')
export default class Tarea extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;

    @Column()
    descripcion:string;

    @Column()
    estado:EstadoTarea;
}