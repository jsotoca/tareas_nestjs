import { Repository, EntityRepository } from "typeorm";
import Tarea from "./tareas.entity";
import CrearTareaDTO from "./dto/crear-tarea.dto";
import { EstadoTarea } from "./tareas.estados";
import FiltrarTareasDTO from "./dto/filtrar-tareas.dto";

@EntityRepository(Tarea)
export default class TareaRepository extends Repository<Tarea>{
    async obtenerTareas(filtrarTareasDTO:FiltrarTareasDTO){
        const {busqueda,estado} = filtrarTareasDTO;
        const consulta = this.createQueryBuilder();
        if(estado){
            consulta.andWhere('tarea.estado = :estado',{estado});
        }
        if(busqueda){
            consulta.andWhere('tarea.titulo LIKE :busqueda OR tarea.descripcion LIKE :busqueda',{busqueda: `%${busqueda}%`});
        }
        const tareas = await consulta.getMany();
        return tareas;
    }

    async crearTarea(crearTareaDTO:CrearTareaDTO){
        const {titulo,descripcion} = crearTareaDTO;
        const tarea = new Tarea();
        tarea.titulo = titulo;
        tarea.descripcion = descripcion;
        tarea.estado = EstadoTarea.ABIERTO;
        await tarea.save();
        return tarea;
    }
}