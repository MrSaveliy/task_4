import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SequelizeModule.forFeature([Profile]), 
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
    database: process.env.POSTGRES_DB_PROFILE,
    models: [Profile],
    autoLoadModels: true
  }),
  ClientsModule.register([
        {
          name: 'PROFILE_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://localhost:5672`],
            queue: 'profile_queue',
            queueOptions: {
              durable: false,
            },
          },
        },
      ]),
    ],
    exports:[ProfileService]
 })

export class ProfileModule {}

