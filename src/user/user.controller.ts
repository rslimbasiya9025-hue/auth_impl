import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/user.register.dto';
import { AppException } from 'src/common/exceptions/custom/exception.custom';
import { UpdateUserDto } from './dtos/user.update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: RegisterDto) {
    return this.userService.createUser(dto);
  }

  @Get('all')
  async getAll() {
    return this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Patch(':userId')
  async updateById(
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() upDto: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(upDto, id);
  }

  @Delete(':userId')
  async delete(@Param('userId', new ParseUUIDPipe()) id: string) {
    const result = await this.userService.deleteUserById(id);

    if (!result.affected) {
      throw new AppException(
        'User not found (Deletion Failed)',
        404,
        'USER_NOT_FOUND',
      );
    }

    return result;
  }
}
