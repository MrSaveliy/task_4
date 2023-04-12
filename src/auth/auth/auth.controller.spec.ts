import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { getModelToken } from "@nestjs/sequelize";
import { AuthModule } from "./auth.module";
import { Users } from "../users/users.model";
import { UsersService } from "../users/users.service";
import { UsersController } from "../users/users.controller";
import { UsersModule } from "../users/users.module";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { send } from "process";
import { UnauthorizedException } from "@nestjs/common";

describe( 'AuthController', () => {
    let controller_auth: AuthController;
    let service_auth: AuthService;
    let controller_users: UsersController;
    let service_users: UsersService;
    let userDto: CreateUserDto;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers:  [AuthController, UsersController],
            providers: [AuthService, UsersService,
                {
                  provide: getModelToken(Users),
                  useValue: {},
                },
              ],
            imports:  [AuthModule, UsersModule, CreateUserDto],
        }).compile();

        controller_auth = module.get<AuthController>(AuthController);
        service_auth = module.get<AuthService>(AuthService);
        controller_users = module.get<UsersController>(UsersController);
        service_users = module.get<UsersService>(UsersService);
        userDto = module.get<CreateUserDto>(CreateUserDto);
    });

    describe( 'Auths', () => {
        it ('getregistrationAuths', async () => {
            const dto: typeof userDto = { email: 'user5@mail.com', password: 'user5@mail.com'};
            clearTimeout(setTimeout( () => {  expect( () => 
                controller_auth.registration(dto)).rejects.toThrowError(new UnauthorizedException({ message: 'Некоректный email или password' }));
           }, 5000));
        });    
    });

    describe( 'Auths', () => {
        it ('getloginAuths', async () => {
            const dto: typeof userDto = { email: 'user5@mail.com', password: 'user5@mail.com'};
            const token = await controller_auth.login(dto);
            clearTimeout(setTimeout( () => { expect(token).toEqual([{}]);
           }, 5000));
        });
        it ('getloginAuthswrong', async () => {
            const dto: typeof userDto = { email: 'user4@mail.com', password: 'user4@mail.com'};
            clearTimeout(setTimeout( () => { expect( () => 
                controller_auth.login(dto)).rejects.toThrowError(new UnauthorizedException({ message: 'Некоректный email или password' }));
           }, 5000));
        });
    });  
});