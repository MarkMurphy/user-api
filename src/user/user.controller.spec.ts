import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserList } from './dto/user-list.dto';
import { CreateUserParams } from './dto/create-user.dto';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const mockRepository: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
  findOne: jest.fn(entity => entity),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnThis(),
  })),
}));

describe('User Controller', () => {
  let controller: UserController;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    repository = module.get(getRepositoryToken(User));
  });

  describe('list', () => {
    it('should return a list of users', async () => {
      const result = new UserList();
      repository.find.mockReturnValueOnce([]);
      expect(await controller.list()).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const params = new CreateUserParams({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
      });
      const result = new User(params);
      jest.spyOn(repository, 'save').mockReturnValueOnce(result);
      expect(await controller.create(params)).toBe(result);
    });
  });
});
