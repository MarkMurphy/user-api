import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseInterceptors,
  ParseIntPipe,
  HttpException,
  ForbiddenException,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ListUsersParams } from './dto/list-users.dto';
import { CreateUserParams } from './dto/create-user.dto';
import { UpdateUserParams } from './dto/update-user.dto';
import { UserList } from './dto/user-list.dto';

const ID = Param('id', ParseIntPipe);

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth('admin')
  async list(@Query() params?: ListUsersParams): Promise<UserList> {
    return await this.userService.listUsers(params);
  }

  @Post()
  async create(@Body() params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }

  @Get(':id')
  @Auth()
  async retrieve(@ID id: number, @Request() request): Promise<User> {
    const user = await this.getUserById(id);

    if (user.id !== request.user.id && !request.user.admin) {
      throw new ForbiddenException();
    }

    return user;
  }

  @Patch(':id')
  @Auth()
  async update(
    @ID id: number,
    @Body() params: UpdateUserParams,
    @Request() request,
  ): Promise<User> {
    const user = await this.getUserById(id);

    // Only administrators are allowed to pass/modify the admin param.
    if (params.admin !== undefined && !request.user.admin) {
      delete params.admin;
    }

    if (user.id !== request.user.id && !request.user.admin) {
      throw new ForbiddenException();
    }

    return this.userService.updateUser(id, params);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(204)
  async delete(@ID id: number, @Request() req): Promise<void> {
    const user = await this.getUserById(id);

    if (user.id !== req.user.id && !req.user.admin) {
      throw new ForbiddenException();
    }

    if (user.admin) {
      const adminCount = await this.userService.getAdminCount();
      if (adminCount <= 1) {
        throw new HttpException(
          'Deleting this user would leave the system without an administrator.',
          403,
        );
      }
    }

    await this.userService.deleteUser(id);
  }

  private async getUserById(id: number): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException(`No such user: ${id}`, 404);
    }

    return user;
  }
}
