import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user-schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create({ name, email, password }): Promise<User> {
    const user = new this.userModel({ name, email, password })
    return user.save()
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec(); // Make sure this method is in place
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
