import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import configuration from '../config/configuration';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configuration().JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
