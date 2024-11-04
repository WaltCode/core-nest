import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/common/config/app.config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: AppConfig.Services.jwt.secret,
      global: true,
      signOptions:{
        expiresIn: AppConfig.Services.jwt.expiry
      }
    })
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
