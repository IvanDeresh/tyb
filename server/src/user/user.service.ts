import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: new ObjectId(id) }).exec();
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.userModel.findOneAndDelete({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
