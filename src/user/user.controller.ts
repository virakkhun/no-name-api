import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteUser(@Req() req: Request, @Body() { email }: { email: string }) {
    console.log(req);
    const deletedUser = await this.userService.deleteOne(email);
    if (deletedUser) {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Deleted successfully.',
      };
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to deleted.',
    };
  }
}
