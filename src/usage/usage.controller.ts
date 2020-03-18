import { Controller, Get, Query } from '@nestjs/common';
import { UsageService } from './usage.service';
import { ListUsage } from './dto/list-usage.dto';
import { Auth } from '../auth/auth.decorator';

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  @Auth('admin')
  async index(@Query() params?: ListUsage): Promise<any[]> {
    return this.usageService.list(params);
  }
}
