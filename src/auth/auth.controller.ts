import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './DTO/login.dto';
import { timeStamp } from 'console';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    @Post('/signup')
    async register(
        @Body() user: CreateUserDTO 
    ){
        return await this.userService.create(user)
    }

    @Post('/login')
    async login(
        @Body() login_details: LoginDTO
    ){
        return await this.authService.login(login_details)
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(
        @Req() req: Request
    ){
        return req.user
    }
}
