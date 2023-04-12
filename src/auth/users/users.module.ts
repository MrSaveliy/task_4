import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';


@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([Users]),
    ConfigModule.forRoot({
      envFilePath: `.env`
  }), 
    SequelizeModule.forRoot( {
      dialectModule: require('pg'),
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB_USER,
      models: [Users],
      autoLoadModels: true
    }),]
    ,
  exports: [UsersService
  ],
})

export class UsersModule {}
