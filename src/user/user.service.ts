import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/user.register.dto';
import { UserRepository } from './user.repo';

import { bcryptProvider } from 'src/common/utils/bcrypt.provider';
import { UpdateUserDto } from './dtos/user.update.dto';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    private userRepo: UserRepository,
  ) {}

  async createUser(dto: RegisterDto) {
    const existingUser = await this.userRepo.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    dto.password = await bcryptProvider.hashProvider(dto.password);
    const user = this.userRepo.create(dto);

    return await this.userRepo.save(user);
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async findUserById(id: string) {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async findUserByEmail(emailId: string) {
    return await this.userRepo.findOne({
      where: { email: emailId },
    });
  }

  async updateUserById(updatedUser: UpdateUserDto, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);

      const user = await userRepo.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found...!');
      }

      const forbiddenFields = ['id', 'createdAt', 'updatedAt'];

      forbiddenFields.forEach((field) => delete updatedUser[field]);

      if (updatedUser.email && updatedUser.email !== user.email) {
        const existing = await userRepo.findOne({
          where: {
            email: updatedUser.email,
          },
        });

        if (existing) {
          throw new ConflictException('Email already in use');
        }
      }

      if (updatedUser.password) {
        updatedUser.password = await bcryptProvider.hashProvider(
          updatedUser.password,
        );
      }

      type v = string | boolean | null;

      Object.entries(updatedUser).forEach(([key, value]) => {
        if (value !== undefined) {
          (user as UpdateUserDto)[key] = value as v;
        }
      });

      return await userRepo.save(user);
    });

    // const user = await this.findUserById(userId);

    // if (!user) {
    //   throw new NotFoundException('User Not Found..!');
    // }

    // const modifiedUser = { ...user, ...updatedUser };
    // console.log(modifiedUser);

    // return this.userRepo.save(modifiedUser);
  }

  async deleteUserById(userId: string) {
    return await this.userRepo.delete(userId);
  }
}
