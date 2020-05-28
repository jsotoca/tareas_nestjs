import { Configuration } from './../../config/configuration.keys';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';

export const JwtProvider = [
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        async useFactory(config:ConfigService){
            return {
                secret:config.get<string>(Configuration.TOKEN_SECRET),
                signOptions:{
                    expiresIn:3600
                }
            }
        }
    })
]