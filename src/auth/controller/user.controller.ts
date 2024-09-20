import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "../service/user.service";
import { Permissions } from "../decorators/permissions.decorator";
import { PermissionsGuard } from "../guards/permissions.guard";



@Controller('user')
@UseGuards(PermissionsGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    @Permissions('createUser')
    createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.create(createUserDto);
    }
}