import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }

    @MessagePattern({ cmd: 'registration_user'})
    async registration_user(@Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        channel.ack(message)
        return {auth: 'AUTH'}
    }
}
