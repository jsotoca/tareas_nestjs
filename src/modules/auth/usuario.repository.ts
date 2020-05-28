import { Repository, EntityRepository } from "typeorm";
import {genSaltSync,hashSync} from "bcrypt";
import Usuario from "./usuario.entity";
import AuthCredencialesDTO from "./dto/auth-credenciales.dto";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

@EntityRepository(Usuario)
export default class UsuarioRepository extends Repository<Usuario>{
    
    async signUp(authCredencialesDTO:AuthCredencialesDTO){
        const {usuario,password} = authCredencialesDTO;

        const nuevoUsuario = new Usuario();
        const salt = genSaltSync(10);
        const passwordHasheado = hashSync(password,salt);

        nuevoUsuario.usuario = usuario;
        nuevoUsuario.password = passwordHasheado;

        try {
            await nuevoUsuario.save();
            return nuevoUsuario;
        } catch (error) {
            if(error.errno == 1062) throw new ConflictException('usuario ya registrado en la base de datos.');
            else throw new InternalServerErrorException('error en el servidor al momento de registrar.');
        }
        
    }

    async singIn(authCredencialesDTO:AuthCredencialesDTO){
        const {usuario,password} = authCredencialesDTO;
        const encontrado = await this.findOne({usuario});
        if(encontrado && encontrado.compararPasswords(password)) return encontrado.id;
        else throw new UnauthorizedException('usuario y/o password incorrectos.');
    }
}