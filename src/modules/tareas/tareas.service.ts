import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TareaRepository from './tareas.repository';
import CrearTareaDTO from './dto/crear-tarea.dto';
import FiltrarTareasDTO from './dto/filtrar-tareas.dto';
import { EstadoTarea } from './tareas.estados';

@Injectable()
export class TareasService {
    constructor(
        @InjectRepository(TareaRepository)
        private tareaRepository:TareaRepository
    ){}

    async obtenerTareas(filtrarTareasDTO:FiltrarTareasDTO){
        return await this.tareaRepository.obtenerTareas(filtrarTareasDTO);
    }

    async obtenerTareaPorID(id:number){
        const encontrado = await this.tareaRepository.findOne(id);
        if(!encontrado) throw new NotFoundException(`No se encontro tarea con id ${id}`);
        return encontrado;
    }

    async crearTarea(crearTareaDTO:CrearTareaDTO){
        return await this.tareaRepository.crearTarea(crearTareaDTO);
    }

    async actualizarTarea(id:number,estado:EstadoTarea){
        const actualizado = await this.obtenerTareaPorID(id);
        actualizado.estado = estado;
        await actualizado.save();
        return actualizado;
    }

    async eliminarTarea(id:number){
        const eliminado = await this.tareaRepository.delete(id);
        if(eliminado.affected !== 0) throw new NotFoundException(`No se encontro tarea con id ${id}`);
        return `Se elimino la tarea con id ${id}`;
    }
}
