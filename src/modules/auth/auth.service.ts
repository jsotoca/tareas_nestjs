import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsuarioRepository from './usuario.repository';
import AuthCredencialesDTO from './dto/auth-credenciales.dto';
import {JwtService} from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository:UsuarioRepository,
        private jwtService:JwtService
    ){}

    async signUp(authCredencialesDTO:AuthCredencialesDTO){
        return await this.usuarioRepository.signUp(authCredencialesDTO);
    }

    async signIn(authCredencialesDTO:AuthCredencialesDTO):Promise<{accessToken:string}>{
        const usuario = await this.usuarioRepository.singIn(authCredencialesDTO);
        const payload:JwtPayload = {usuario};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
    }
}
