import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);

    return createdUser.save();
  }

  async fineOne(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }

  async deleteOne(email: string) {
    return await this.userModel.findOneAndDelete({ email }).exec();
  }
}
