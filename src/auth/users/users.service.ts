import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.model';


@Injectable()
export class UsersService {
    constructor(@InjectModel(Users) private userRepositoriy: typeof Users,
                    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepositoriy.create(dto);
        return user;
    }

    async getAll() {
        const users = await this.userRepositoriy.findAll({include: {all: true}});
        return users;
    }

    async getUsersByEmail(email: string) {
        const user = await this.userRepositoriy.findOne({where: {email}, include: {all: true}})
        return user;
    }
   
    async deleteUser(id: number) {
        const user = await this.userRepositoriy.findByPk(id);
        if (!user) {
          throw new Error('User not found');
        }
        await user.destroy()
        return user;
      }





}
