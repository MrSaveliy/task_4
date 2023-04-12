import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';


import * as bcrypt from 'bcryptjs'
import { Users } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    
    constructor(private userService: UsersService, 
        private jwtService: JwtService ) {}

    
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateTolken(user)
        
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUsersByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST )
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword })
        return this.generateTolken(user)    
    }

    private async generateTolken(user: Users) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUsersByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Некоректный email или password'})

    }

}
