import config from './config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsageModule } from './usage/usage.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.typeorm,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsageModule,
    UserModule,
  ],
})
export class AppModule {}
