import { Controller, Post, Body, Get, UseGuards, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
       return await this.usersService.deleteUser(id);
  }
}   
