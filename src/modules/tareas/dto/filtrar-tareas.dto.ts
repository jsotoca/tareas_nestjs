import { EstadoTarea } from './../tareas.estados';
import { IsOptional, IsString, IsIn } from 'class-validator';

export default class FiltrarTareasDTO {
    @IsOptional()
    @IsString()
    busqueda:string;

    @IsOptional()
    @IsIn([EstadoTarea.ABIERTO,EstadoTarea.EN_PROGRESO,EstadoTarea.HECHO])
    estado:EstadoTarea;
}