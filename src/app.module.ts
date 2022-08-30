import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { Event } from './entities/event.entity';
import { Workshop } from './entities/workshop.entity';
import { MenuItem } from './entities/menu.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Event, Workshop, MenuItem]),
  ],
  controllers: [MenuController, EventController],
  providers: [],
})
export class AppModule {}
