import * as bcrypt from 'bcrypt';
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

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.repo.findOne({
      where: {
        email: String(email).toLowerCase(),
      },
    });
  }

  async createUser(params: Partial<User>): Promise<User> {
    const user = new User(params);
    user.passwordHash = await this.encryptPassword(params.password);

    if (await this.shouldCreateAdmin()) {
      user.admin = true;
    }

    return this.repo.save(user);
  }

  async updateUser(id: number, params: Partial<User>): Promise<User> {
    if (params.password) {
      params.passwordHash = await this.encryptPassword(params.password);
    }

    await this.repo.update(id, params);
    return await this.repo.findOne(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async getAdminCount(): Promise<number> {
    return this.repo.count({
      where: {
        admin: true,
      },
    });
  }

  private readonly PASSWORD_HASH_SALT_ROUNDS = 10;

  public async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.PASSWORD_HASH_SALT_ROUNDS);
  }

  public async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * If the system is fresh, the first user created should be an admin.
   */
  private async shouldCreateAdmin(): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder('user')
      .select('true')
      .take(1)
      .getRawOne();

    return !result;
  }
}
