import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usage, UsageSummary } from './usage.entity';
import { ListUsage } from './dto/list-usage.dto';

@Injectable()
export class UsageService {
  constructor(
    @InjectRepository(Usage) private readonly usageRepo: Repository<Usage>,
  ) {}

  async list(filters?: ListUsage): Promise<UsageSummary[]> {
    const query = this.usageRepo
      .createQueryBuilder('usage')
      .select('endpoint')
      .addSelect('COUNT(endpoint)', 'hits')
      .groupBy('endpoint')
      .limit(100);

    if (filters && filters.before) {
      query.andWhere('time < :before').setParameters({
        before: new Date(filters.before).toISOString(),
      });
    }

    if (filters && filters.after) {
      query.andWhere('time > :after').setParameters({
        after: new Date(filters.after).toISOString(),
      });
    }

    const records = await query.getRawMany();

    // return records;
    return records.map(record => new UsageSummary(record));
  }
}
