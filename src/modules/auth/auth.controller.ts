import { obtenerUsuario } from './get-user.decorator';
import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import AuthCredencialesDTO from './dto/auth-credenciales.dto';
import { AuthGuard } from '@nestjs/passport';
import Usuario from './usuario.entity';
@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) authCredencialesDTO:AuthCredencialesDTO
    ){
        return await this.authService.signUp(authCredencialesDTO);
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) authCredencialesDTO:AuthCredencialesDTO
    ){
        return await this.authService.signIn(authCredencialesDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    async test(
        @obtenerUsuario() usuario:Usuario
    ){
        console.log(usuario);
    }

}
