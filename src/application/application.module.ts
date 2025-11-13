import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessRequestStatusModule } from './references/access-request-status/access-request-status.module';
import { AccessRequestModule } from './access-request/access-request.module';

@Module({
  imports: [UsersModule, AuthModule, AccessRequestStatusModule, AccessRequestModule]
})
export class ApplicationModule {}
