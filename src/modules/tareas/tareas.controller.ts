import { TareasService } from './tareas.service';
import { Controller, Get, Body, ValidationPipe, Param, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';
import FiltrarTareasDTO from './dto/filtrar-tareas.dto';
import CrearTareaDTO from './dto/crear-tarea.dto';
import { EstadoTarea } from './tareas.estados';

@Controller('tareas')
export class TareasController {
    constructor(
        private tareasService:TareasService
    ){}

    @Get()
    async obtenerTareas(@Body(ValidationPipe) filtrarTareasDTO:FiltrarTareasDTO){
        return await this.tareasService.obtenerTareas(filtrarTareasDTO);
    }

    @Get('/:id')
    async obtenerTarea(
        @Param('id',ParseIntPipe) id:number
    ){
        return await this.tareasService.obtenerTareaPorID(id);
    }

    @Post()
    async crearTarea(
        @Body(ValidationPipe) crearTareaDTO:CrearTareaDTO
    ){
        return await this.tareasService.crearTarea(crearTareaDTO);
    }

    @Put('/:id')
    async actualizarTarea(
        @Param('id',ParseIntPipe) id:number,
        @Body('estado') estado:EstadoTarea
    ){
        return await this.tareasService.actualizarTarea(id,estado);
    }

    @Delete('/:id')
    async eliminarTarea(
        @Param('id',ParseIntPipe) id:number
    ){
        return await this.tareasService.eliminarTarea(id);
    }
}
