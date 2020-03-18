import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsageMiddleware } from './usage.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usage } from './usage.entity';
import { UsageService } from './usage.service';
import { AuthController } from '../auth/auth.controller';
import { UsageController } from './usage.controller';
import { UserController } from '../user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usage])],
  providers: [UsageService],
  exports: [UsageService],
  controllers: [UsageController],
})
export class UsageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsageMiddleware)
      .forRoutes(AuthController, UsageController, UserController);
  }
}
