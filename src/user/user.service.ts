import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/auth/DTO/create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    async create(payload: CreateUserDTO): Promise<User>{
        try {
            const salt = await bcrypt.genSalt(10)
            payload.password = await bcrypt.hash(payload.password, salt)
            const user =  await this.userRepo.save(payload);
            delete user.password;
            return user
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async findUserByEmail(email:string): Promise<User> {
        try {
            return this.userRepo.findOneBy({email});
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
