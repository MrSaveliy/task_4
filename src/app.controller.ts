import { Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('POFILE_SERVICE') private readonly profileService: ClientProxy,
  ) {}

  @Post()
  async registration() {
    return this.authService.send({
        cmd: 'registration_user',
    }, {},
    ); 
  }

  @Post()
  async getProfile() {
    return this.profileService.send({
        cmd: 'get-profile',
    }, {},
    );
  }

}