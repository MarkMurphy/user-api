import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ListUsersParams } from './dto/list-users.dto';
import { UserList } from './dto/user-list.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async listUsers(params?: ListUsersParams): Promise<UserList> {
    const { before, after, first, last } = params || {};
    const take = Number(first || last || 100) + 1;
    const where = () => {
      if (before && after) return 'user.id > :after AND user.id < :before';
      if (before) return 'user.id < :before';
      if (after) return 'user.id > :after';
    };

    const data = await this.repo
      .createQueryBuilder('user')
      .where(query => {
        return `user.id IN ${query
          .subQuery()
          .select('user.id')
          .from(User, 'user')
          .where(where)
          .orderBy('user.id', last ? 'DESC' : 'ASC')
          .take(take)
          .getQuery()}`;
      })
      .orderBy('user.id', 'ASC')
      .setParameters({
        before,
        after,
      })
      .getMany();

    const count = data.length;
    const next = count === take ? (last ? data.shift() : data.pop()) : null;

    return new UserList({
      hasNextPage: Boolean(next),
      data,
    });
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
