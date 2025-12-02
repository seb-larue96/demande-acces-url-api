import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forFeature(['Role'])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
