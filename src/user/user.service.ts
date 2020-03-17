import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async listUsers(): Promise<User[]> {
    return this.repo.find({ take: 100 });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.repo.findOne(id);
  }

  async createUser(params: Partial<User>): Promise<User> {
    const user = new User(params);
    return this.repo.save(user);
  }

  async updateUser(id: number, params: Partial<User>): Promise<User> {
    await this.repo.update(id, params);
    return await this.repo.findOne(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
