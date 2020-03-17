import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserParams } from './dto/create-user.dto';
import { UpdateUserParams } from './dto/update-user.dto';

const ID = Param('id', ParseIntPipe);

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return await this.userService.listUsers();
  }

  @Post()
  async create(@Body() params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }

  @Get(':id')
  async retrieve(@ID id: number): Promise<User> {
    const user = await this.getUserById(id);
    return user;
  }

  @Patch(':id')
  async update(
    @ID id: number,
    @Body() params: UpdateUserParams,
  ): Promise<User> {
    await this.getUserById(id);
    return this.userService.updateUser(id, params);
  }

  @Delete(':id')
  async delete(@ID id: number): Promise<void> {
    await this.getUserById(id);
    return this.userService.deleteUser(id);
  }

  private async getUserById(id: number): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException(`No such user: ${id}`, 404);
    }

    return user;
  }
}
