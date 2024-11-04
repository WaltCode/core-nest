import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './DTO/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({
  path: resolve(process.cwd(), './.env'),
});

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async login(login_details: LoginDTO){
        try {
            const user = await this.userService.findUserByEmail(login_details.email); 
            const passwordMatched = await bcrypt.compare(login_details.password, user.password);
            if(!passwordMatched){
                throw new UnauthorizedException('Wrong Credentials supplied')
            }
            const accessToken = await this.jwtService.sign({
                sub: user.id,
                user_email: user.email,
                user_name: `${user.first_name} ${user.last_name}`
            });
            return {accessToken};
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
