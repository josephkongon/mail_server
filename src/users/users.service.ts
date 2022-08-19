import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from 'src/schemas/users.schema';
import { encodePassword, comparePassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const check = await this.usersModel.findOne({
      username: createUserDto.username,
    });
    if (!check) {
      const hpass = await encodePassword(createUserDto.password);
      const newUser = new this.usersModel({
        username: createUserDto.username,
        password: hpass,
      });
      const result = await newUser.save();

      return { id: result.id, username: result.username };
    } else {
      throw new NotFoundException('username already exist');
    }
  }
  async loginuser(createUserDto: CreateUserDto) {
    const check = await this.usersModel.findOne({
      username: createUserDto.username,
    });

    if (check) {
      const checkpass = await comparePassword(
        createUserDto.password,
        check.password,
      );
      if (checkpass) {
        return {
          id: check.id,
          username: check.username,
        };
      }
      return {
        error: 'invalid credentails',
      };
    }
    return null;
  }

  async findAll() {
    return await this.usersModel.find();
  }

  async findOne(id: string) {
    return await this.usersModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
