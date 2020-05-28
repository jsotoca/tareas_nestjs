import { Module } from '@nestjs/common';
import { DatabaseProviver } from './database.service';

@Module({
    imports:[...DatabaseProviver],
    exports:[...DatabaseProviver]
})
export class DatabaseModule {}
