import { Test, TestingModule } from "@nestjs/testing";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileModule } from "./profile.module";
import { Profile } from "./profile.model";
import { getModelToken } from "@nestjs/sequelize";



describe('ProfileController', () => {
    let controller: ProfileController;
    let service: ProfileService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfileController],
            providers: [ProfileService,
                {
                  provide: getModelToken(Profile),
                  useValue: {},
                },
              ],
            imports: [ProfileModule],
        }).compile();

        controller = module.get<ProfileController>(ProfileController);
        service = module.get<ProfileService>(ProfileService);
    });

    describe('Profiles', () => {
        it ('getAllProfiles', async () => {
            const profiles = await controller.getAll();
            expect(profiles).toEqual([{"createdAt": '2023-04-08T08:57:33.032Z', "id": 1, "name": "Иван", "phone": 8888, "surname": "Иванов", "updatedAt": '2023-04-08T08:57:33.032Z'}]);
        });
    });
});