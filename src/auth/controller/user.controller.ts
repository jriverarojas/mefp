import { Body, Controller, Post } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "../service/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('create-application-user')
    createApplicationUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const userDto = {...createUserDto, isApiUser: false};
        return this.userService.create(userDto);
    }
}