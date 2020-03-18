import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usage } from './usage.entity';
import { User } from '../user';

@Injectable()
export class UsageMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Usage) private readonly usageRepo: Repository<Usage>,
  ) {}

  async use(
    req: Request & { id?: string; user?: User },
    res: Response,
    next: Function,
  ) {
    const startAt = process.hrtime();
    const end = res.end;
    res.end = async (...args) => {
      const [seconds, nanoseconds] = process.hrtime(startAt);
      const ms = Math.round(seconds * 1e3 + nanoseconds * 1e-6);
      const user = req.user as User;

      const usage: Partial<Usage> = {
        ip: req.header('x-original-forwarded-for') || req.ip,
        url: req.originalUrl,
        method: req.method,
        endpoint: `${req.method} ${req.route.path}`,
        status: res.statusCode,
        ms,
        userId: user && user.id,
      };

      const bytes = res.getHeader('content-length');
      if (bytes) usage.bytes = Number(bytes);

      await this.usageRepo.save(usage);

      res.end = end;
      res.end(...args);
    };

    next();
  }
}
