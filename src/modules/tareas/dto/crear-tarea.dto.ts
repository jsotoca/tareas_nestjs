import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export default class CrearTareaDTO {
    @IsNotEmpty()
    @IsString()
    titulo:string;

    @IsNotEmpty()
    @IsString()
    descripcion:string;
}