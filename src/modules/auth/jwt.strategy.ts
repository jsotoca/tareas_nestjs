import { Configuration } from './../../config/configuration.keys';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsuarioRepository from './usuario.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository:UsuarioRepository,
        private configService:ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configService.get<string>(Configuration.TOKEN_SECRET)
        });
    }

    async validate(payload:JwtPayload){
        const {usuario} = payload;
        const encontrado = await this.usuarioRepository.findOne({usuario});
        if(!encontrado) throw new UnauthorizedException();
        return encontrado;
    }
}