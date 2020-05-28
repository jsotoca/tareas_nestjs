import { Configuration } from './../config/configuration.keys';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const DatabaseProviver = [
    TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        async useFactory(config:ConfigService){
            return {
                type: 'mysql',
                host: config.get<string>(Configuration.DB_HOST),
                database: config.get<string>(Configuration.DB_NAME),
                username: config.get<string>(Configuration.DB_USER),
                password: config.get<string>(Configuration.DB_PASS),
                entities: [__dirname +"/../**/*.entity{.ts,.js}"],
                synchronize: true
            } as ConnectionOptions;
        }
    })
];