import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from './config.global';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL), UserModule, AuthModule],
})
export class AppModule {}
