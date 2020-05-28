import {PipeTransform, ArgumentMetadata, BadRequestException} from "@nestjs/common";
import { EstadoTarea } from "../tareas.estados";
export default class EstadosTareaPipe implements PipeTransform {
    
    estadosValidos = [
        EstadoTarea.ABIERTO,EstadoTarea.EN_PROGRESO,EstadoTarea.HECHO
    ];

    verificarEstado(value:any){
        const idx = this.estadosValidos.indexOf(value);
        return idx !== -1;
    }

    transform(value:any,metadata:ArgumentMetadata){
        value = value.toUpperCase();
        const esValido = this.verificarEstado(value);
        if(!esValido) throw new BadRequestException(`${value} no es un estado valido`);
        return value;
    }
}