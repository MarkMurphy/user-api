import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageService } from './usage.service';
import { Usage } from './usage.entity';

describe('UsageService', () => {
  let service: UsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsageService,
        {
          provide: getRepositoryToken(Usage),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsageService>(UsageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
