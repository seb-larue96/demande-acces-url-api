import { Migration } from '@mikro-orm/migrations';

export class Migration20251029120128_updatedAt_nullable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` modify \`updated_at\` datetime null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` modify \`updated_at\` datetime not null;`);
  }

}
