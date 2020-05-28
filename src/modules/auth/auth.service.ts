import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsuarioRepository from './usuario.repository';
import AuthCredencialesDTO from './dto/auth-credenciales.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository:UsuarioRepository
    ){}

    async signUp(authCredencialesDTO:AuthCredencialesDTO){
        return await this.usuarioRepository.signUp(authCredencialesDTO);
    }

    async signIn(authCredencialesDTO:AuthCredencialesDTO){
        return await this.usuarioRepository.singIn(authCredencialesDTO);
    }
}
