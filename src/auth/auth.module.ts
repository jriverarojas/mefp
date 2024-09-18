import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    ConfigModule
  ],
  providers: [UserService],
  controllers: [UserController]
  
})
export class AuthModule {}
