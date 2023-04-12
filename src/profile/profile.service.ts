import { Injectable } from '@nestjs/common';
import { Profile } from './profile.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
    constructor (@InjectModel(Profile) private profileRepository: typeof Profile) {}
    
    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto);
        return profile;
    }

    async getAll() {
        const users = await this.profileRepository.findAll({include: {all: true}});
        return users;
    }
}
