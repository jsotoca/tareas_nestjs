import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import AuthCredencialesDTO from './dto/auth-credenciales.dto';

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

}
