import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsuarioRepository from './usuario.repository';
import { JwtProvider } from './jwt.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    TypeOrmModule.forFeature([UsuarioRepository]),
    ...JwtProvider
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
