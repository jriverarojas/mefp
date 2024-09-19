import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "../service/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.create(createUserDto);
    }
}