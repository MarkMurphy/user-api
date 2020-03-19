import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';
import { Usage } from './usage.entity';

describe('Usage Controller', () => {
  let controller: UsageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsageController],
      providers: [
        UsageService,
        {
          provide: getRepositoryToken(Usage),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsageController>(UsageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
