import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto"; 
import { Role } from "../entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<any> {
        let user = this.userRepository.create(createUserDto);
        if (user.isApiUser) {
            user = await this.userRepository.save(user);
            const payload = { email: user.email, sub: user.id };
            const apiKey = this.jwtService.sign(payload, { expiresIn: '10y' });

            const currentDate = new Date();

            currentDate.setFullYear(currentDate.getFullYear() + 10);
            user.apiKeyExpiration = currentDate;
            user.apiKeyLastDigits = apiKey.slice(-7);
            user = await this.userRepository.save(user);
            return { apiKey, ...user };

        } else {
            return this.userRepository.save(user);
        }
        
        
    }

    async findOne(id:number):Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['roles']});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}