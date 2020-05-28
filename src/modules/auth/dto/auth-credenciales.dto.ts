import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export default class AuthCredencialesDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    usuario:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'la contraseña ingresada debe tener una mayuscula,un numero y un caracter especial.'})
    password:string;
}