import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Users } from "./users.model";
import { getModelToken } from "@nestjs/sequelize";
import { UsersModule } from "./users.module";
import { CreateUserDto } from "./dto/create-user.dto";




describe( 'UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    let userDto: CreateUserDto;
    

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers:  [UsersController],
            providers: [UsersService,
                {
                  provide: getModelToken(Users),
                  useValue: {},
                },
              ],
            imports:  [UsersModule, CreateUserDto],
        }).compile();

        userDto = module.get<CreateUserDto>(CreateUserDto)
        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
        
    });

    describe( 'Userss', () => {
        it ('getAllUsers', async () => {
            const users = await controller.getAll();
            setTimeout(() => { expect(users).toEqual([{
                "id": 10,
                "email": "user4@mail.com",
                "password": "user4@mail.com",
                "createdAt": "2023-04-12T10:34:43.365Z",
                "updatedAt": "2023-04-12T10:34:43.365Z"
            },
            {
                "id": 11,
                "email": "user5@mail.com",
                "password": "$2a$05$hqVtL554ah5C2Yhe.kcPX.pCOo9Td9qHJSKMvs.J5LgRvPcQNjYyO",
                "createdAt": "2023-04-12T11:01:42.551Z",
                "updatedAt": "2023-04-12T11:01:42.551Z"
            }])}, 10000);
        });
        it ('createUsers', async () => {
            const dto: typeof userDto = { email: 'user8@mail.com', password: 'user8@mail.com'};
            const users = await controller.createUser(dto);
            setTimeout(() => { expect(users).toEqual([{
                "id": 16,
                "email": "user8@mail.com",
                "password": "user8@mail.com",
                "updatedAt": expect.any(Date),
                "createdAt": expect.any(Date)
            }])}, 5000);
        });
    });
});