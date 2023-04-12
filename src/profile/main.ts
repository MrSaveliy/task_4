import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProfileModule } from './profile.module';

async function start() {
  const app = await NestFactory.create(ProfileModule);

  app.connectMicroservice<MicroserviceOptions> ({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      noAck: false,
      queue: process.env.RABBIT_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  })

  app.startAllMicroservices();
}
start();

