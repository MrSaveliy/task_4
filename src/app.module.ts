import { Module } from "@nestjs/common";
import { ProfileModule } from "./profile/profile.module";
import { Profile } from "./profile/profile.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { Users } from "./auth/users/users.model";
import { UsersModule } from "./auth/users/users.module";
import { AuthModule } from "./auth/auth/auth.module";
import { STRING } from "sequelize";

@Module({
  controllers: [],
  providers: [],
  imports: [ProfileModule, UsersModule, AuthModule, 
  ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
  }),
  
  ]
})
  
  
export class AppModule {}