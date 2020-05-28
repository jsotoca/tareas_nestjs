import { Repository, EntityRepository } from "typeorm";
import Usuario from "./usuario.entity";

@EntityRepository(Usuario)
export default class UsuarioRepository extends Repository<Usuario>{
    async signUp(){

    }

    async singIn(){

    }
}