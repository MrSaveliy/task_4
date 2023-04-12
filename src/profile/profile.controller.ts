import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';



@Controller('profile')
export class ProfileController {
    
    constructor(private profileService: ProfileService) {}

    @Post()
    create(@Body() dto: CreateProfileDto) {
        return this.profileService.createProfile(dto); 
    }
    
    @Get()
    getAll() {
        return this.profileService.getAll();
    }
    
    @MessagePattern({ cmd: 'get-profile'})
    async getProfile(@Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        channel.ack(message)
        return {profile: 'PROFILE'}
    }
}   
