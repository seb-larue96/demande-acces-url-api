import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessRequestStatusModule } from './references/access-request-status/access-request-status.module';
import { AccessRequestModule } from './access-request/access-request.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, AuthModule, AccessRequestStatusModule, AccessRequestModule, RolesModule]
})
export class ApplicationModule {}
